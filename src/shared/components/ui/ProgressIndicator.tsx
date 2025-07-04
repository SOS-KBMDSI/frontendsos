import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const dotVariants = cva("shrink-0 rounded-full transition-all duration-300", {
  variants: {
    variant: {
      active: "h-5 w-5 bg-primary-500",
      inactive: "h-4 w-4 bg-primary-200",
    },
  },
  defaultVariants: {
    variant: "inactive",
  },
});

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  totalSlides: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const ProgressIndicator = ({
  className,
  totalSlides,
  activeIndex,
  onDotClick,
  ...props
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            dotVariants({
              variant: activeIndex === index ? "active" : "inactive",
            })
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export { ProgressIndicator };
