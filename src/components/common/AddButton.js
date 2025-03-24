import { ProfileAdd } from "iconsax-react";
import React from "react";

const AddButton = ({ name, action, color, noIcon }) => {
  return (
    <button
      onClick={action}
      className="rounded-[8px] py-[12px] px-4 flex items-center gap-1 text-white  primary-bg"
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
