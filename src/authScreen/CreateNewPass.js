import React, { useState } from "react";
import { Sms, CloseCircle, Eye, EyeSlash } from "iconsax-react";
import { GoLock } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import { enqueueSnackbar } from "notistack";
import { decryptaValue } from "../utils/helperFunctions";

const CreateNewPass = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [otp, setOtp] = useState("");

  function handlePassword(event) {
    let new_pass = event.target.value;
    setPassword(new_pass);

    // regular expressions to validate password
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    if (!new_pass.match(upperCase)) {
      setErrorMessage("Password should contains Uppercase letters!");
      setPassError(true);
    } else if (!new_pass.match(lowerCase)) {
      setErrorMessage("Password should contain lowercase letters!");
      setPassError(true);
    } else if (!new_pass.match(numbers)) {
      setErrorMessage("Password should contains numbers also!");
      setPassError(true);
    } else if (!new_pass.match(specialCharRegExp)) {
      setErrorMessage("Password should contains special character e.g *@#!% !");
      setPassError(true);
    } else if (new_pass.length < 6) {
      setErrorMessage("Password length should be more than 6.");
      setPassError(true);
    } else {
      setErrorMessage("Password is strong!");
      setPassError(true);
    }
    // for confirm password
  }


  const handleConfirmPassword = (event) => {
    let confirm_pass = event.target.value;
    setConfirmPassword(confirm_pass);
    if (confirm_pass !== password) {
      setConfirmPasswordError("Password does not match!");
      setPassError(true);
    } else {
      setConfirmPasswordError("Password match!");
      setPassError(false);
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  const createPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await api.resetPassword({
        email: location.state.email,
        reset_code: otp,
        password: password,
        password_confirmation: confirmPassword,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes.message, { variant: "success" });
      navigate("/passwordchangesuccess");

      setIsLoading(false);
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
          Enter new password{" "}
        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          Create a new password for your account{" "}
        </p>

        <form onSubmit={createPassword} className="mt-[40px] max-w-[340px] md:max-w-[486px]">
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              OTP
            </label>
            <div className=" relative    flex items-center">
              <input
                type="text"
                placeholder="XXXXXX"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="mb-[24px]">
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
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  handlePassword(e);
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>

            {errorMessage && (
              <p
                className={` ${
                  errorMessage === "Password is strong!"
                    ? "text-[green]"
                    : "text-[red]"
                }  pt-1 pl-1 text-left text-xs`}
              >
                {" "}
                {errorMessage}
              </p>
            )}
          </div>
          <div className="mb-[40px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Confirm Password
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
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => {
                  handleConfirmPassword(e);
                }}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            {confirmPasswordError && (
              <p
                className={` ${
                  confirmPasswordError === "Password match!"
                    ? "text-[green]"
                    : "text-[red]"
                }  pt-1 pl-1 text-left text-xs`}
              >
                {" "}
                {confirmPasswordError}
              </p>
            )}
          </div>
          {/* <Link to="/passwordchangesuccess"> */}
          <button
            type="submit"
            className="w-full py-[14px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[40px]"
          >
            <p className="text-sm font-medium leading-[20px]">
              Change Password
            </p>
          </button>
          {/* </Link> */}

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 VANT. All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPass;
