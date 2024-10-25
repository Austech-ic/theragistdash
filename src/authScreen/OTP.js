import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "otp-input-react";
import { enqueueSnackbar } from "notistack";
import api from "../api";
import { ClipLoader } from "react-spinners";
import { motion as m } from "framer-motion";

const ValidateOtp = () => {
    const navigate = useNavigate();
     const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const userRef = useRef();
  const sessionId = localStorage.getItem("sessionId");

  async function validtaeOtp(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.validateOtp({
        email: location.state.email,
        otp: otp,
      });
      console.log("res of login==>>>>>", response);
      enqueueSnackbar("Email Verified Successfully", { variant: "success" });

      setIsLoading(false);
      //   navigate("/signUp",{state:{email:location.state.email} });
      navigate("/");

      // navigate("/signUp");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  }

  function hideEmail(email) {
    if (typeof email !== "string" || email.length < 6) {
      console.error("Invalid email address");
      return "";
    }

    // Extract the first character
    let hiddenEmail = email.charAt(0);

    // Replace characters from the second to the sixth with asterisks
    for (let i = 1; i < email.length; i++) {
      if (i >= 1 && i <= 5) {
        hiddenEmail += "*";
      } else {
        hiddenEmail += email.charAt(i);
      }
    }

    return hiddenEmail;
  }

  async function disableButton() {
    const button = document.getElementById("resendButton");
    const countdownDisplay = document.getElementById("countdown");

    try {
      const response = await api.resendOtp({
        hash: sessionId,
      });
      console.log("res of login==>>>>>", response);
      enqueueSnackbar(response.message, { variant: "OTP Sent" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
    // Disable the button
    button.disabled = true;

    // Set the countdown duration (in seconds)
    const countdownDuration = 1 * 60; // 5 minutes
    let remainingTime = countdownDuration;

    // Update the countdown display
    function updateCountdown() {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      countdownDisplay.textContent = `Time remaining: ${minutes}:${seconds}`;
    }

    // Update the countdown initially
    updateCountdown();

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
      remainingTime--;

      // Update the countdown display
      updateCountdown();

      // Check if the countdown is complete
      if (remainingTime <= 0) {
        // Enable the button
        button.disabled = false;

        // Clear the countdown interval
        clearInterval(countdownInterval);

        // Reset the countdown display
        countdownDisplay.textContent = "";
      }
    }, 1000);
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
        <h3 className=" text-[20px] md:text-[28px] text-[#1a202c] text-center font-bold pb-1">
          Confirm Your Identity
        </h3>
        <p className="text-[#667185] text-md mb-5 w-[90%] text-center">
          We have sent a verification code to your email
          {/* {hideEmail(location.state.email)} */}
        </p>
        <div className="flex justify-center my-6">
          <OTPInput
            //   className=" h-[44px] bg-[#DBDCDDFF]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            value={otp}
            className="border-[#000] "
            onChange={setOtp}
            autoFocus
            ref={userRef}
            OTPLength={6}
            otpType="number"
            disabled={false}
            secure
            //   style
            inputStyles={{
              padding: "5px",
              // width: "46px",
              // height: "46px",
              backgroundColor: "#DBDCDDFF",
              border: "#000",
              borderRadius: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-[14px] text-center text-white bg-[#26ae5f] rounded-[8px] flex items-center justify-center mb-[20px] md:mb-[32px]"
        >
          <p className="text-sm font-medium leading-[20px]">Confirm</p>
          {isLoading && <ClipLoader color={"white"} size={20} />}
        </button>

        <div className="flex justify-between items-center w-full ">
          <div className="flex">
            <p className="text-[14px] font-semibold text-[#667185]">
              Didnt receive a verification code?
            </p>
            <p className="text-[#26ae5f] text-[14px]" id="countdown"></p>
          </div>{" "}
          <button
            id="resendButton"
            onClick={disableButton}
            className="text-[#26ae5f] font-semibold"
          >
            Resend
          </button>
        </div>
      </m.div>
    </div>
  );
};

export default ValidateOtp;
