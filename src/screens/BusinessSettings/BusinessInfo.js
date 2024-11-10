import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { MainComponent, Sms } from "iconsax-react";
import { GiPhone } from "react-icons/gi";
import ImageUpload from "../../components/UploadImage";
import { ClipLoader } from "react-spinners";

const BusinessInfo = () => {
  const [selectedInfo, setSelectedInfo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const info = [
    { id: 1, name: "Business Profile" },
    { id: 2, name: "Business Address" },
    { id: 3, name: "Business Document" },
  ];
  return (
    <div className="p-4 md:p-6 flex gap-4 md:gap-6">
      <m.div
        initial={{ x: -30, opacity: 0.4 }}
        animate={{
          x: 0,
          opacity: 1,
          // scale: 1,
        }}
        transition={{
          duration: 0.9,
        }}
        className="w-[25%]"
      >
        {info &&
          info?.map((inf, index) => (
            <button
              onClick={() => setSelectedInfo(inf?.id)}
              className={`flex-item gap-3  ${
                selectedInfo === inf?.id
                  ? "translate-x-2  bg-[#26ae5f] text-white"
                  : "bg-[#fefefe]"
              } ${
                index === 0 ? "" : "mt-4"
              } hover:translate-x-2  transition-transform ease-in-out   w-[90%] border-[0.2px] border-[#98a2b3] relative rounded-[8px]  p-[14px] md:px-[20px] md:py-4`}
            >
              <MainComponent
                size="18"
                color={` ${selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"}`}
              />

              <p className="  text-[14px]  font-normal leading-[16px]  ">
                {inf?.name}
              </p>
            </button>
          ))}
      </m.div>{" "}
      <div className="border-[0.2px] overflow-hidden flex-1 border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        {selectedInfo === 1 && (
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
            <div className="flex gap-3">
              {" "}
              <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                Business Logo:
              </label>{" "}
              <ImageUpload />
            </div>

            <div className="mb-[16px] md:mb-[20px]">
              <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                Business Name
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder="Enter business name"
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busName"
                  // value={formValue.busName}
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
                Business Website
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder="https://domain.xyz"
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busWebsite"
                  // value={formValue.busWebsite}
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
                Business Description
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder="electronics supplier"
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busDescription"
                  // value={formValue.busDescription}
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
                Business RC Number
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="rcNumber"
                  // value={formValue.rcNumber}
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
                Business Incorporation Date
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="date"
                  placeholder=""
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="incopDate"
                  // value={formValue.incopDate}
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
        )}

        {selectedInfo === 2 && (
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
                Support Email
              </label>
              <div className=" relative    flex items-center">
                <Sms
                  size="16"
                  color="#98A2B3"
                  className="absolute left-[16px]"
                />

                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full  h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busSupportEmail"
                  // value={formValue.busSupportEmail}
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
                Chargeback Email
              </label>
              <div className=" relative    flex items-center">
                <Sms
                  size="16"
                  color="#98A2B3"
                  className="absolute left-[16px]"
                />

                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full  h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="chargeBackEmail"
                  // value={formValue.chargeBackEmail}
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
                Business City
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busCity"
                  // value={formValue.busCity}
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
                Business Address
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="busAddress"
                  // value={formValue.busAddress}
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
        )}
         {selectedInfo === 3 && (
        <m.div
          initial={{ x: 20, opacity: 0.4 }}
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
              CERTIFICATE OF INCORPORATION <sup className="text-red-400">*</sup>
            </label>
            <div className=" ">
              <input
                className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                id="csv"
                name="csv"
                type="file"
                accept=".jpg,.pdf"
                // onChange={(e) => setIncopFile(e.target.files[0])}
              />
              <p className="text-[10px] text-gray-400">
                *Maximum file size is 2MB
              </p>
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              VALID ID OF A DIRECTOR
              <sup className="text-red-400">*</sup>
            </label>
            <div className="">
              <input
                className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                id="csv"
                name="csv"
                type="file"
                accept=".jpg,.pdf"
                // onChange={(e) => setDirectorId1File(e.target.files[0])}
              />
              <p className="text-[10px] text-gray-400">
                *Maximum file size is 2MB
              </p>
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              CAC Form BN/1 or CAC Form 1.1 (C07 for older companies)
              <sup className="text-red-400">*</sup>
            </label>
            <div className="">
              <input
                className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                id="csv"
                name="csv"
                type="file"
                accept=".jpg,.pdf"
                // onChange={(e) => setCacForm(e.target.files[0])}
              />
              <p className="text-[10px] text-gray-400">
                *Maximum file size is 2MB
              </p>
            </div>
          </div>
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              VALID ID OF ANOTHER DIRECTOR
              <sup className="text-red-400">*</sup>
            </label>
            <div className="">
              <input
                className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                id="csv"
                name="csv"
                type="file"
                accept=".jpg,.pdf"
                // onChange={(e) => setDirectorId2File(e.target.files[0])}
              />
              <p className="text-[10px] text-gray-400">
                *Maximum file size is 2MB
              </p>
            </div>
          </div>

          <div className="py-[20px] border-t border-b-[#E4E7EC]  ">
            <div className="flex-item gap-2 w-full">
              <div className="flex-item justify-end">
                {" "}
                <button
                  // onClick={handleSubmit}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Submit</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
      </div>
     
    </div>
  );
};

export default BusinessInfo;
