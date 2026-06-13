import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { Scene3D } from "./Scene3D";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse-tracking 3D tilt for the hero card
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 20);
    rotateX.set(-py * 20);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-hero pt-32">
      {/* 3D WebGL scene background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Scene3D />
      </div>

      {/* animated grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.82 0.18 210 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 210 / 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* floating bubbles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-aqua/20 blur-sm"
          style={{
            width: 8 + (i % 4) * 6,
            height: 8 + (i % 4) * 6,
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-aqua" />
              Premium Detailing • Eco-Friendly • Doorstep Service
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl"
            >
              Your car deserves
              <br />
              <span className="text-gradient-aqua">a showroom</span>
              <br />
              <span className="text-gradient-chrome">finish.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
            >
              Touchless wash, ceramic coating, and full interior detailing — performed by trained pros, delivered at your doorstep in under 60 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#book"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-aqua px-7 py-3.5 font-semibold text-primary-foreground glow-aqua transition-transform hover:scale-105"
              >
                Book a Wash
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#packages"
                className="rounded-full border border-border bg-secondary/50 px-7 py-3.5 font-semibold backdrop-blur transition-colors hover:bg-secondary"
              >
                See Packages
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-background bg-gradient-aqua"
                    style={{ background: `linear-gradient(${i * 90}deg, oklch(0.82 0.18 210), oklch(0.6 0.2 250))` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-aqua text-aqua" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">12,000+ happy drivers</p>
              </div>
            </motion.div>
          </div>

          {/* 3D Hero image with mouse-tilt */}
          <motion.div
            style={{ y, scale }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="animate-float-3d relative"
            >
              <div className="absolute -inset-6 rounded-3xl bg-gradient-aqua opacity-30 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border glass-card">
                <img
                  src={heroCar}
                  alt="Luxury car being washed with cinematic blue lighting"
                  width={1600}
                  height={1100}
                  className="h-full w-full object-cover"
                />
                {/* shine sweep */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="animate-drift absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </div>

              {/* floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glass-card absolute -left-4 top-10 rounded-2xl p-4 shadow-card"
              >
                <p className="text-xs text-muted-foreground">Eco wash</p>
                <p className="text-lg font-bold">2L water only</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="glass-card absolute -right-4 bottom-10 rounded-2xl p-4 shadow-card"
              >
                <p className="text-xs text-muted-foreground">Avg time</p>
                <p className="text-lg font-bold text-gradient-aqua">45 min</p>
              </motion.div>
            </div>
          </motion.div>
            </motion.div>
          </motion.div>
    </section>
  );
}
