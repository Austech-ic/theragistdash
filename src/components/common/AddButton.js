import { ProfileAdd } from "iconsax-react";
import React from "react";

const AddButton = ({ name, action, color, noIcon }) => {
  return (
    <button
      onClick={action}
      className="rounded-[8px] py-[12px] px-4 flex items-center gap-1 text-white  bg-[#1254bd] hover:bg-[#0f4a8e] focus:outline-none focus:ring-2 focus:ring-[#1254bd] focus:ring-offset-2 transition duration-200 ease-in-out"
    >
      {!noIcon && (
        <ProfileAdd
          variant="Bold"
          color="#fff"
          className="h-[14px] md:h-[16px]"
        />
      )}
      {name}
    </button>
  );
};

export default AddButton;
