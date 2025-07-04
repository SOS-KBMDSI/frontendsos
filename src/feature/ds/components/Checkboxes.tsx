import { Checkbox } from "@/shared/components/ui/Checkbox";
import React from "react";

const Checkboxes = () => {
  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">Checkbox + Text</h5>
      <div className="border-red-300 w-[820px] border-1 p-4">
      <div className="flex items-center space-x-4 p-4">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-default-dark/50 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Placeholder
        </label>
      </div>
      </div>
    </div>
  );
};

export default Checkboxes;