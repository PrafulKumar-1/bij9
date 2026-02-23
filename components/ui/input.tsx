import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] px-3 py-2 text-sm text-[var(--gm-color-text)] placeholder:text-[var(--gm-color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gm-color-gold)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
