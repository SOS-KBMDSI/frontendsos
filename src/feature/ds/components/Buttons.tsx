import { Button } from "@/shared/components/ui/Button";
import React from "react";

const Buttons = () => {
  return (
    <div className=" h-full  ">
      <h5 className="font-bold text-4xl mb-4">Button</h5>
      <div className="border-red-300 w-fit space-y-4 border-1 p-4">
        <div className="flex gap-4 items-center">
          <h5>Primary:</h5>
          <Button>Button</Button>
          <Button variant={"primary"} arrow="both">
            Button
          </Button>
          <Button arrow="top" />
          <Button disabled arrow="both">
            Button
          </Button>
          <Button disabled arrow="top" />
        </div>
        <div className="flex gap-4 items-center">
          <h5 className="">Outline:</h5>
          <Button variant={"outline"}>Button</Button>
          <Button variant={"outline"} arrow="both">
            Button
          </Button>
          <Button variant={"outline"} arrow="top" />
          <Button disabled variant={"outline"} arrow="both">
            Button
          </Button>
          <Button disabled variant={"outline"} arrow="top" />
        </div>
        <div className="flex gap-4 items-center">
          <h5>Transparent:</h5>
          <Button variant={"transparent"}>Button</Button>
          <Button variant={"transparent"} arrow="both">
            Button
          </Button>
          <Button variant={"transparent"} arrow="top" />
          <Button disabled variant={"transparent"} arrow="both">
            Button
          </Button>
          <Button disabled variant={"transparent"} arrow="top" />
        </div>
      </div>
    </div>
  );
};

export default Buttons;
