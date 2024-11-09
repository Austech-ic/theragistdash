import React from "react";
import { motion as m } from "framer-motion";
import { Sms } from "iconsax-react";
import { GiPhone } from "react-icons/gi";

const PersonalInfo = () => {
  return (
    <div className="p-4 md:p-6">
      {" "}
      <div className="border-[0.2px] overflow-hidden flex-1 border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        <m.div
          initial={{ x: 30, opacity: 0.4 }}
          animate={{
            // x: selectedInfo === 1 ? 0 : 100,
            x: 0,
            opacity: 1,
            // scale: 1,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              First Name
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="firstName"
                // value={formValue.firstName}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Last Name
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="lastName"
                // value={formValue.lastName}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Email
            </label>
            <div className=" relative    flex items-center">
              <Sms size="16" color="#98A2B3" className="absolute left-[16px]" />

              <input
                type="email"
                placeholder="Enter email address"
                className="w-full  h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="email"
                // value={formValue.email}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Phone Number
            </label>
            <div className=" relative    flex items-center">
              <GiPhone
                size="16"
                color="#98A2B3"
                className="absolute left-[16px] "
              />

              <input
                type="text"
                placeholder="8083XXXXXXX"
                className="w-full  h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="phone"
                // value={formValue.phone}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              House Address
            </label>
            <div className=" relative    flex items-center">
              <textarea
                type="text"
                placeholder="14, xxxx street"
                className="w-full  h-[120px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="address"
                // value={formValue.address}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              NIN
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="2933 23XX XXX "
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="nin"
                // value={formValue.nin}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default PersonalInfo;
