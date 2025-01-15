import {
  ArrowRight2,
  ArrowRight3,
  Building,
  CardTick1,
  Danger,
  DocumentCloud,
  MainComponent,
  Personalcard,
  Profile,
  Sms,
  TickCircle,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { GiPhone } from "react-icons/gi";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import {
  decrypt,
  decryptaValue,
  decryptMessage,
  decryptValue,
  encryptaValue,
  encryptValue,
} from "../utils/helperFunctions";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(1);
  const [filledSection, setFilledSection] = useState([]);
  const [incopFile, setIncopFile] = useState(null);
  const [directorId1File, setDirectorId1File] = useState(null);
  const [directorId2File, setDirectorId2File] = useState(null);
  const [cacForm, setCacForm] = useState(null);
  const [personalDisabled, setPersonalDisabled] = useState(false);
  const [busDisabled, setBusDisabled] = useState(false);
  const [bvnDisabled, setBvnDisabled] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    busName: "",
    busWebsite: "",
    busDescription: "",
    busEmail: "",
    busSupportEmail: "",
    chargeBackEmail: "",
    busCity: "",
    busAddress: "",
    bvn: "",
    rcNumber: "",
    email: "",
    phone: "",
    incopDate: "",
    address: "",
    nin: "",
  });
  // bg-[#26ae5f6a]
  async function getKyc(page) {
    const response = await api.getKyc({ params: { page } });
    return response;
  }
  async function getKyb(page) {
    const response = await api.getBusInfo({ params: { page } });
    return response;
  }
  async function getBvn(page) {
    const response = await api.getBvn({ params: { page } });
    return response;
  }

  const ProfileQuery = useQuery(["users"], () => getKyc(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const BussQuery = useQuery(["kyb"], () => getKyb(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const BvnQuery = useQuery(["bvn"], () => getBvn(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  async function getProfile(page) {
    const response = await api.getProfile({ params: { page } });
    return response;
  }

  const ProfilesQuery = useQuery(["profile"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profilesData = ProfilesQuery?.data || [];

  const profileData = ProfileQuery?.data?.data || [];
  const busData = BussQuery?.data?.data || [];
  const bvnData = BvnQuery?.data?.data || [];

  function addValuePush(arr, value) {
    arr.push(value);
    return arr;
  }
  useEffect(() => {
    if (profilesData?.default_partner?.is_verified === 1) {
      navigate("/overview");
    }
    setFormValue({
      ...formValue,
      firstName: profileData?.first_name,
      lastName: profileData?.last_name,
      phone: profileData?.phone,
      email: profileData?.email,
      nin: profileData?.nin,
      address: profileData?.house_address,
      busName: busData?.name,
      busWebsite: busData?.website,
      busDescription: busData?.description,
      busEmail: busData?.email,
      busSupportEmail: busData?.support_email,
      chargeBackEmail: busData?.chargeback_email,
      rcNumber: busData?.rc_number,
      incopDate: busData?.incorporation_date,
      busCity: busData?.city,
      busAddress: busData?.address,
      bvn: bvnData?.bvn,
    });
    if (profileData?.personal_info_status === "completed") {
      setFilledSection(addValuePush(filledSection, 1));
      setPersonalDisabled(true);
    }
    if (busData?.business_info_status === "completed") {
      setFilledSection(addValuePush(filledSection, 2));
      setBusDisabled(true);
    }
    if (bvnData?.bvn_status === "completed") {
      setFilledSection(addValuePush(filledSection, 3));
      setBvnDisabled(true);
    }
    if (profilesData?.default_partner?.documents_status === "completed") {
      setFilledSection(addValuePush(filledSection, 4));
      setUploadDisabled(true);
    }
  }, [
    ProfileQuery?.data,
    BussQuery?.data,
    BvnQuery?.data,
    ProfilesQuery?.data,
  ]);

  const info = [
    { id: 1, name: "Personal Information" , icon: Personalcard },
    { id: 2, name: "Business Information", icon: Building },
    { id: 3, name: "BVN Of Manager", icon: CardTick1 },
    { id: 4, name: "Upload Document", icon:DocumentCloud },
  ];
  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  async function submitKyc(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = {
        first_name: formValue?.firstName,
        last_name: formValue?.lastName,
        nin: formValue?.nin,
        house_address: formValue?.address,
        phone: formValue?.phone,
        email: formValue?.email,
      };

      const response = await api.editKyc({ data: encryptaValue(payload) });
      const decr = JSON.parse(decryptaValue(response?.data));
      //console.log("decrypt form login", decr);
      enqueueSnackbar(decr?.message, { variant: "success" });
      ProfileQuery.refetch();
      setIsLoading(false);
    } catch (error) {
      //console.log("error", error);
      enqueueSnackbar(error.message, { variant: "error" });
      // enqueueSnackbar("errooor", { variant: "error" });
      setIsLoading(false);
    }
  }
  async function submitKyb(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = {
        name: formValue?.busName,
        website: formValue?.busWebsite,
        description: formValue?.busDescription,
        email: formValue?.busEmail,
        support_email: formValue?.busSupportEmail,
        chargeback_email: formValue?.chargeBackEmail,
        city: formValue?.busCity,
        rc_number: formValue?.rcNumber,
        incorporation_date: formValue?.incopDate,
        address: formValue?.busAddress,
      };

      const response = await api.editBusInfo({ data: encryptaValue(payload) });
      const decr = JSON.parse(decryptaValue(response?.data));
      //console.log("decrypt for bus info", decr);
      enqueueSnackbar(decr?.message, { variant: "success" });
      BussQuery.refetch();
      setIsLoading(false);
    } catch (error) {
      //console.log("error", error);
      enqueueSnackbar(error.message, { variant: "error" });
      // enqueueSnackbar("errooor", { variant: "error" });
      setIsLoading(false);
    }
  }

  async function submitBvn(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = {
        bvn: formValue?.bvn,
      };

      //const response = await api.editBvn({ data: encryptaValue(payload) });
      const response = await api.editBvn({ bvn: formValue?.bvn });
      const decr = JSON.parse(decryptaValue(response?.data));
      //console.log("decrypt for bus info", decr);
      enqueueSnackbar(decr?.message, { variant: "success" });
      BvnQuery.refetch();
      setIsLoading(false);
    } catch (error) {
      //console.log("error", error);
      enqueueSnackbar(error.message, { variant: "error" });
      // enqueueSnackbar("errooor", { variant: "error" });
      setIsLoading(false);
    }
  }
  async function handleSubmit() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("certificate_of_incorporation", incopFile);
    formData.append("director_id_1", directorId1File);
    formData.append("cac_form", cacForm);
    formData.append("director_id_2", directorId2File);

    try {
      const response = await api.uploadDoc(formData);
      const decr = JSON.parse(decryptaValue(response?.data));
      //console.log("decrypt for bus info", decr);
      enqueueSnackbar(decr?.message, { variant: "success" });

      setIsLoading(false);
    } catch (error) {
      //console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  return (
    <div className="p-[10px] md:px-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        <div className=" bgImage bg-cover bg-no-repeat">
          <img
            src="./assets/fblob.png"
            alt="blob"
            className="absolute hidden md:block top-0 right-0 h-[220px] "
          />
          <p className="text-[#000] text-[14px] md:text-[16px]  xl:text-[18px] italic font-semibold leading-[24px]  mt-6 ">
            Hello {formValue.busName}
          </p>
          <p className="text-[#000] text-[14px] md:text-[16px] z-20 xl:text-[18px] font-medium leading-[24px]  mt-2 ">
            Welcome to Vant's Verification
          </p>

          <p className="text-[#667185] text-[14px] md:text-[14px]  font-normal leading-[24px] mt-5 w-full md:w-[70%] xl:w-[60%] ">
            To ensure a secure and compliant environment for all our partners,
            we kindly request you to complete the KYB (Know Your Business)
            verification process. This helps us verify your business identity,
            protect sensitive data, and ensure regulatory compliance.{" "}
          </p>
          <p className="text-[#667185] text-[14px] md:text-[14px] font-normal leading-[24px] mt-3  ">
            By completing this process, you’ll enjoy uninterrupted access to our
            services and build trust within our platform.
          </p>
        </div>
      </div>

      <div className="flex md:hidden items-center space-x-2 mt-4 overflow-auto">  {info &&
            info?.map((inf, index) => (
              <button
                onClick={() => setSelectedInfo(inf?.id)}
                className={`flex-between mb-2 gap-2  ${
                  selectedInfo === inf?.id
                    ? "  bg-[#26ae5f] text-white"
                    : "bg-[#fefefe]"
                } ${
                  index === 0 ? "" : ""
                } hover:translate-y-1  transition-transform ease-in-out   w-[90%] border-[0.2px] border-[#98a2b3] relative rounded-[8px]  p-[6px] md:px-[10px] md:py-4`}
              >
                {filledSection.every((id) =>
                  info.some((item) => item.id === id)
                ) && filledSection.some((item) => item === inf?.id) ? (
                  <TickCircle
                    size="18"
                    className="hidden md:block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                    }`}
                  />
                ) : (
                  <MainComponent
                    size="18"
                    className="hidden md:block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#D11414FF"
                    }`}
                  />
                )}
                <div className="flex items-center gap-2">
                {/* <inf.icon
                    size="20"
                     className="md:hidden block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                    }`}
                  /> */}
                  {filledSection.every((id) =>
                  info.some((item) => item.id === id)
                ) && filledSection.some((item) => item === inf?.id) ? (
                  <TickCircle
                  size="14"
                  className="block"
                  color={` ${
                    selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                  }`}
                />
                ) : (
                  <Danger
                  size="14"
                  className="block"
                  color={` ${
                    selectedInfo === inf?.id ? "  #fefefe" : "#D11414FF"
                  }`}
                />
                  // <MainComponent
                  //   size="18"
                  //   className="hidden md:block"
                  //   color={` ${
                  //     selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                  //   }`}
                  // />
                )}
                  <p className="block  text-[14px]  font-normal leading-[16px] whitespace-nowrap ">
                    {inf?.name}
                  </p>
                
                </div>

                
              </button>
            ))}</div>

      <div className="flex mt-4 md:mt-6 gap-[16px] md:gap-[24px]">
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
          className="w-[25%] md:w-[30%] hidden md:block"
        >
          {info &&
            info?.map((inf, index) => (
              <button
                onClick={() => setSelectedInfo(inf?.id)}
                className={`flex-between  ${
                  selectedInfo === inf?.id
                    ? "translate-x-2  bg-[#26ae5f] text-white"
                    : "bg-[#fefefe]"
                } ${
                  index === 0 ? "" : "mt-4"
                } hover:translate-x-2  transition-transform ease-in-out   w-[90%] border-[0.2px] border-[#98a2b3] relative rounded-[8px]  p-[14px] md:px-[20px] md:py-4`}
              >
                {filledSection.every((id) =>
                  info.some((item) => item.id === id)
                ) && filledSection.some((item) => item === inf?.id) ? (
                  <TickCircle
                    size="18"
                    className="hidden md:block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                    }`}
                  />
                ) : (
                  <MainComponent
                    size="18"
                    className="hidden md:block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                    }`}
                  />
                )}
                <div>
                  <p className="hidden md:block  text-[14px]  font-normal leading-[16px]  ">
                    {inf?.name}
                  </p>
                  <inf.icon
                    size="20"
                     className="md:hidden block"
                    color={` ${
                      selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                    }`}
                  />
                </div>

                <ArrowRight2
                  size="18"
                  color={` ${
                    selectedInfo === inf?.id ? "  #fefefe" : "#26ae5f"
                  }`}
                />
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
              <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal flex items-center leading-[24px] text-[#000000] ">
              First Name <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    disabled={personalDisabled}
                    name="firstName"
                    value={formValue.firstName}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Last Name <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="lastName"
                    disabled={personalDisabled}
                    value={formValue.lastName}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Email <span className="text-red-500 text-lg">*</span>
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
                    name="email"
                    disabled={personalDisabled}
                    value={formValue.email}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Phone Number <span className="text-red-500 text-lg">*</span>
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
                    disabled={personalDisabled}
                    value={formValue.phone}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  House Address <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <textarea
                    type="text"
                    placeholder="14, xxxx street"
                    className="w-full  h-[120px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="address"
                    disabled={personalDisabled}
                    value={formValue.address}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  NIN <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="2933 23XX XXX "
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="nin"
                    disabled={personalDisabled}
                    value={formValue.nin}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="py-[20px] border-t border-b-[#E4E7EC]  ">
                <div className="flex-item gap-2 w-full">
                  {profileData &&
                  profileData?.personal_info_status === "completed" ? (
                    <div className="flex gap-1 items-center w-[85%] mx-auto">
                      <div className="h-[1.5px] bg-green-400 flex-1 w-full"></div>{" "}
                      <p className="text-green-600 text-[14px]">
                        Personal Information Completed
                      </p>{" "}
                      <div className="h-[1.5px] w-full bg-green-400 flex-1"></div>
                    </div>
                  ) : (
                    <div className="flex-item justify-end">
                      {" "}
                      <button
                        onClick={submitKyc}
                        className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                      >
                        {isLoading ? (
                          <ClipLoader color={"white"} size={20} />
                        ) : (
                          <> Submit</>
                        )}
                      </button>
                    </div>
                  )}
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
                  Business Name <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="Enter business name"
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="busName"
                    disabled={busDisabled}
                    value={formValue.busName}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    // required
                    name="busWebsite"
                    disabled={busDisabled}
                    value={formValue.busWebsite}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Business Description <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="electronics supplier"
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="busDescription"
                    disabled={busDisabled}
                    value={formValue.busDescription}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal flex items-center leading-[24px] text-[#000000] ">
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
                    // required
                    name="busSupportEmail"
                    disabled={busDisabled}
                    value={formValue.busSupportEmail}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    // required
                    name="chargeBackEmail"
                    disabled={busDisabled}
                    value={formValue.chargeBackEmail}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    // required
                    name="rcNumber"
                    disabled={busDisabled}
                    value={formValue.rcNumber}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    // required
                    name="incopDate"
                    disabled={busDisabled}
                    value={formValue.incopDate}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Business City <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="busCity"
                    disabled={busDisabled}
                    value={formValue.busCity}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  Business Address <span className="text-red-500 text-lg">*</span>
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="busAddress"
                    disabled={busDisabled}
                    value={formValue.busAddress}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="py-[20px] border-t border-b-[#E4E7EC]  ">
                <div className="flex-item gap-2 w-full">
                  {busData && busData?.business_info_status === "completed" ? (
                    <div className="flex gap-1 items-center w-[85%] mx-auto">
                      <div className="h-[1.5px] bg-green-400 flex-1 w-full"></div>{" "}
                      <p className="text-green-600 text-[14px]">
                        Business Information Completed
                      </p>{" "}
                      <div className="h-[1.5px] w-full bg-green-400 flex-1"></div>
                    </div>
                  ) : (
                    <div className="flex-item justify-end">
                      {" "}
                      <button
                        onClick={submitKyb}
                        className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                      >
                        {isLoading ? (
                          <ClipLoader color={"white"} size={20} />
                        ) : (
                          <> Submit</>
                        )}
                      </button>
                    </div>
                  )}
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
                BVN Information <span className="text-red-500 text-lg">*</span>
              </p>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  B.V.N
                </label>
                <div className=" relative    flex items-center">
                  <input
                    type="text"
                    placeholder="1234 XXXX XXX"
                    className="w-full  h-[48px] pl-[10px] md:pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    required
                    name="bvn"
                    disabled={bvnDisabled}
                    value={formValue.bvn}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="py-[20px] border-t border-b-[#E4E7EC]  ">
                <div className="flex-item gap-2 w-full">
                  {bvnData && bvnData?.bvn_status === "completed" ? (
                    <div className="flex gap-1 items-center w-[85%] mx-auto">
                      <div className="h-[1.5px] bg-green-400 flex-1 w-full"></div>{" "}
                      <p className="text-green-600 text-[14px]">
                        BVN Information Completed
                      </p>{" "}
                      <div className="h-[1.5px] w-full bg-green-400 flex-1"></div>
                    </div>
                  ) : (
                    <div className="flex-item justify-end">
                      {" "}
                      <button
                        onClick={submitBvn}
                        className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                      >
                        {isLoading ? (
                          <ClipLoader color={"white"} size={20} />
                        ) : (
                          <> Submit</>
                        )}
                      </button>
                    </div>
                  )}
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
                  CERTIFICATE OF INCORPORATION{" "}
                  {/* <sup className="text-red-400">*</sup> */}
                </label>
                <div className=" ">
                  <input
                    className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                    accept=".jpg,.pdf"
                    disabled={uploadDisabled}
                    onChange={(e) => setIncopFile(e.target.files[0])}
                  />
                  <p className="text-[10px] text-gray-400">
                    *Maximum file size is 2MB
                  </p>
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  VALID ID OF A DIRECTOR
                  {/* <sup className="text-red-400">*</sup> */}
                </label>
                <div className="">
                  <input
                    className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                    accept=".jpg,.pdf"
                    disabled={uploadDisabled}
                    onChange={(e) => setDirectorId1File(e.target.files[0])}
                  />
                  <p className="text-[10px] text-gray-400">
                    *Maximum file size is 2MB
                  </p>
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  CAC Form BN/1 or CAC Form 1.1 (C07 for older companies)
                  {/* <sup className="text-red-400">*</sup> */}
                </label>
                <div className="">
                  <input
                    className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                    accept=".jpg,.pdf"
                    disabled={uploadDisabled}
                    onChange={(e) => setCacForm(e.target.files[0])}
                  />
                  <p className="text-[10px] text-gray-400">
                    *Maximum file size is 2MB
                  </p>
                </div>
              </div>
              <div className="mb-[16px] md:mb-[20px]">
                <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
                  VALID ID OF ANOTHER DIRECTOR
                  {/* <sup className="text-red-400">*</sup> */}
                </label>
                <div className="">
                  <input
                    className="flex  h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#F05800] focus:border-[#F05800]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                    accept=".jpg,.pdf"
                    disabled={uploadDisabled}
                    onChange={(e) => setDirectorId2File(e.target.files[0])}
                  />
                  <p className="text-[10px] text-gray-400">
                    *Maximum file size is 2MB
                  </p>
                </div>
              </div>

              <div className="py-[20px] border-t border-b-[#E4E7EC]  ">
                <div className="flex-item gap-2 w-full">
                  {profilesData &&
                  profilesData?.default_partner?.documents_status ===
                    "completed" ? (
                    <div className="flex gap-1 items-center w-[85%] mx-auto">
                      <div className="h-[1.5px] bg-green-400 flex-1 w-full"></div>{" "}
                      <p className="text-green-600 text-[14px]">
                        Business Document Uploaded{" "}
                      </p>{" "}
                      <div className="h-[1.5px] w-full bg-green-400 flex-1"></div>
                    </div>
                  ) : (
                    <div className="flex-item justify-end">
                      {" "}
                      <button
                        onClick={handleSubmit}
                        className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                      >
                        {isLoading ? (
                          <ClipLoader color={"white"} size={20} />
                        ) : (
                          <> Submit</>
                        )}
                      </button>
                    </div>
                  )}
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
