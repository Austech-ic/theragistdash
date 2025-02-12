import React from "react";
import animationData from "../assets/emptyList.json";
import Lottie from "react-lottie";
import { Add } from "iconsax-react";

const EmptyList = ({title, action}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <div className="h-[130px] border text-[#667185] mb-4  hover:bg-gray-50  rounded-lg border-dashed border-spacing-2 flex flex-col justify-center items-center ">
      <Lottie options={defaultOptions} height={150} width={150} />



      <button onClick={action} className="rounded-md text-white text-[14px] py-[5px] px-3 bg-[#26ae5f] hover:bg-opacity-85 mb-2 flex items-center gap-1">
        <Add size={14} color="white" />
        <p>
            Add {title}</p> 
      </button>

    </div>
  );
};

export default EmptyList;
