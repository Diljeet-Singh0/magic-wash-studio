import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Which package suits a dusty SUV?",
  "How often should I ceramic coat?",
  "Remove water spots on glass?",
  "Best wash for monsoon season?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm **Aqua AI** ✨ — your car care concierge. Ask me about packages, detailing tips, or which wash fits your ride.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setStreaming(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const errText = res.status === 429
          ? "I'm getting too many requests right now — try again in a minute."
          : res.status === 402
          ? "AI credits are exhausted. Please contact the workshop."
          : "Something went wrong. Please try again.";
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "assistant", content: errText };
          return c;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((m) => {
                const c = [...m];
                c[c.length - 1] = { role: "assistant", content: acc };
                return c;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = { role: "assistant", content: "Connection issue. Please retry." };
        return c;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Aqua AI assistant"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse" />
        <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-accent px-5 py-4 text-primary-foreground shadow-2xl shadow-primary/40 ring-1 ring-white/20 hover:scale-105 transition-transform">
          {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          {!open && <span className="text-sm font-semibold tracking-tight">Ask Aqua AI</span>}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[600px] max-h-[80vh] flex flex-col rounded-3xl border border-white/10 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-primary/20 overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-white/10 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/50 blur-md animate-pulse" />
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold tracking-tight">Aqua AI</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · Powered by AI
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-sm"
                        : "bg-white/5 border border-white/10 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content || (streaming && i === messages.length - 1 ? (
                      <Loader2 className="h-4 w-4 animate-spin opacity-70" />
                    ) : "")}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <div className="eyebrow text-[10px] text-muted-foreground px-1">Try asking</div>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-sm px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-white/10 bg-background/60"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about packages, detailing, tips…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled={streaming}
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground disabled:opacity-40 hover:scale-105 transition"
                  aria-label="Send"
                >
                  {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-[10px] text-muted-foreground mt-2 text-center">
                AI may produce inaccuracies. Confirm details when booking.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
