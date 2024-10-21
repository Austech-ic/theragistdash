import {
  ArrowRight2,
  ArrowRight3,
  MainComponent,
  Profile,
  Sms,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { GiPhone } from "react-icons/gi";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { decrypt, decryptMessage, decryptValue, encryptValue } from "../utils/helperFunctions";

const GetStarted = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(1);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    rcNumber: "",
    email: "",
    phone: "",
    incopDate: "",
  });
  // bg-[#26ae5f6a]
  async function getProfile(page) {
    const response = await api.fetchUsers({ params: { page } });
    return response;
  }

  const ProfileQuery = useQuery(["users"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = ProfileQuery?.data || [];

  useEffect(() => {
    setFormValue({
      ...formValue,
      firstName: profileData?.first_name,
      lastName: profileData?.last_name,
      phone: profileData?.phone,
      email: profileData?.email,
    });
const enc = encryptValue("hello world")


  //  const dec =  decryptValue("sEQqpBngzSw4RiNSazz81g==")

  //  console.log("dec===>>>>",dec)
   console.log("enc===>>>>",enc)
  }, []);

  const info = [
    { id: 1, name: "Personal Information" },
    { id: 2, name: "Business Information" },
    { id: 3, name: "BVN Of Manager" },
    { id: 4, name: "Upload Document" },
  ];

  return (
    <div className="p-[10px] md:px-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        <div className=" bgImage bg-cover bg-no-repeat">
          <img
            src="./assets/fblob.png"
            alt="blob"
            className="absolute top-0 right-0 h-[220px] "
          />
          <p className="text-[#000] text-[14px] md:text-[16px] z-20 xl:text-[18px] italic font-semibold leading-[24px]  mt-6 ">
            Hello Kaileb
          </p>
          <p className="text-[#000] text-[14px] md:text-[16px] z-20 xl:text-[18px] font-medium leading-[24px]  mt-2 ">
            Welcome to Vant's KYC Verification
          </p>

          <p className="text-[#667185] text-[14px] md:text-[14px]  font-normal leading-[24px] mt-5 w-full md:w-[70%] xl:w-[60%] ">
            To ensure a secure and compliant environment for all our partners,
            we kindly request you to complete the KYC (Know Your Customer)
            verification process. This helps us verify your business identity,
            protect sensitive data, and ensure regulatory compliance.{" "}
          </p>
          <p className="text-[#667185] text-[14px] md:text-[14px] font-normal leading-[24px] mt-3  ">
            By completing this process, you’ll enjoy uninterrupted access to our
            services and build trust within our platform.
          </p>
        </div>
      </div>

      <div className="flex mt-4 md:mt-6 gap-[24px]">
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
          className="w-[30%]"
        >
          {info &&
            info?.map((inf, index) => (
              <button
                onClick={() => setSelectedInfo(inf?.id)}
                className={`flex-between  ${
                  selectedInfo === inf?.id
                    ? "translate-x-2  bg-[#f3f3f3]"
                    : "bg-[#fefefe]"
                } ${
                  index === 0 ? "" : "mt-4"
                } hover:translate-x-2  transition-transform ease-in-out   w-[90%] border-[0.2px] border-[#98a2b3] relative rounded-[8px]  p-[14px] md:p-[20px]`}
              >
                <MainComponent size="18" color="#26ae5f " />
                <p className="text-[#3d4350]  text-[14px] md:text-[16px] font-normal leading-[20px]  ">
                  {inf?.name}
                </p>
                <ArrowRight2 size="18" color="#98a2b3" />
              </button>
            ))}
        </m.div>
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
              <p className="text-[#000] text-[14px] md:text-[16px] flex gap-3 z-20 xl:text-[18px] italic font-semibold leading-[24px]  mb-6 ">
                Personal Information
              </p>
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
                    autoComplete="on"
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
                    autoComplete="on"
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
                    autoComplete="on"
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
                    autoComplete="on"
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
                    autoComplete="on"
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
                  NIN
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="2933 23XX XXX "
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
                    name="nin"
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

              <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
                <div className="flex-item gap-2">
                  {" "}
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Submit</>
                    )}
                  </button>
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
              <p className="text-[#000] text-[14px] md:text-[16px] flex gap-3 z-20 xl:text-[18px] italic font-semibold leading-[24px]  mb-6 ">
                Business Information
              </p>
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
                    autoComplete="on"
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
                  Business Website
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="https://domain.xyz"
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
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
                  Business Description
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="electronics supplier"
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
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
                    autoComplete="on"
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
                    autoComplete="on"
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
                  Business City
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
                    name="nin"
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
                  Business Address
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
                    name="nin"
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

              <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
                <div className="flex-item gap-2">
                  {" "}
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Submit</>
                    )}
                  </button>
                </div>
              </div>
            </m.div>
          )}


          {selectedInfo === 3 && (
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
              <p className="text-[#000] text-[14px] md:text-[16px] flex gap-3 z-20 xl:text-[18px] italic font-semibold leading-[24px]  mb-6 ">
                BVN Information
              </p>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  B.V.N
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="1234 XXXX XXX"
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
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
                  B.V.N Date Of Birth
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="date"
                    placeholder=""
                    className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    autoComplete="on"
                    name="dob"
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

              <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
                <div className="flex-item gap-2">
                  {" "}
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Submit</>
                    )}
                  </button>
                </div>
              </div>
            </m.div>
          )}

{selectedInfo === 4 && (
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
              <p className="text-[#000] text-[14px] md:text-[16px] flex gap-3 z-20 xl:text-[18px] italic font-semibold leading-[24px]  mb-6 ">
               Upload Business Information
              </p>
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
                  />
                                   <p className="text-[10px] text-gray-400">*Maximum file size is 2MB</p>

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
                  />
                  <p className="text-[10px] text-gray-400">*Maximum file size is 2MB</p>
                 
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
                  />
                  <p className="text-[10px] text-gray-400">*Maximum file size is 2MB</p>
                 
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
                  />
                  <p className="text-[10px] text-gray-400">*Maximum file size is 2MB</p>
                 
                </div>
              </div>

              
            

              <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
                <div className="flex-item gap-2">
                  {" "}
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Submit</>
                    )}
                  </button>
                </div>
              </div>
            </m.div>
          )}


          
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
