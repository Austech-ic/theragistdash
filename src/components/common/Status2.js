import React from "react";

const Status2 = ({ status }) => {
  return (
    <>
      {status === "successful" ? (
        <div className="flex gap-1 bg-[#91C561] bg-opacity-15 px-[12px] py-[4px] text-[#008D36] items-center rounded-xl">
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L4.75 9L1 5.36364"
              stroke="#008D36"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>{status}</p>
        </div>
      ) : status === "pending" ? (
        <div className="flex gap-1 bg-[#F7A30A] bg-opacity-15 px-[12px] py-[4px] text-[#F7A30A] items-center rounded-xl">
          <img src="/orangeLoad.svg" className="h-[10px] w-[10px]" />
          <p>{status}</p>
        </div>
      ) : status === "declined" ? (
        <div className="flex gap-1 bg-[#FF0000] bg-opacity-15 px-[12px] py-[4px] text-[#FF0000] items-center rounded-xl">
          <img src="/redDot.svg" className="h-[10px] w-[10px]" />
          <p>{status}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Status2;
