import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl space-y-4 text-center", className)}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.28em] text-[var(--gm-color-gold)]">{eyebrow}</p> : null}
      <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight text-white md:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-[var(--gm-color-text-muted)]">{description}</p> : null}
    </div>
  );
}
