import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const inputVariants = cva(
  "w-full rounded-xl border px-4 py-3 text-base transition-all duration-200 placeholder:text-secondary-700 focus:outline-none bg-white",
  {
    variants: {
      variant: {
        default:
          "border-black-50 text-black focus:border-black focus:ring-[0.5px] focus:ring-black",
        error:
          "border-danger text-black hover:border-danger focus:border-danger focus:ring-[0.5px] focus:ring-danger",
        success:
          "border-success text-black hover:border-success focus:border-success focus:ring-[0.5px] focus:ring-success",
      },
      state: {
        default: "",
        hover: "",
        pressed: "",
        disabled:
          "cursor-not-allowed bg-white text-secondary-700 border-secondary-700 hover:border-secondary-700 focus:border-secondary-700 focus:ring-0",
      },
      size: {
        default: "px-4 py-3 text-base",
        small: "px-3 py-2 text-sm rounded-lg",
        large: "px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "default",
      size: "default",
    },
  }
);

const labelVariants = cva("block text-lg font-semibold mb-2", {
  variants: {
    variant: {
      default: "text-black",
      error: "text-black",
      success: "text-black",
    },
    disabled: {
      true: "text-secondary-700",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    disabled: false,
  },
});

const statusVariants = cva("text-base mt-2", {
  variants: {
    variant: {
      default: "text-black",
      error: "text-black",
      success: "text-black",
    },
    disabled: {
      true: "text-secondary-700",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    disabled: false,
  },
});

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  status?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  statusClassName?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      statusClassName,
      wrapperClassName,
      variant,
      state,
      size,
      label,
      status,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const finalState = disabled ? "disabled" : state;
    const finalVariant = variant || "default";

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            className={cn(
              labelVariants({
                variant: finalVariant,
                disabled: disabled,
              }),
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className={cn("relative", wrapperClassName)}>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-700">
              {leftIcon}
            </div>
          )}

          <input
            className={cn(
              inputVariants({
                variant: finalVariant,
                state: finalState,
                size,
              }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-700">
              {rightIcon}
            </div>
          )}
        </div>

        {status && (
          <p
            className={cn(
              statusVariants({
                variant: finalVariant,
                disabled: disabled,
              }),
              statusClassName
            )}
          >
            {status}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants, labelVariants, statusVariants };
