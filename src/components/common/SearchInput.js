import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({value, id, type, placeholder, onChange, name}) => {
  return (
    <div className=" relative w-full max-w-[700px]   flex items-center">
      <Search size="16" color="#98A2B3" className="absolute left-[16px]" />

      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[48px] pl-[44px] py-[18px] text-[14px] text-[#2e2e2e] leading-[20px] bg-[#fff] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#E1E1E1] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] "
        required
        autoComplete="on"
        name={name}
        id={id || ""}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
