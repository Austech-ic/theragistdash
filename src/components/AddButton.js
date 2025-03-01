import { Add } from "iconsax-react";
import React from "react";

const AddButton = ({action, title}) => {
  return (
    <button
      onClick={action}
      className="flex items-center gap-[8px] hover:bg-[#26ae5f]/20 px-2 py-1 rounded-lg "
    >
      <p className="text-[14px] text-[#26ae5f] leading-[20px]">{title}</p>

      <Add variant="Linear" color="#26ae5f" size="16" />
    </button>
  );
};

export default AddButton;
