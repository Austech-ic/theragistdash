import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../../api";

const Settings = () => {
  const navigate = useNavigate();

  async function getBusProfile(page) {
    const response = await api.getBusProfile({
      
    });
    return response;
  }

  const results = useQuery(
    ["profileBus"],
    () => getBusProfile(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const profileData = results?.data?.data || []
  //console.log("profile Data up====>>>", profileData )

  

    return (
      <div className="bg-[#F2F2F2] min-h-screen">
        <div className="px-[10px] md:px-[16px] xl:px-[20px] pt-[16px] md:pt-[18px] bg-white border-b border-t border-[#98A2B38F]/50 overflow-auto">
          <ul className="flex items-center gap-[20px] md:gap-[32px]">
            {/* <button onClick={() => setState("Employee")}> */}
            <Link to="/setting/personal-info">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
  
                  window.location.pathname === "/setting/personal-info"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="cursor-pointer">
                  <p className="">Personal Information</p>
                </div>
              </li>
            </Link>
           
           
  
            <Link to="/setting/business-info">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/setting/business-info"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">Business Profile</p>
                </div>
              </li>
            </Link>
            <Link to="/setting/api-key">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/setting/api-key"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">API KEY</p>
                </div>
              </li>
            </Link>
            <Link to="/setting/webhook">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/setting/webhook"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">Webhook</p>
                </div>
              </li>
            </Link>
            <Link to="/setting/my-team">
              <li
                className={`py-[18px] cursor-pointer text-[14px] ${
                 
                  window.location.pathname === "/setting/my-team"
                    ? "font-medium text-[#000] border-b-[2.4px]"
                    : "font-normal text-[#667185]"
                }  flex items-center justify-between border-b-[#26ae5f]`}
              >
                <div className="">
                  <p className="">My Team</p>
                </div>
              </li>
            </Link>
  
            
          </ul>
        </div>
        <div className=" ">
          <Outlet context={profileData} />
  
        </div>
      </div>
 
  );
};

export default Settings;
