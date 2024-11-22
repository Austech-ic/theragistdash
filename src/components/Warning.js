import { Danger } from "iconsax-react";
import React from "react";

const Warning = () => {
  return (
    <div className="px-4 py-[5px] border-t-[0.2px] border-red-500 border-b-[0.2px] bg-red-200">
      <div className="flex  items-center justify-center gap-2">
        <p className="text-[10px] md:text-[12px] text-red-500 text-center ">
          Complete your business verification to enjoy uninterrupted access to
          our services
        </p>
        <Danger color="red" size={12}/> 
      </div>
    </div>
  );
};

export default Warning;
