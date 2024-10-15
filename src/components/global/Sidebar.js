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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
              class=" h-[40px] w-[70px]   mb-[20px] mt-4"
              src="./assets/vantLogo.png"
              alt="logo"
            />


            <div className="border border-[#98A2B3]/50 my-5 " />

            <Link to="" className="flex-item mb-5 py-1 pl-2 pr-1 rounded-lg bg-slate-200 rounded-tl-lg border-l-[3px] border-[#26ae5f]  ">
              <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                Let's get your business started
              </p>
              <div className="h-[40px] w-[40px]">
                <CircularProgressbar
                  value={10}
                  text={`${10}%`}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    // rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    textSize: "20px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `#26ae5f`,
                    textColor: "#26ae5f",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#26ae5f",
                  })}
                />
              </div>
            </Link>

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
                  ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                  : "text-[#667185] font-normal"
              }`}
            >
              <WalletMoney
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/transaction"
                    ? "Bold"
                    : "Linear"
                }
              />
              Transaction
            </Link>

            <Link
              to="/paymentlink"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]   mb-3 leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/paymentlink"
                  ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                  : "text-[#667185] font-normal"
              }`}
            >
              <Note
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/paymentlink"
                    ? "Bold"
                    : "Linear"
                }
              />
              Payment Link
            </Link>

            <button
              onClick={() => setIsActive("invoice")}
              className={` ${
                isActive === "invoice" ? "" : "mb-3"
              } py-[10px] pl-[16px] flex items-center  justify-between w-full text-[14px]    leading-[20px] md:leading-[24px] 
                ${
                  window.location.pathname === "/invoice" ||
                  window.location.pathname === "/createinvoice"
                    ? "text-[#26ae5f] font-medium rounded-md"
                    : "text-[#667185] font-normal "
                }`}
            >
              <div className="flex items-center">
                {" "}
                <Folder2
                  className="mr-[12px]"
                  variant={
                    window.location.pathname === "/invoice" ||
                    window.location.pathname === "/customers" ||
                    window.location.pathname === "/createinvoice"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Invoice
              </div>

              {isActive === "invoice" ? (
                <ArrowUp2 size="14" variant="Linear" color="#667185" />
              ) : (
                <ArrowDown2 size="14" variant="Linear" color="#667185" />
              )}
            </button>

            {isActive === "invoice" && (
              <ul className="ml-[26px] pl-[12px] py-[14px] mb-3 border-l border-[#98A2B3]/50">
                <Link
                  to="/invoice"
                  className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]    leading-[18px] md:leading-[24px]  mb-[14px] ${
                    window.location.pathname === "/invoice" ||
                    window.location.pathname === "/createinvoice"
                      ? "bg-[#F7F9FC] font-medium "
                      : " font-normal"
                  }`}
                >
                  <li className="">Issue Invoice</li>
                </Link>

                <Link
                  to="/customers"
                  className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  leading-[18px] md:leading-[24px]  mb-[14px] ${
                    window.location.pathname === "/customers"
                      ? "bg-[#F7F9FC] font-medium  "
                      : " font-normal"
                  }`}
                >
                  <li className="">Customers</li>
                </Link>
              </ul>
            )}

            <Link
              to="/users"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]   mb-3 leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/users"
                  ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
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
