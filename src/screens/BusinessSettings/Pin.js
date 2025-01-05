import React, { useState } from "react";
import { decryptaValue, encryptaValue } from "../../utils/helperFunctions";
import { motion as m } from "framer-motion";
import { Eye, EyeSlash } from "iconsax-react";

const Pin = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const toggle2 = () => {
    setOpen2(!open2);
  };

  return (
    <div className="p-4 md:p-6">
      {" "}
      <div className="w-full md:w-[60%] lg:w-[50%]  border-[0.2px] overflow-hidden flex-1 border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[18px] ">
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
          <p className="text-[14px] md:text-[16px]  font-medium  text-[#000000] mb-3">
            Update PIN
          </p>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[13px] md:text-[14px]  font-normal  text-[#000000] mb-[8px]">
              Current Pin
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="****"
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="busName"
                //   disabled={formValue.busName ? true : false}

                //   value={formValue.busName}
                //   onChange={(e) => {
                //     handleInputChange(e);
                //   }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px]  font-normal  text-[#000000] mb-[8px]">
              Password
            </label>
            <div className=" relative    flex items-center">
              <div className="absolute right-[16px]">
                {open === false ? (
                  <Eye size="16" color="#98A2B3" onClick={toggle} />
                ) : (
                  <EyeSlash size="16" color="#98A2B3" onClick={toggle} />
                )}
              </div>
              <input
                type={open === false ? "password" : "text"}
                placeholder="****"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="pin"
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                maxLength={4}
              />
            </div>
          </div>

          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px]  font-normal  text-[#000000] mb-[8px]">
            Confirm  Password
            </label>
            <div className=" relative    flex items-center">
              <div className="absolute right-[16px]">
                {open2 === false ? (
                  <Eye size="16" color="#98A2B3" onClick={toggle2} />
                ) : (
                  <EyeSlash size="16" color="#98A2B3" onClick={toggle2} />
                )}
              </div>
              <input
                type={open2 === false ? "password" : "text"}
                placeholder="****"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="pin"
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                maxLength={4}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-[14px] mt-[18px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[24px]"
          >
            <p className="text-sm font-medium leading-[20px]">Submit</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>
        </m.div>
      </div>
    </div>
  );
};

export default Pin;
