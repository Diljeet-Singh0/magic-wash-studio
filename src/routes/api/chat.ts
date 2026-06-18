import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are "Aqua AI", the friendly assistant for AquaDrive — a premium mobile car wash and detailing service.

You help customers with:
- Recommending the right wash package (Express NZ$39, Premium NZ$99, Showroom NZ$249, Ceramic Coating NZ$899)
- Car care tips (paint protection, interior cleaning, ceramic coatings, water spots)
- Booking guidance — direct them to the Booking section to confirm
- Service area: Auckland, Wellington, Christchurch (New Zealand)
- Eco-friendly process: <2L water per wash, pH-neutral foam

Style: concise, warm, expert. Use short paragraphs and bullet points. Never invent prices or services not listed. If asked something off-topic, gently steer back to car care.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            stream: true,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text();
          return new Response(text || "AI gateway error", { status: upstream.status });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
