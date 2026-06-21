import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Phone, Star } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-hero pt-32 noise"
    >
      {/* faint grid — printed-paper feel, not neon */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.86 0.08 85 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.08 85 / 0.5) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 70%)",
        }}
      />

      {/* gold corner accent — editorial cover trick */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        {/* Issue header — printed magazine masthead */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between border-b border-white/[0.08] pb-5"
        >
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Vol. 04 — Issue №12
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground md:inline">
              The Detailing Quarterly
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
            Est. 2014 · New Zealand
          </span>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="eyebrow mb-8"
            >
              <span className="mr-3 inline-block h-px w-10 align-middle bg-gold/60" />
              The Mobile Detailing Co.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.8 }}
              className="font-display text-[3.5rem] font-normal leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6.5rem]"
            >
              The quiet
              <br />
              craft of a<br />
              <em className="not-italic">
                <span className="italic text-gold">truly</span>
              </em>{" "}
              <em className="italic">clean</em> car.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-10 grid max-w-xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end"
            >
              <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground">
                Hand-finished detailing performed at your driveway by trained technicians.
                Ceramic coating, paint correction, interior restoration — booked in
                under sixty seconds, delivered with the patience of a workshop.
              </p>
              <a
                href="#book"
                className="group inline-flex items-center gap-3 self-start text-[13px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
              >
                Reserve a slot
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </motion.div>

            <motion.a
              href="tel:+64212345678"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" />
              +64 21 234 5678
            </motion.a>

            {/* small stat row — print captions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-16 grid max-w-xl grid-cols-3 gap-8 border-t border-white/[0.06] pt-7"
            >
              <Stat number="12,400" label="Cars finished" />
              <Stat
                number={
                  <span className="inline-flex items-center gap-1.5">
                    4.9
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  </span>
                }
                label="Avg rating"
              />
              <Stat number="45 min" label="Avg turnaround" />
            </motion.div>
          </div>

          {/* Right: editorial cover image */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={heroCar}
                alt="Black sports car at the moment of finish — water beading on freshly ceramic-coated paint"
                width={900}
                height={1200}
                className="h-full w-full object-cover grayscale-[0.15]"
              />
              {/* warm vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

              {/* corner ticks — like a contact sheet */}
              <Tick className="left-3 top-3" />
              <Tick className="right-3 top-3" />
              <Tick className="left-3 bottom-3" />
              <Tick className="right-3 bottom-3" />
            </div>

            {/* caption block */}
            <div className="mt-4 flex items-start justify-between gap-6">
              <p className="max-w-[14rem] text-[11px] leading-relaxed text-muted-foreground">
                <span className="text-foreground">Plate №12</span> — A 9H ceramic coating
                applied over the course of an afternoon. Photographed by the workshop.
              </p>
              <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                Now booking
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-normal tracking-tight">{number}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <div
      className={`absolute h-3 w-3 ${className}`}
      aria-hidden
    >
      <span className="absolute left-0 top-0 h-px w-3 bg-gold" />
      <span className="absolute left-0 top-0 h-3 w-px bg-gold" />
    </div>
  );
}
