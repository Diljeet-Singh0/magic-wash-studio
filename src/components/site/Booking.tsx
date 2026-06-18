import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function Booking() {
  const [sent, setSent] = useState(false);

  return (
    <section id="book" className="relative py-32">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, oklch(0.82 0.18 210 / 0.2), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden rounded-3xl"
        >
          <div className="grid lg:grid-cols-5">
            <div className="bg-gradient-aqua p-10 lg:col-span-2">
              <h3 className="font-display text-3xl font-black text-primary-foreground">
                Book your wash
              </h3>
              <p className="mt-3 text-sm text-primary-foreground/80">
                Pick a slot. Pay later. Cancel free up to 2 hours before.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-primary-foreground/90">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" /> Doorstep service</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" /> Eco-friendly chemicals</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" /> Trained detailers</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" /> 100% satisfaction guarantee</li>
              </ul>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-4 p-10 lg:col-span-3"
            >
              {sent ? (
                <div className="grid place-items-center py-10 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-aqua glow-aqua">
                    <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="mt-4 text-2xl font-bold">Booking confirmed!</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll WhatsApp you the details in 60 seconds.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="James Wilson" required />
                    <Field label="Phone" name="phone" placeholder="+64 21 234 5678" required />

                  </div>
                  <Field label="Car model" name="car" placeholder="Toyota Corolla 2022" required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select label="Package" name="pkg" options={["Express — NZ$39", "Premium — NZ$99", "Showroom — NZ$249"]} />
                    <Field label="Preferred date" name="date" type="date" required />
                  </div>
                  <Field label="Address" name="address" placeholder="Where should we come?" required />
                  <button
                    type="submit"
                    className="mt-2 rounded-full bg-gradient-aqua px-7 py-3.5 font-semibold text-primary-foreground glow-aqua transition-transform hover:scale-[1.02]"
                  >
                    Confirm Booking
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        name={name}
        {...rest}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm outline-none transition-colors focus:border-aqua"
      />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        name={name}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm outline-none transition-colors focus:border-aqua"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
