import { BadgeCheck, ClipboardCheck, ShieldCheck, Truck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "Verified Merchant Exporter" },
  { icon: ClipboardCheck, text: "Documentation Expertise" },
  { icon: BadgeCheck, text: "QC & Inspection Workflow" },
  { icon: Truck, text: "Global Shipping Support" },
];

export function TrustBadges() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.text}
            className="flex items-center gap-2 rounded-md border border-[var(--gm-color-border)] bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--gm-color-text-muted)]"
          >
            <Icon className="h-4 w-4 text-[var(--gm-color-gold)]" />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
