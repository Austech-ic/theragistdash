import React from "react";

const TotalCard = ({ icon, iconName, total, totalLabel }) => {
  return (
    <div className="rounded-[12px] bg-[#FBFBFB] max-h-[94.5px] border border-[#E1E1E1] py-[23px]  px-[12px] md:px-[14px]">
      <div className="flex gap-1">
        <div className="rounded-full bg-[#E6F7F9] h-[36px] w-[36px] md:h-[36px] md:w-[36px] flex justify-center items-center">
          {React.createElement(icon, { icon: iconName, width: "20", height: "20", color: "#00B0C7", variant:"Bold", size:16})}
        </div>
        <div className="flex flex-col ">
          <p className="text-[#282828] font-medium text-[14px] md:text-[16px]">
            {total}
          </p>
          <p className="text-[#263238] font-light text-[14px] md:text-[15px] whitespace-nowrap">
            {totalLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
