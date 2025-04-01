import React from "react";

const Status = ({ status }) => {
  return (
    <>
      {status === "active" ? (
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
          <p>{item?.status}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Status;
