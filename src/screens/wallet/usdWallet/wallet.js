import React, { useState } from 'react'
import Lottie from "react-lottie";
import animationData from "../../../assets/comingSoon.json";
const UsdWallet = () => {
    const [isComingSoon, setIsComingSoon]= useState(true)

    const closeComingSoon = () => {
        setIsComingSoon(false)
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
  return (
    <div className="py-5 bg-[#F2F2F2] min-h-screen ">

        <div className="flex flex-col items-center justify-center h-full">

        <div className="inline-block relative border border-[#D6DDEB] p-[18px] md:p-[24px] xl:p-[32px] overflow-hidden text-left align-bottom transition-all transform bg-[white]   shadow-xl sm:my-8 sm:align-middle w-full min-w-[360px] md:min-w-[450px] md:max-w-[550px] ">
                
        <Lottie options={defaultOptions} height={200} width={200} />



        <p className=" text-[20px] md:text-[24] text-center  text-[#616060] leading-[24px] font-semibold ">
              Coming Soon!!
            </p>
            </div>
        </div>
</div>
  )
}

export default UsdWallet
