import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  

    return (
      <div className="bg-[#F2F2F2] min-h-screen">
        <div className="px-[10px] md:px-[16px] xl:px-[20px] pt-[16px] md:pt-[18px] bg-white border-b border-t border-[#98A2B38F]/50 overflow-auto">
          <ul className="flex items-center gap-[20px] md:gap-[32px]">
            {/* <button onClick={() => setState("Employee")}> */}
            <Link to="/wallet/overview">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
  
                  window.location.pathname === "/wallet/overview"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="cursor-pointer">
                  <p className="">OverView</p>
                </div>
              </li>
            </Link>
           
           
  
            <Link to="/wallet/topup">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/wallet/topup"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">Wallet Credits</p>
                </div>
              </li>
            </Link>
            <Link to="/wallet/debit">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/wallet/debit"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">Wallet Debits</p>
                </div>
              </li>
            </Link>
  
            
          </ul>
        </div>
        <div className="px-[10px] md:px-[20px] ">
          <Outlet />
  
        </div>
      </div>
 
  );
};

export default Wallet;
