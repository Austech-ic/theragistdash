import React from "react";
import {Copy,} from "iconsax-react";
const AccountDetails = ({
  profileData,
  selectedCard,
  handleCopy,
  copiedRef,
  reduceHeight
}) => {
  if (profileData?.default_partner?.account_numbers.length > 0 && selectedCard?.abb === "NGN") {
    const account = profileData?.default_partner?.account_numbers[0];
    
    return (
      <div className={`bg-[#1B2026] relative rounded-[12px] px-[16px]   -mt-[16px] ${reduceHeight ? "pb-[20px] pt-[18px]" : "pb-[34px] pt-[24px]"}`}>
        <p className="text-[#fff] font-medium text-[12px] leading-[14px] tracking-[0.2px] mb-[8px]">
          {account?.bank}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-[#fff] font-semibold text-[14px] leading-[17px] tracking-[0.2px]">
            {account?.account_number}
          </p>
          <button
            onClick={() => handleCopy(account?.account_number)}
            className="absolute top-[12px] right-[16px]"
          >
            <p className="text-[#fff] font-semibold text-[10px] leading-[9.68px]">
              {copiedRef === account?.account_number ? "Copied!" : <Copy size={20} variant="Bold" color="#fff" />}
            </p>
          </button>
        </div>
        <p className="text-[#fff] font-normal text-[12px] leading-[14px] tracking-[0.2px]">
          {account?.account_name}
        </p>
      </div>
    );
  }

};

export default AccountDetails