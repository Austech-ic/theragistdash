import React from "react";
import { Link } from "react-router-dom";

const CheckMail = () => {
  return (
    <div className="bg-[#F2F2F2] h-screen w-full flex justify-center items-center ">
      <div className="bg-[#ffff] rounded-[16px] max-w-[628px] pt-[24px] md:pt-[32px]  pb-[24px] px-[40px] md:px-[60px] xl:px-[80px]">
        <img
          src="./assets/gtLogo.png"
          alt="logo"
          className="w-[132px] h-[60px] mx-auto mb-[30px] md:mb-[40px] xl:md-[50px]"
        />
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
          Check email
        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
          We have sent you a link to reset your password{" "}
        </p>

        <form className="mt-[40px] max-w-[340px] sm:max-w-[400px] md:max-w-[486px]">
          <Link to="/createpass">
            <button
              type="submit"
              className="w-[300px] sm:w-[400px] md:w-[486px] py-[14px] text-center text-white bg-[#DA5000] rounded-[8px] flex items-center justify-center mb-[16px] "
            >
              <p className="text-sm font-medium leading-[20px]">Send</p>
            </button>
          </Link>
          <button
            type="submit"
            className="w-[300px] sm:w-[400px] md:w-[486px] py-[14px] text-center text-white border border-[#F05800] rounded-[8px] flex items-center justify-center mb-[60px] md:mb-[92px]"
          >
            <p className="text-sm text-[#F05800] font-medium leading-[20px]">
              Resend Link
            </p>
          </button>

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 GTEXT. All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckMail;
