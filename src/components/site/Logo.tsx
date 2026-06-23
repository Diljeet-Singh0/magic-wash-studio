import logo from "@/assets/steam-clean-logo.png";

export function Logo({ className }: { className?: string }) {
  return <img src={logo} alt="Steam Clean" className={`object-contain ${className ?? ""}`} />;
}
