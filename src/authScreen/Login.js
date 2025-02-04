import React, { useEffect, useState } from "react";
import { Sms, CloseCircle, Eye, EyeSlash } from "iconsax-react";
import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";
import { clearUserData, setUserData } from "../utils/utils";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { motion as m } from "framer-motion";
import {
  decryptaValue,
  encryptaValue,
  SendOtp,
} from "../utils/helperFunctions";

const Login = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen(!open);
  };
  useEffect(()=> {
    const user = localStorage.getItem("authData");
    if (user) {
      navigate("/overview");
    }
  }, [])

  



  async function login(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = { email: email, password: password };

      const response = await api.signIn({ data: encryptaValue(payload) });

      const decryptRes = JSON.parse(decryptaValue(response?.data));

      setUserData(response?.data);
      enqueueSnackbar(decryptRes.message, { variant: "success" });

      setUserData(response?.data);

      if (decryptRes?.user?.email_verified) {
        setIsLoading(false);
        navigate("/overview");
      } else {
        SendOtp(email);
        setIsLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  const SendOtp = async(email) => {
  
    try {
      const response = await api.resendOtp({
        email: email,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
    
      enqueueSnackbar(decryptRes.message, { variant: "success" });
      navigate("/validate-otp",{state:{email: email} });
  
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  return (
    <div className="bg-[#F2F2F2] h-screen w-full flex justify-center items-center ">
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
        className="bg-[#ffff] rounded-[16px] w-[90%] sm:w-[440px] md:w-[500px]  max-w-[588px] pt-[16px] md:pt-[32px]  pb-[24px] px-[16px] sm:px-[30px] md:px-[50px]"
      >
        {" "}
        <img
          src="/assets/VantLogo.png"
          alt="logo"
          className=" h-[40px] md:h-[50px] xl:h-[60px] mx-auto mb-[20px]"
        />
        {/* <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Hi, Welcome Back!
        </h2> */}
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          Sign in to your account to continue
        </p>
        <form
          onSubmit={login}
          className="mt-[20px] md:mt-[30px] "
        >
          <div className="mb-[24px]">
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
                className="w-full h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
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
          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Password
            </label>
            <div className=" relative    flex items-center">
              <GoLock
                size="16"
                color="#98A2B3"
                className="absolute left-[16px]"
              />
              <div className="absolute right-[16px]">
                {open === false ? (
                  <Eye size="16" color="#98A2B3" onClick={toggle} />
                ) : (
                  <EyeSlash size="16" color="#98A2B3" onClick={toggle} />
                )}
              </div>
              <input
                type={open === false ? "password" : "text"}
                placeholder="Enter your password"
                className="w-full h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <Link to="/forgot-password">
            {" "}
            <button
              type="button"
              className="text-[14px] text-[#26ae5f] font-medium leading-[20px] tracking-[0.2px] mb-[20px]"
            >
              Forgot password?
            </button>
          </Link>

          <button
            type="submit"
            className="w-full py-[14px] mt-[18px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[24px]"
          >
            <p className="text-sm font-medium leading-[20px]">Sign in</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>

          <div className="text-[14px] leading-[20px] flex justify-center items-center mb-[30px] md:mb-[40px]">
            <p>Don’t have an account? </p>
            <Link to="/signup">
              {" "}
              <button className="font-medium text-[#26ae5f]">Sign up</button>
            </Link>
          </div>

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 VANT. All Rights Reserved
          </p>
        </form>
      </m.div>
    </div>
  );
};

export default Login;
