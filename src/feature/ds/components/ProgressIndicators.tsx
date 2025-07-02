"use client";

import { ProgressIndicator } from "@/shared/components/ui/ProgressIndicator";
import React, { useState } from "react";

const ProgressIndicators = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <h5 className="font-bold text-4xl mb-4">Progress Indicator</h5>
      <div className="border-red-300 w-[820px] border-1 p-4 flex justify-center">
        <div className="p-4">
          <ProgressIndicator
            totalSlides={3}
            activeIndex={activeIndex}
            onDotClick={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicators;
