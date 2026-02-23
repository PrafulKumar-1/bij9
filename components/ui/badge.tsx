import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "bg-[var(--gm-color-gold)]/20 text-[var(--gm-color-gold)]",
        muted: "bg-white/8 text-[var(--gm-color-text-muted)]",
        success: "bg-emerald-400/15 text-emerald-300",
        danger: "bg-rose-400/15 text-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
