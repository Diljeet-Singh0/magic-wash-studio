import { createServer } from "node:http";
import { Readable } from "node:stream";

const port = Number(process.env.PORT ?? 3000);

async function loadServer() {
  const module = await import("./dist/server/server.js");
  return module.default ?? module;
}

function toRequestUrl(req) {
  const host = req.headers.host ?? `localhost:${port}`;
  const protocol = req.socket.encrypted ? "https" : "http";
  return new URL(req.url ?? "/", `${protocol}://${host}`);
}

createServer(async (req, res) => {
  try {
    const server = await loadServer();
    const headers = new Headers();

    for (const [name, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        for (const item of value) headers.append(name, item);
      } else if (value != null) {
        headers.set(name, value);
      }
    }

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const request = new Request(toRequestUrl(req), {
      method: req.method,
      headers,
      body: hasBody ? Readable.toWeb(req) : undefined,
      duplex: hasBody ? "half" : undefined,
    });

    const response = await server.fetch(request, process.env, {});

    res.statusCode = response.status;
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
      return;
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}).listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});