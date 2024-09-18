import React, { useState } from "react";
import { Sms, CloseCircle, Eye, EyeSlash } from "iconsax-react";
import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";
import { setUserData } from "../utils/utils";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  async function login(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.signIn({ email, password });
      if (response.result === true) {
        enqueueSnackbar("Login Successful!!", { variant: "success" });
      }
      setUserData(response);
      setIsLoading(false);
      navigate("/");
      // navigation.navigate(routes.OTP);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      // toast.error(error.message)
      setIsLoading(false);
    }
  }
  return (
    <div className="bg-[#F2F2F2] h-screen w-full flex justify-center items-center ">
      <div className="bg-[#ffff] rounded-[16px] max-w-[628px] pt-[24px] md:pt-[32px]  pb-[24px] px-[40px] md:px-[60px] xl:px-[80px]">
        <img
          src="./assets/gtLogo.png"
          alt="logo"
          className="w-[132px] h-[60px] mx-auto mb-[30px] md:mb-[40px] xl:md-[50px]"
        />
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Hi, Welcome Back!
        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          Sign in to your account to continue
        </p>

        <form
          onSubmit={login}
          className="mt-[40px] max-w-[340px] md:max-w-[486px]"
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
                className="w-[300px] sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#F05800] focus:border-[#F05800] "
                required
                autoComplete="on"
                autoFocus
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
                className="w-[300px] sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#F05800] focus:border-[#F05800] "
                required
                autoComplete="on"
                autoFocus
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
              className="text-[14px] text-[#F05800] font-medium leading-[20px] tracking-[0.2px] mb-[39px]"
            >
              Forgot password?
            </button>
          </Link>

          <button
            type="submit"
            className="w-full py-[14px] text-center text-white bg-[#DA5000] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[32px]"
          >
            <p className="text-sm font-medium leading-[20px]">Sign in</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>

          <div className="text-[14px] leading-[20px] flex justify-center items-center mb-[30px] md:mb-[40px]">
            <p>Don’t have an account? </p>
            <Link to="/signup">
              {" "}
              <button className="font-medium text-[#F05800]">Sign up</button>
            </Link>
          </div>

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 GTEXT. All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
