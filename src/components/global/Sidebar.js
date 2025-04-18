import React, { useEffect } from "react";
import { useState } from "react";
// import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import {
  ArrowDown2,
  ArrowUp2,
  Folder2,
  Home,
  Profile,
  Note,
  WalletMoney,
  Wallet1,
  EmptyWalletChange,
  Verify,
  ClipboardExport,
  Setting,
  Setting2,
  Setting3,
  ShoppingCart,
  Card,
  CommandSquare,
  Book,
  Bookmark2,
  ChartSuccess,
  Personalcard,
  Element4,
  Profile2User,
  MessageFavorite,
  Courthouse,
  User,
  Microphone,
  DocumentText,
  People,
  Notification,
  Box,
} from "iconsax-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Compass, Computer, Settings } from "lucide-react";

const Sidebar = ({ isSidebarOpen, onClose, profileData }) => {
  const router = useLocation();
  const [isSettingActive, setIsSettingActive] = useState(false);

  const Menu1 = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: Element4,
    },
    {
      name: "Use Management",
      path: "users",
      icon: Profile2User,
    },
    // {
    //   name: "Messages",
    //   path: "messages",
    //   icon: MessageFavorite,
    // },
    {
      name: "Transactions",
      path: "transactions",
      icon: Card,
    },
    {
      name: "Products",
      path: "product-management",
      icon: Box,
    },
    {
      name: "User",
      path: "users",
      icon: User,
    },
  ];
  const Menu2 = [
    // {
    //   name: "Space Management",
    //   path: "space-management",
    //   icon: Microphone,
    // },
    // {
    //   name: "User Assessment",
    //   path: "user-assessment",
    //   icon: DocumentText,
    // },
    // {
    //   name: "Group Management",
    //   path: "group-management",
    //   icon: People,
    // },
  ];
  const Menu3 = [
    {
      name: "Send Notification",
      path: "send-notification",
      icon: Notification,
    },
    {
      name: "System Update",
      path: "system-update",
      icon: Computer,
    },
  ];

  return (
    <div
      className={` lg:block lg:relative ${
        isSidebarOpen
          ? "block z-[999999999] fixed inset-0 transition-opacity"
          : "hidden"
      }`}
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#29292980]  transition-opacity lg:relative"
      ></div>
      <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
        <button
          onClick={onClose}
          type="button"
          className="rounded-md text-gray-700 hover:text-[white] focus:outline-none focus:ring-2 focus:ring-[white]"
        >
          <span className="sr-only">Close panel</span>

          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="max-w-[260px] min-h-screen bg-[#002F7A] w-[220px] md:w-[240px] pr-[6px]  py-[16px] md:py-[24px] sticky top-0 overflow-y-auto ">
        <div className="relative">
          <div className="relative h-screen  flex flex-col justify-between ">
            <div>
              <img
                className=" h-[36px] md:h-[42px] xl:h-[45px] mx-auto    "
                src="/assets/MPRIMO.svg"
                alt="Theragist logo"
              />

              <div className=" mt-[32px] md:mt-[40px] xl:mt-[47px]  overflow-auto h-full no-scrollbar flex-1">
                {Menu1.map((menu, index) => (
                  <Link
                    key={index}
                    to={`/${menu?.path}`}
                    onClick={onClose}
                    className={` py-[10px] pl-[16px] md:py-[16px] md:pl-[20px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                      window.location.pathname === `/${menu?.path}`
                        ? "text-[#ffffff] font-medium rounded-tr-lg rounded-br-lg bg-[#1254bd]"
                        : "text-[#ffffff] font-normal"
                    }`}
                  >
                    <menu.icon
                      className="mr-[16px]"
                      size={20}
                      variant={"Bold"}
                    />
                    {menu?.name}
                  </Link>
                ))}

                <button
                  onClick={() => setIsSettingActive(!isSettingActive)}
                  className={`py-[10px] pl-[16px] md:py-[16px] pr-2 md:pl-[20px] flex justify-between w-full items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                    window.location.pathname === `/feed-management/article` ||
                    window.location.pathname === `/feed-management/post` ||
                    window.location.pathname === `/about-us`
                      ? "text-[#ffffff] font-medium rounded-tr-lg rounded-br-lg bg-[#1254bd]"
                      : "text-[#ffffff] font-normal"
                  }`}
                >
                  <div className="flex items-center ">
                    {" "}
                    <Compass className="mr-[12px]" size={20} />
                    Vendor Management
                  </div>

                  {isSettingActive ? (
                    <ArrowUp2 size="14" variant="Linear" color="#fff" />
                  ) : (
                    <ArrowDown2 size="14" variant="Linear" color="#fff" />
                  )}
                </button>

                {isSettingActive && (
                  <ul className="ml-[26px] pl-[12px] py-[8px] mb-1">
                    <Link
                      to="/"
                      className={` py-[6px] pl-[12px] flex items-center text-[12px] md:text-sm   rounded-md  hover:bg-[#F7F9FC] hover:text-[#667185]  ${
                        window.location.pathname === "/feed-management/post"
                          ? "bg-[#F7F9FC] text-[#2e2e2e] font-medium "
                          : " font-normal text-[#fff] "
                      }`}
                    >
                      <li className="">Vendor Products</li>
                    </Link>
                    <Link
                      to="/"
                      className={` py-[6px] pl-[12px] flex items-center text-[12px] md:text-sm   rounded-md  hover:bg-[#F7F9FC] hover:text-[#667185]  ${
                        window.location.pathname === "/feed-management/article"
                          ? "bg-[#F7F9FC] text-[#2e2e2e] font-medium "
                          : " font-normal text-[#fff]"
                      }`}
                    >
                      <li className="">Vendor Users </li>
                    </Link>
                  </ul>
                )}

                {/* {Menu2.map((menu, index) => (
                  <Link
                    key={index}
                    to={`/${menu?.path}`}
                    onClick={onClose}
                    className={` py-[10px] pl-[16px] md:py-[16px] md:pl-[20px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                      window.location.pathname === `/${menu?.path}`
                        ? "text-[#ffffff] font-medium rounded-tr-lg rounded-br-lg bg-[#1254bd]"
                        : "text-[#ffffff] font-normal"
                    }`}
                  >
                    <menu.icon
                      className="mr-[16px]"
                      size={20}
                      variant={"Bold"}
                    />
                    {menu?.name}
                  </Link>
                ))} */}

                {/* <button
                  onClick={() => setIsSettingActive(!isSettingActive)}
                  className={`py-[10px] pl-[16px] md:py-[16px] pr-2 md:pl-[20px] flex justify-between w-full items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                    window.location.pathname === `/privacy-policy` ||
                    window.location.pathname === `/community-guidline` ||
                    window.location.pathname === `/about-us`
                      ? "text-[#ffffff] font-medium rounded-tr-lg rounded-br-lg bg-[#1254bd]"
                      : "text-[#ffffff] font-normal"
                  }`}
                >
                  <div className="flex items-center ">
                    {" "}
                    <Settings className="mr-[12px]" size={20} />
                    Settings
                  </div>

                  {isSettingActive ? (
                    <ArrowUp2 size="14" variant="Linear" color="#fff" />
                  ) : (
                    <ArrowDown2 size="14" variant="Linear" color="#fff" />
                  )}
                </button>

                {isSettingActive && (
                  <ul className="ml-[26px] pl-[12px] py-[8px] mb-1">
                    <Link
                      to="/about-us"
                      className={` py-[6px] pl-[12px] flex items-center text-[12px] md:text-sm   rounded-md  hover:bg-[#F7F9FC] hover:text-[#667185]  ${
                        window.location.pathname === "/about-us"
                          ? "bg-[#F7F9FC] text-[#2e2e2e] font-medium "
                          : " font-normal text-[#fff] "
                      }`}
                    >
                      <li className="">About Us</li>
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className={` py-[6px] pl-[12px] flex items-center text-[12px] md:text-sm   rounded-md  hover:bg-[#F7F9FC] hover:text-[#667185]  ${
                        window.location.pathname === "/privacy-policy"
                          ? "bg-[#F7F9FC] text-[#2e2e2e] font-medium "
                          : " font-normal text-[#fff]"
                      }`}
                    >
                      <li className="">Privacy Policy </li>
                    </Link>
                    <Link
                      to="/community-guidline"
                      className={` py-[6px] pl-[12px] flex items-center text-[12px] md:text-sm  rounded-md  hover:bg-[#F7F9FC] hover:text-[#667185]  ${
                        window.location.pathname === "/community-guidline"
                          ? "bg-[#F7F9FC] text-[#2e2e2e] font-medium "
                          : " font-normal text-[#fff]"
                      }`}
                    >
                      <li className="">Community Guidline </li>
                    </Link>
                  </ul>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
