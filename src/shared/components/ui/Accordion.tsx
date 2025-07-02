import React, { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group",
      "rounded-lg border-2 transition-all duration-300",

      "data-[state=closed]:border-2 data-[state=closed]:border-primary-500/20",

      "data-[state=closed]:hover:border-1 data-[state=closed]:hover:border-neutral-300",
      "data-[state=closed]:hover:shadow-[0_4px_12px_0_theme(colors.default-dark/10%)]",

      "data-[state=open]:rounded-xl data-[state=open]:border-1 data-[state=open]:border-primary-500",
      "data-[state=open]:shadow-[0_4px_12px_0_theme(colors.default-dark/10%)]",

      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full flex-1 items-center justify-between px-[30px] py-6 text-left text-size-xl font-semibold transition-colors duration-300",

        "text-primary-500/20",

        "group-hover:data-[state=closed]:text-primary-500",

        "data-[state=open]:text-primary-500",
        "data-[state=open]:border-b-1 data-[state=open]:border-b-neutral-300",

        className
      )}
      {...props}
    >
      {children}
      <div className="flex items-center justify-center rounded-full bg-primary-500/20 px-[5px] py-[4px]">
        <ChevronDown
          className={cn(
            "h-8 w-8 shrink-0 transition-transform duration-200",
            "text-primary-500",
            "group-data-[state=open]:rotate-180"
          )}
        />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className="p-[30px]">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
