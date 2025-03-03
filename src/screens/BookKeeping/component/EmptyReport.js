import React from "react";

const EmptyReport = () => {
  return (
    <div className="border rounded-xl p-2 shadow bg-gray-50 h-[12opx] mt-6 ">
      <img src="/file.png" className="mx-auto mt-6 h-[70px] " alt="" />
      <p className="text-center text-gray-600 text-lg">No Report found</p>
    </div>
  );
};

export default EmptyReport;
