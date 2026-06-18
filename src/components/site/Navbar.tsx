import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "#services", label: "Services", num: "01" },
  { href: "#packages", label: "Packages", num: "02" },
  { href: "#process", label: "Process", num: "03" },
  { href: "#gallery", label: "Gallery", num: "04" },
  { href: "#book", label: "Book", num: "05" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement strip */}
      <div className="fixed inset-x-0 top-0 z-[60] border-b border-white/[0.05] bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-[10px]">
          <p className="font-mono uppercase tracking-[0.28em] text-muted-foreground">
            <span className="text-gold">●</span>&nbsp;&nbsp;Auckland · Wellington · Christchurch
          </p>
          <a
            href="tel:+918000000000"
            className="hidden items-center gap-1.5 font-mono uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Phone className="h-3 w-3" /> +91 80000 00000
          </a>
        </div>
      </div>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-8 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logotype — wordmark only, no pill */}
          <a href="#" className="group flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none tracking-tight">
              Aquadrive<span className="text-gold">.</span>
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground sm:inline">
              / detail co.
            </span>
          </a>

          {/* Numbered nav — editorial table-of-contents feel */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[9px] tracking-widest text-gold/70 group-hover:text-gold">
                  {l.num}
                </span>
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#book"
            className="group hidden items-center gap-2.5 border border-white/15 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-all hover:border-gold hover:bg-gold hover:text-primary-foreground md:inline-flex"
          >
            Reserve
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          <button
            className="rounded-md p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/[0.06] bg-background/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 border-b border-white/[0.05] py-3 text-sm text-muted-foreground last:border-0 hover:text-foreground"
                >
                  <span className="font-mono text-[9px] tracking-widest text-gold/70">{l.num}</span>
                  {l.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-4 border border-gold bg-gold px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground"
              >
                Reserve a Slot
              </a>
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
}
