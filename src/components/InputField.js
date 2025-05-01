import { useState } from "react";

export default function InputField(props) {

  return (
    <div className="w-full">

      <input
        className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] "
        required={props?.required}
        name={props?.name || ""}
        value={props?.value}
        type={props?.type|| "text"}
        placeholder={props?.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        autoComplete={false}

      />
    </div>
  );
}