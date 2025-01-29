import { Add } from "iconsax-react";
import React from "react";

const NewCard = () => {
  return (
    <div className="w-96 h-56 relative [perspective:1000px] group cursor-pointer">
      <div className=" w-full h-full [backface-visibility:hidden] group-hover:bg-gradient-to-l  transition-transform duration-500 ease-in-out bg-gradient-to-r from-indigo-500 to-[#51c280] rounded-xl p-6 text-white shadow-xl">
        <div className=" border border-dashed border-spacing-2  border-white flex justify-center items-center h-full rounded-xl">
          <div className="text-center text ">
            <Add color="white" className="mx-auto text-center " />
            <p className="text-white text-xs text-center"> Add a new card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
