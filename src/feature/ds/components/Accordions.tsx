import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/Accordion";
import React from "react";

const Accordions = () => {
  const dummyText =
    "This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.";

  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">FAQ Accordion</h5>
      <div className="border-red-300 w-[820px] border-1 p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>This is a question</AccordionTrigger>
            <AccordionContent>{dummyText}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Accordions;