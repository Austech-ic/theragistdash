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
import { decryptaValue, decryptValue, encryptaValue } from "../utils/helperFunctions";

const Login = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    clearUserData()

    const enc = encryptaValue(
      "hello word"
            )
    const dec = decryptaValue(
"U2FsdGVkX18PTWbmgDsWKoS1GYjv+VUN1uUw8bcF0oUFZZ4lpar+HmzmLrClgUKkYoLmbRO2DAv+vKya++umGhRjeJPVTEWgb3X0+yT4ClCsKbtcVObQLyPgqiIXiL4g0H/4OO2IyZlK4mMkxEM45wKEKbU3f104ErxrXhnTsA+vXsaEQSZgEX9pfk6w2fsjIxR1eXN+cssSSY6iBF0PWyRm/fKJJbUXOmfSI++EMID5bnjCZHMZiTBWLHQAbAvJ9r8WKopoEUr1fXmIZK1p8313wmNfgtorMXqh/8qZUjvVRINCgqEUZ9EzwF5CClc3DnPXKqx6t2QSy9Vm8vZcR0xH3qZx2hxb0PA0mAkQsn1qtTywkfA2EQhbYa2aDpdtSgL9rptX7O9dR+DWf0kMl8t4u7vMcbpFApYCTZAcfHfqdlztiYtLxxLjzZe8jAibqnYLoeQrr+Uv+tuWWeDGfcG0JRb86uSb1q1tS5an1zQ+u1NS2YMo7MhiaLsk2vM5+nHS/Ys1p/WJ68v+HZTvI20vrf6GYCSJIRki79/YFI1vSJ6o4mEiMZp61ifyvM3gug1UpuJmnn5wg7FXneVtCuTK9GxA0A99n/LMQjdrPJh/oiuZpHMyyTB2FQaUDg2sN5LVEEawT5XjSp3eHAtw+o1GcxIL0wGZnoYckI0Pq5YL+gs8SxFPsvdGztZNBwN7m/eskkyG1us5uEb5DiERuGW3k9Wvsgsh23Z3WiJqj1WZ7+o47tbQqQhLhly9qCOqw1kPd/2c62Kjj3KTqlwmuy1nadKRNB6p9FTakV3N2O0LOYGL4xwngCLnOBcwdLxgxKDgko95we9cU5kaXXKM+VjXN0fCVRlZTjb2WVgtJFKV7HzwyZJPDV1hyZyuOpIpJXYcmw8hA4QhUI9mIoGbK6hRTOOMvcNR9yey0cxh1noyXWlQjSqTOENWW54f1+OPKXz1WHU6hWx7VBulvF/VDnwToi+nOjwTEskDDvlpDILEa5gYwleKUi2FumMZNwNOeY6yZcexImLIzSv7uMnXtaiRo3JwikstfTsmnSKpQAlt8g6bAzH6w1SO3Nz3w1i1UGx6NoY6jf2SO7UeZ9gN9dUBA82m+owjPylSM/n8RCfGR2PJUgR+O2hw9xejYnmPLcSMz/3iGv6DLLMSHkPdSQ=="   
      )  //const dec =  decryptValue("ZU4rSCt5R3ptWTd1TlZFNDVkYnhDaWNPb2RudllTU3lIelJnbGNYSng5N0JCRGE1WDhpOW1uTmR6TFVqZVJMag==")
    //const dec =  decryptValue("XClPkOy0XN7s07bdFbrx9yV1YXEbbuRHPayMfZvDYQsy9Isoj0HiMJQmRx 75HEWVdLVTMxtHsPpJE7nYTv3hQ: =")
    console.log("dec===>>>>", dec);
    console.log("encc===>>>>", enc);
  });

  async function login(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = { email: email, password : password }

    
      const response = await api.signIn({data : encryptaValue(payload)});


      setUserData(response?.data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log("error", error);
     // enqueueSnackbar(error.msg, { variant: "error" });
      enqueueSnackbar("errooor", { variant: "error" });
      setIsLoading(false);
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
        className="bg-[#ffff] rounded-[16px] w-[90%]  max-w-[628px] pt-[16px] md:pt-[32px]  pb-[24px] px-[16px] sm:px-[30px] md:px-[60px] xl:px-[80px]"
      >
        {" "}
        <img
          src="/assets/VantLogo.png"
          alt="logo"
          className=" h-[40px] md:h-[50px] xl:h-[60px] mx-auto mb-[20px] md:mb-[40px] xl:md-[50px]"
        />
        {/* <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Hi, Welcome Back!
        </h2> */}
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          Sign in to your account to continue
        </p>
        <form
          onSubmit={login}
          className="mt-[20px] md:mt-[30px]  max-w-[340px] md:max-w-[486px]"
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
                className="w-[100%] sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
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
                className="w-[100%]  sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
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

          <Link to="forgotpassword">
            {" "}
            <button
              type="button"
              className="text-[14px] text-[#26ae5f] font-medium leading-[20px] tracking-[0.2px] mb-[39px]"
            >
              Forgot password?
            </button>
          </Link>

          <button
            type="submit"
            className="w-full py-[14px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[32px]"
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
