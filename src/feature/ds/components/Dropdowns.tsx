import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import React from "react";

const Dropdowns = () => {
  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">Dropdown</h5>
      <div className="border-red-300 w-[820px] border-1 p-4">
        <div className="w-[140px] py-[10px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lorem1">Lorem</SelectItem>
                <SelectItem value="lorem2">Ipsum</SelectItem>
                <SelectItem value="lorem3">Dolor</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Dropdowns;
