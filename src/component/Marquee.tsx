import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Marquee = () => {
  return (
    <div className="mb-10 flex items-center justify-center gap-6 bg-[#f4f4f4] p-2.5">
      <ChevronLeft className="h-5 w-5" />
      <span className="font-sm font-medium">
        Get 10% off on business sign up
      </span>
      <ChevronRight className="h-5 w-5" />
    </div>
  );
};

export default Marquee;
