import React, { useState } from "react";
import { Sms, CloseCircle, Eye, EyeSlash } from "iconsax-react";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { GiPhone } from "react-icons/gi";
import { motion as m } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import { setUserData } from "../utils/utils";

const SignUp = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false)
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    rcNumber: "",
    email: "",
    phone: "",
    incopDate: "",
  });
  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const deleteInput = (name) => {
    setFormValue({ ...formValue, [name]: "" });

  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

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
      setPassError(true)

    } else if (!new_pass.match(lowerCase)) {
      setErrorMessage("Password should contain lowercase letters!");
      setPassError(true)


    } else if (!new_pass.match(numbers)) {
      setErrorMessage("Password should contains numbers also!");
      setPassError(true)

    } else if (!new_pass.match(specialCharRegExp)) {
      setErrorMessage("Password should contains special character e.g *@#!% !");
      setPassError(true)

    } else if (new_pass.length < 6) {
      setErrorMessage("Password length should be more than 6.");
      setPassError(true)

    } else {
      setErrorMessage("Password is strong!");
      setPassError(true)

    }
    // for confirm password
  }
  const handleConfirmPassword = (event) => {
    let confirm_pass = event.target.value;
    setConfirmPassword(confirm_pass);
    if (confirm_pass !== password) {
      setConfirmPasswordError("Password does not match!")
      setPassError(true)
    } else {
      setConfirmPasswordError("Password match!");
      setPassError(false)

    }
  };
  async function signup(e) {
    e.preventDefault();
    if (passError) {
      enqueueSnackbar("Please check your password", { variant: "error" });
      return
    }
   

    setIsLoading(true);
    try {
      const response = await api.signUp({
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        name: formValue.businessName,
        phone: formValue.phone,
        email: formValue.email,
        incorporation_date: formValue.incopDate,
        password,
        password_confirmation: confirmPassword,
        rc_number: formValue.rcNumber,
      });
      enqueueSnackbar(response?.message, { variant: "success" });
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
    <div className="bg-[#F2F2F2] h-full w-full flex py-[54px] justify-center items-center ">
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
        className="bg-[#ffff] rounded-[16px] max-w-[628px] pt-[24px] md:pt-[32px]  pb-[24px] px-[20px] sm:px-[30px] md:px-[60px] xl:px-[80px]"
      >
        <img
          src="./assets/VantLogo.png"
          alt="logo"
          className=" h-[40px] md:h-[60px] mx-auto mb-[18px] md:mb-[25px] xl:md-[40px]"
        />
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Create an account{" "}
        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          Fill the form below to create an account{" "}
        </p>

        <form onSubmit={signup} className="mt-[40px] max-w-[340px] md:max-w-[486px]">
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              First Name
            </label>
            <div className=" relative    flex items-center">
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
onClick={()=> deleteInput("firstName")}
              />

              <input
                type="text"
                placeholder="Enter first name"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
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
              Last Name
            </label>
            <div className=" relative    flex items-center">
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
onClick={()=> deleteInput("lastName")}
              />

              <input
                type="text"
                placeholder="Enter last name"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="lastName"
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
              Business Name
            </label>
            <div className=" relative    flex items-center">
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
                onClick={()=> deleteInput("businessName")}
              />

              <input
                type="text"
                placeholder="Enter businness name"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="businessName"
                value={formValue.businessName}
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
              Email
            </label>
            <div className=" relative    flex items-center">
              <Sms size="16" color="#98A2B3" className="absolute left-[16px]" />
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
                onClick={()=> deleteInput("email")}
              />

              <input
                type="email"
                placeholder="Enter email address"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="email"
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
              Phone Number
            </label>
            <div className=" relative    flex items-center">
              <GiPhone
                size="16"
                color="#98A2B3"
                className="absolute left-[16px] "
              />
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
                onClick={()=> deleteInput("phone")}
              />

              <input
                type="text"
                placeholder="8083XXXXXXX"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[44px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                required
                autoComplete="on"
                name="phone"
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

          <div className="mb-[24px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              RC Number
            </label>
            <div className=" relative    flex items-center">
              <CloseCircle
                size="16"
                color="#98A2B3"
                className="absolute right-[16px] cursor-pointer"
                onClick={()=> deleteInput("rcNumber")}
              />

              <input
                type="text"
                placeholder="000000"
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                autoComplete
                name="rcNumber"
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
          <div className="mb-[24px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#000000] mb-[8px]">
              Incorporation Date
            </label>
            <div className=" relative    flex items-center">
              <input
                type="date"
                placeholder=""
                className="w-full sm:w-[400px] md:w-[486px] h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                autoComplete
                name="incopDate"
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
                autoComplete="on"
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

          <p className="text-center mb-4 text-[12px] font-normal leading-[16px] text-[#98a2b3]">
            By clicking 'Register', I agree to Vant's Terms of Acceptable Use
            Privacy Policy and Merchant Service Agreement.{" "}
          </p>

          <button
            type="submit"
            className="w-full py-[14px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[32px]"
          >
            <p className="text-sm font-medium leading-[20px]">Register</p>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>

          <div className="text-[14px] leading-[20px] flex justify-center items-center mb-[30px] md:mb-[40px]">
            <p>Already have an account? </p>
            <Link to="/login">
              {" "}
              <button className="font-medium text-[#26ae5f] ml-1">
                Sign in
              </button>
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

export default SignUp;
