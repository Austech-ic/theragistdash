import React from "react";
import { Link } from "react-router-dom";

const ChangePassSuccess = () => {
  return (
    <div className="bg-[#F2F2F2] h-screen w-full flex justify-center items-center ">
      <div className="bg-[#ffff] rounded-[16px] max-w-[628px] pt-[24px] md:pt-[32px]  pb-[24px] px-[40px] md:px-[60px] xl:px-[80px]">
        <img
          src="./assets/success.png"
          alt="logo"
          className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] mx-auto mb-[30px] md:mb-[40px] xl:mb-[50px]"
        />
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-black mb-[8px]">
        Password Reset Successfully        </h2>
        <p className="text-[14px] md:text-[14px] xl:text-[16px] text-center font-normal leading-[24px] text-[#667185] ">
        You have successfully reset your password        </p>

        <form className="mt-[40px] max-w-[340px] sm:max-w-[400px] md:max-w-[486px]">
          <Link to="/">
            <button
              type="submit"
              className="w-[300px] sm:w-[400px] md:w-[486px] py-[14px] text-center text-white bg-[#DA5000] rounded-[8px] flex items-center justify-center mb-[40px] "
            >
              <p className="text-sm font-medium leading-[20px]">Login</p>
            </button>
          </Link>
          

          <p className="text-center text-[14px] font-medium leading-[20px] text-[#98a2b3]">
            Copyright 2024 GTEXT. All Rights Reserved
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassSuccess;
