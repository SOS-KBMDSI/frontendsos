import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-12 py-3 text-xl font-semibold transition-colors",
  {
    variants: {
      variant: {
        // Varian "Belum Mulai"
        not_started:
          "border-transparent bg-default-dark/20 text-white",
        
        // Varian "Selesai"
        completed:
          "border-transparent bg-badgeSuccess text-white",
        
        // Varian "Terlewat"
        overdue:
          "border-transparent bg-badgeOverdue text-white",
      },
    },
    defaultVariants: {
      variant: "not_started",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };