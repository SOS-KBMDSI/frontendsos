import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "flex justify-center items-center rounded-2xl transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-700 focus:bg-primary-500 focus:border-3 border-primary-200 active:bg-primary-800 " +
          "disabled:bg-neutral-500/50 disabled:text-secondary-900",

        outline:
          "border-[1.5px] text-primary-500 border-primary-500 hover:bg-primary-200 active:bg-primary-300 focus:border-2 " +
          "disabled:border-neutral-500/50  disabled:text-secondary-900 hover:bg-neutral-500 disabled:bg-transparent",

        transparent:
          "bg-transparent text-primary-500 hover:bg-primary-100 focus:bg-white focus:shadow-[0px_0px_0px_3px_rgba(235,204,211,1.00)] active:bg-primary-300 " +
          "disabled:text-secondary-900 disabled:bg-transparent",
      },
      size: {
        default: "px-5 py-3 text-base ",
        small: "h-9  px-3",
        large: "h-11  px-8",
        icon: "h-13 w-13 p-2 ",
        "icon-large": "h-12 w-12 p-3 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  arrow?: "both" | "top" | "bottom";
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, arrow, children, ...props }, ref) => {
    const hasText = children != null;
    const isVertical = arrow === "top" || arrow === "bottom";

    const finalSize = size || (!hasText ? "icon" : "default");

    const iconSizeClass = "w-5 h-5";

    return (
      <button
        className={cn(
          buttonVariants({ variant, size: finalSize, className }),
          isVertical && "flex-col"
        )}
        ref={ref}
        {...props}
      >
        {arrow === "top" && (
          <ArrowUp className={cn(iconSizeClass, hasText && "mb-2")} />
        )}
        {arrow === "both" && (
          <ArrowLeft className={cn(iconSizeClass, hasText && "mr-2")} />
        )}
        {children}
        {arrow === "both" && (
          <ArrowRight className={cn(iconSizeClass, hasText && "ml-2")} />
        )}
        {arrow === "bottom" && (
          <ArrowDown className={cn(iconSizeClass, hasText && "mt-2")} />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
