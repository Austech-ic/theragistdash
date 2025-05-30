import React, { useState } from "react";
import { Sms, CloseCircle, ArrowLeft } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import { decryptaValue } from "../utils/helperFunctions";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const sendOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await api.forgotPassword({
        email: email,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes.message, { variant: "success" });
      navigate("/verifyemail",{state:{email: email} });

      setIsLoading(false);
      setEmail("")
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="bg-[#F2F2F2] h-screen w-full flex justify-center items-center ">
      <div className="bg-[#ffff] rounded-[16px] max-w-[628px] pt-[24px] md:pt-[32px]  pb-[24px] px-[40px] md:px-[60px] xl:px-[80px]">
        <img
          src="/assets/VantLogo.png"
          alt="logo"
          className="w-[132px] h-[60px] mx-auto mb-[30px] md:mb-[40px] xl:md-[50px]"
        />
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Forgot Password{" "}
        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          We will send a reset link to your email{" "}
        </p>

        <form onSubmit={sendOtp} className="mt-[40px] max-w-[340px] md:max-w-[486px]">
          <div className="mb-[40px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Email
            </label>
            <div className=" relative    flex items-center">
              <Sms size="16" color="#98A2B3" className="absolute left-[16px]" />
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px]"
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-[300px] sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                 
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-[14px] mt-[39px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[32px]"
          >
            <p className="text-sm font-medium leading-[20px]">Send</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>

          <Link to="/">
            <button
              type="button"
              className="text-[14px] text-[#26ae5f] font-medium leading-[20px] tracking-[0.2px] mb-[40px] mx-auto flex justify-center items-center"
            >
              <ArrowLeft size="18" color="#26ae5f" /> Back to Login
            </button>
          </Link>

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 VANT. All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
