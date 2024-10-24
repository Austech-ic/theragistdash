import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/emptyList.json";
import { Add } from "iconsax-react";

const EmptyTable = ({ cols }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <tr className="mt-4">
      <td
        className="
      "
        colspan={cols}
      >
        <div className="px-3 md:px-5 bg-[#fefefe] flex items-center justify-between mt-4 rounded-lg">
          <div>
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              No Transactions yet
            </p>
            <p className="text-[14px] text-[#667185] leading-[20px]">
              Receive your first payment by creating a payment link.
            </p>


            <ul className="flex gap-3 items-center mt-7">
                <li><button className="rounded-md px-2 py-2 text-white text-sm flex gap-2 items-center bg-[#26ae5f]"><p>Create Payment Link</p> <Add size={14}/>
                </button></li>
                <li><button className="rounded-md px-2 py-2 text-white text-sm flex gap-2 items-center bg-[#26ae5f]"><p>Make Transfer</p> <Add  size={14}/>
                </button></li>
            </ul>
          </div>
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      </td>
    </tr>
  );
};

export default EmptyTable;
