import React from "react";

const PrimaryButton = ({
  bg,
  onClick,
  disabled,
  type,
  color,
  isLoading,
  title,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`cursor-pointer ${
        bg ? bg : "bg-primary"
      } text-white disabled:cursor-not-allowed disabled:opacity-50 min-w-[200px] flex justify-center items-center py-3 px-3 shadow-sm rounded-[6px] font-semibold text-[14px]`}
    >
      {title}
      {isLoading && (
        <span className="px-3 block">
          <ClipLoader color={color} size={20} />
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
