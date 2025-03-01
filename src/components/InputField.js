import { useState } from "react";

export default function InputField(props) {

  return (
    <div>
     

      <input
        className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
        required={props.required}
        name={props.name}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
}
