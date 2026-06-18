import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Packages } from "@/components/site/Packages";
import { Process } from "@/components/site/Process";
import { Stats } from "@/components/site/Stats";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Booking } from "@/components/site/Booking";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { ScrollProgress, CursorGlow, Marquee } from "@/components/site/MotionFX";

const FAQS = [
  { q: "How long does a wash take?", a: "Express takes ~15 minutes. Premium ~45 minutes. Full Showroom detailing can take 3-5 hours depending on your car's condition." },
  { q: "Do you really come to my home?", a: "Yes — we bring water, power and all equipment in our mobile unit. We service homes, offices, malls and parking lots." },
  { q: "Is it safe for my paint?", a: "We use pH-neutral foam, microfiber mitts and grit guards. Our trained detailers follow the 2-bucket method to prevent swirls." },
  { q: "How long does ceramic coating last?", a: "Our 9H ceramic coating lasts 2 years with a maintenance wash every 3 months. We offer a written warranty." },
  { q: "What about water usage?", a: "We use less than 2 litres per wash with our steam + foam system — that's 100x less than a traditional wash." },
  { q: "Can I cancel?", a: "Yes, free cancellation up to 2 hours before your slot. After that we charge a small visit fee." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaDrive — Premium Mobile Car Wash & Detailing" },
      { name: "description", content: "Showroom shine delivered to your driveway. Eco-friendly mobile car wash, ceramic coating, and full detailing by trained pros." },
      { property: "og:title", content: "AquaDrive — Premium Mobile Car Wash" },
      { property: "og:description", content: "Book a premium mobile car wash in under 60 seconds. Eco-friendly, doorstep, showroom finish." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "AquaDrive",
          description: "Premium mobile car wash and detailing service.",
          telephone: "+64 21 234 5678",
          areaServed: ["Auckland", "Wellington", "Christchurch"],
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee items={["Mobile detailing", "9H ceramic coating", "Paint correction", "Eco — 2 L per wash", "Trained technicians", "Doorstep service", "Est. 2014"]} />
      <Stats />
      <Services />
      <Packages />
      <Process />
      <Gallery />
      <Marquee items={["12,400 cars finished", "4.9 average rating", "Auckland · Wellington · Christchurch", "Booking in 60 seconds", "Written warranty"]} />
      <Testimonials />
      <Booking />
      <FAQ />
      <Footer />
      <AIAssistant />
    </main>
  );
}
