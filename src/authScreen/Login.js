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
import FloatingPaths from "../components/Floating";

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

    // const user = localStorage.getItem("authData");
    // if (user) {
    //   navigate("/dashboard");
    // }
  }, []);

  async function login(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await api.signIn({ email: email, password: password });

      setUserData(response);
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  return (
    <div
      className="relative h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/DashBoard.svg')",
      }}
    >
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
        className="bg-[#ffff] md:ml-[220px] lg:ml-[290px] xl:ml-[480px] rounded-[16px] z-10  w-[90%] sm:w-[440px] md:w-[500px]  max-w-[588px] pt-[16px] md:pt-[32px]  pb-[24px] px-[16px] sm:px-[30px] md:px-[40px]"
      >
        {" "}
        <img
          src="/assets/theragistLogo.svg"
          alt="logo"
          className=" h-[40px] md:h-[50px]  mx-auto mb-[36px] md:mb-[50px]"
        />
        {/* <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Hi, Welcome Back!
        </h2> */}
        <p className="text-[16px] md:text-[20pxpx] xl:text-[24px]  font-normal leading-[24px] text-[#1C1C1C] ">
          Sign in
        </p>
        <p className="text-[14px] md:text-[14px] xl:text-[16px]  font-light  text-[#1C1C1C] ">
          Welcome Onboard! let get started
        </p>
        <form onSubmit={login} className="mt-[10px] md:mt-[20px] ">
          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-light  text-[#1C1C1C] mb-[8px]">
              Username
            </label>
            <div className=" relative    flex items-center">
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px]"
              />

              <input
                type="email"
                placeholder="Enter username"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#9C9C9C] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] "
                // required
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
          <div className="mb-[10px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-light leading-[24px] text-[#1C1C1C] mb-[8px]">
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
                placeholder="Enter password"
                className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#9C9C9C] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] "
                // required
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
          <div className="flex gap-1 mb-8 items-center">
            <input type="checkbox" className="" />
            <p className="font-light">Remember me</p>
          </div>

        

          <button
            type="submit"
            className="w-full py-[14px] mt-[18px] text-center text-white bg-[#00B0C7] rounded-[8px] flex items-center justify-center gap-1 mb-[12px] md:mb-[16px]"
          >
            <p className="text-sm font-medium leading-[20px]">Login</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>
        </form>
      </m.div>
    </div>
  );
};

export default Login;
