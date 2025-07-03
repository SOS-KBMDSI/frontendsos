import React, { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/shared/utils/cn";

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      //dasar
      "peer h-6 w-6 shrink-0 rounded-lg border-2 transition-colors cursor-pointer",
      
      //focus
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-dark focus-visible:ring-offset-2",
      
      //disable
      "disabled:cursor-not-allowed disabled:opacity-50",

      //default
      "border-default-dark bg-white",

      //hover
      "hover:bg-default-dark/10",
      
      //selected
      "data-[state=checked]:bg-default-dark data-[state=checked]:border-default-dark data-[state=checked]:text-white",

      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-5 w-5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };