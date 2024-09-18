import React, { useEffect } from "react";
import { useState } from "react";
// import { motion as m } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { GiVirtualMarker } from "react-icons/gi";
import {
  Ankr,
  ArrowDown2,
  ArrowUp2,
  Box2,
  Chart,
  Folder2,
  Home,
  Profile,
  Note,
  WalletMoney,
} from "iconsax-react";

const Sidebar = ({ isSidebarOpen, onClose, role }) => {
  const router = useLocation();
  // let userData = localStorage.getItem("userData")
  const [token, setToken] = useState(null);
  const [subUserPermission, setSubUserPermission] = useState(true);

  const [settings, setSettings] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [isActive, setIsActive] = useState("project");
  const [isProject, setIsProject] = useState(false);
  const [isHrm, setIsHrm] = useState(false);
  const [isCrm, setIsCrm] = useState(false);
  const [isInventory, setIsInventory] = useState(false);
  const [isUser, setIsUser] = useState(false);

  return (
    <div
      className={` lg:block lg:relative ${
        isSidebarOpen ? "block z-20 fixed inset-0 transition-opacity" : "hidden"
      }`}
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#29292980]  transition-opacity lg:relative"
      ></div>
      <div class="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
        <button
          onClick={onClose}
          type="button"
          class="rounded-md text-gray-700 hover:text-[white] focus:outline-none focus:ring-2 focus:ring-[white]"
        >
          <span class="sr-only">Close panel</span>

          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="max-w-[260px] min-h-screen bg-[#FFFFFF] w-[260px]  p-[16px] md:p-[20px] sticky top-0 overflow-y-auto ">
        <div className="relative">
          <div className="relative h-screen overflow-y-auto no-scrollbar pb-[80px]">
            <img
              class=" h-[50px] w-[80px]   mb-[20px] mt-5"
              src="./assets/vantLogo.jpg"
              alt="logo"
            />

            <div className="border border-[#98A2B3]/50 my-6 "/>

            <Link
              to="/overview"
              className={` py-[10px] pl-[16px] flex items-center text-[14px] mb-3   leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/overview"
                  ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                  : "text-[#667185] font-normal"
              }`}
            >
              <Home
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/overview" ? "Bold" : "Linear"
                }
              />
              Overview
            </Link>

            <Link
              to="/transaction"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]  mb-3   leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/transaction"
                  ? "text-[#26ae5f] font-medium rounded-md"
                  : "text-[#667185] font-normal"
              }`}
            >
              <WalletMoney
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/transaction" ? "Bold" : "Linear"
                }
              />
              Transaction
            </Link>

            <Link
              to="/paymentlink"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]   mb-3 leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/paymentlink"
                  ? "text-[#26ae5f] font-medium rounded-md"
                  : "text-[#667185] font-normal"
              }`}
            >
              <Note
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/paymentlink" ? "Bold" : "Linear"
                }
              />
              Payment Link
            </Link>

            <Link
              to="/users"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]   mb-3 leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/users"
                  ? "text-[#26ae5f] font-medium rounded-md"
                  : "text-[#667185] font-normal"
              }`}
            >
              <Profile
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/users" ? "Bold" : "Linear"
                }
              />
              Users
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
