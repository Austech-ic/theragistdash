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
} from "iconsax-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Sidebar = ({ isSidebarOpen, onClose, profileData }) => {
  const router = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isExpenseActive, setIsExpenseActive] = useState(false);
  const [isBookKeepingActive, setIsBookKeepingActive] = useState(false);

  let role = profileData?.user?.role;
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
      <div class="max-w-[260px] min-h-screen bg-[#FFFFFF] w-[220px] md:w-[230px]  p-[16px] md:p-[20px] sticky top-0 overflow-y-auto ">
        <div className="relative">
          <div className="relative h-screen overflow-y-auto no-scrollbar flex flex-col justify-between ">
            <div>
              <img
                class=" h-[40px] w-[70px]   "
                src="/assets/VantLogo.png"
                alt="logo"
              />

              <div className="border border-[#98A2B3]/50 my-4 " />

              {profileData?.default_partner?.is_verified !== 1 && (
                <Link
                  to="/getstarted"
                  onClick={onClose}
                  className={`relative py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                    window.location.pathname === "/getstarted"
                      ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                      : "text-[#667185] font-normal"
                  }`}
                >
                  <div className="absolute top-2 right-14">
                    <div className="flex h-[9px] w-[9px] relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-[9px] w-[9px] bg-red-500"></span>
                    </div>
                  </div>
                  <ClipboardExport
                    className="mr-[12px]"
                    size={20}
                    variant={
                      window.location.pathname === "/getstarted"
                        ? "Bold"
                        : "Linear"
                    }
                  />
                  Get Started
                </Link>
              )}

              <Link
                to="/overview"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/overview"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Home
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/overview" ? "Bold" : "Linear"
                  }
                />
                Overview
              </Link>

              <button
                onClick={() => setIsActive(!isActive)}
                className={` ${
                  isActive === "wallet" ? "" : " "
                } py-[10px] pl-[16px] flex items-center  justify-between w-full text-[14px]    leading-[20px] md:leading-[24px] 
                ${
                  window.location.pathname === "/wallet/overview" ||
                  window.location.pathname === "/wallet/topup" ||
                  window.location.pathname === "/usd-wallet" ||
                  window.location.pathname === "/beneficiaries" ||
                  window.location.pathname === "/bulk-payment" ||
                  window.location.pathname === "/wallet/debit"
                    ? "text-[#26ae5f] font-medium rounded-md"
                    : "text-[#667185] font-normal "
                }`}
              >
                <div className="flex items-center relative ">
                  {" "}
                  <WalletMoney
                    className="mr-[12px]"
                    size={20}
                    variant={
                      window.location.pathname === "/wallet/overview" ||
                      window.location.pathname === "/wallet/topup" ||
                      window.location.pathname === "/usd-wallet" ||
                      window.location.pathname === "/beneficiaries" ||
                      window.location.pathname === "/bulk-payment" ||
                      window.location.pathname === "/wallet/debit"
                        ? "Bold"
                        : "Linear"
                    }
                  />
                  Wallet
                  <div className="absolute -right-3 ">
                    <div className="flex h-[8px] w-[8px] relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-orange-400"></span>
                    </div>
                  </div>
                </div>

                {isActive ? (
                  <ArrowUp2 size="12" variant="Linear" color="#667185" />
                ) : (
                  <ArrowDown2 size="12" variant="Linear" color="#667185" />
                )}
              </button>

              {isActive && (
                <ul className="ml-[26px] pl-[12px] py-[8px]   border-l border-[#98A2B3]/50 mb-1">
                  <Link
                    to="/wallet/overview"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/wallet/overview" ||
                      window.location.pathname === "/wallet/topup" ||
                      window.location.pathname === "/wallet/debit"
                        ? "bg-[#F7F9FC] font-medium "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Naira Wallet</li>
                  </Link>

                  <Link
                    to="/usd-wallet"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/usd-wallet"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Dollar Wallet</li>
                  </Link>
                  <Link
                    to="/bulk-payment"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/bulk-payment"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Bulk Payment</li>
                  </Link>
                  <Link
                    to="/beneficiaries"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/beneficiaries"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Beneficiaries</li>
                  </Link>
                </ul>
              )}

              <Link
                to="/transaction"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]      leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/transaction"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <EmptyWalletChange
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/transaction"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Transactions
              </Link>

              {/* //expense Card */}
              {/* <button
                onClick={() => setIsExpenseActive(!isExpenseActive)}
                className={`py-[10px] pl-[16px] flex items-center  justify-between w-full text-[14px]    leading-[20px] md:leading-[24px] 
                ${
                  window.location.pathname === "/usd-card" ||
                  window.location.pathname === "/naira-card"
                    ? "text-[#26ae5f] font-medium rounded-md"
                    : "text-[#667185] font-normal "
                }`}
              >
                <div className="flex items-center relative ">
                  {" "}
                  <Card
                    className="mr-[12px]"
                    size={20}
                    variant={
                      window.location.pathname === "/usd-card" ||
                      window.location.pathname === "/naira-card"
                        ? "Bold"
                        : "Linear"
                    }
                  />
                  Expense Card
                  <div className="absolute -right-3 ">
                    <div className="flex h-[8px] w-[8px] relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-orange-400"></span>
                    </div>
                  </div>
                </div>

                {isExpenseActive ? (
                  <ArrowUp2 size="12" variant="Linear" color="#667185" />
                ) : (
                  <ArrowDown2 size="12" variant="Linear" color="#667185" />
                )}
              </button>

              {isExpenseActive && (
                <ul className="ml-[26px] pl-[12px] py-[8px]   border-l border-[#98A2B3]/50 mb-1">
                  <Link
                    to="/naira-card"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/naira-card"
                        ? "bg-[#F7F9FC] font-medium "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Naira Card</li>
                  </Link>

                  <Link
                    to="/usd-card"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/usd-card"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Dollar Card</li>
                  </Link>
                </ul>
              )}  */}
              <Link
                to="/user-wallets"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]      leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/user-wallets"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Wallet1
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/user-wallets"
                      ? "Bold"
                      : "Linear"
                  }
                />
                User Wallets{" "}
              </Link>
              {/* } */}

              <Link
                to="/paymentlink"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/paymentlink"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Note
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/paymentlink"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Payment Link
              </Link>

              {/* 
            <button
              onClick={() => setIsActive("invoice")}
              className={` ${
                isActive === "invoice" ? "" : " "
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
              <ul className="ml-[26px] pl-[12px] py-[14px]   border-l border-[#98A2B3]/50">
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
                  className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  leading-[18px] md:leading-[24px]  ${
                    window.location.pathname === "/customers"
                      ? "bg-[#F7F9FC] font-medium  "
                      : " font-normal"
                  }`}
                >
                  <li className="">Customers</li>
                </Link>
              </ul>
            )} */}

              <button
                onClick={() => setIsBookKeepingActive(!isBookKeepingActive)}
                className={`py-[10px] pl-[16px] flex items-center  justify-between w-full text-[14px]    leading-[20px] md:leading-[24px] 
                ${
                  window.location.pathname === "/bookkeeping" ||
                  window.location.pathname ===
                    "/bookkeeping/migrate-transaction" ||
                  window.location.pathname === "/bookkeeping/report" ||
                  window.location.pathname === "/bookkeeping/configuration"
                    ? "text-[#26ae5f] font-medium rounded-md"
                    : "text-[#667185] font-normal "
                }`}
              >
                <div className="flex items-center">
                  {" "}
                  <Book
                    className="mr-[12px]"
                    size={20}
                    variant={
                      window.location.pathname === "/bookkeeping" ||
                      window.location.pathname ===
                        "/bookkeeping/migrate-transaction" ||
                      window.location.pathname === "/bookkeeping/report" ||
                      window.location.pathname === "/bookkeeping/configuration"
                        ? "Bold"
                        : "Linear"
                    }
                  />
                  Book Keeping
                </div>

                {isBookKeepingActive ? (
                  <ArrowUp2 size="14" variant="Linear" color="#667185" />
                ) : (
                  <ArrowDown2 size="14" variant="Linear" color="#667185" />
                )}
              </button>

              {isBookKeepingActive && (
                <ul className="ml-[26px] pl-[12px] py-[8px]   border-l border-[#98A2B3]/50 mb-1">
                  <Link
                    to="/bookkeeping"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/bookkeeping"
                        ? "bg-[#F7F9FC] font-medium "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Book Keeping</li>
                  </Link>

                  <Link
                    to="/bookkeeping/migrate-transaction"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname ===
                      "/bookkeeping/migrate-transaction"
                        ? "bg-[#F7F9FC] font-medium "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Migrate Transaction</li>
                  </Link>

                  <Link
                    to="/bookkeeping/report"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/bookkeeping/report"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Report</li>
                  </Link>
                  <Link
                    to="/bookkeeping/configuration"
                    className={` py-[6px] pl-[12px] flex items-center text-[12px]  text-[#667185] rounded-md  hover:bg-[#F7F9FC]  ${
                      window.location.pathname === "/bookkeeping/configuration"
                        ? "bg-[#F7F9FC] font-medium  "
                        : " font-normal"
                    }`}
                  >
                    <li className="">Configuration</li>
                  </Link>
                </ul>
              )}

              <Link
                to="/invoice"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/invoice" ||
                  window.location.pathname === "/saveinvoice" ||
                  window.location.pathname === "/createinvoice"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Folder2
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/invoice" ||
                    window.location.pathname === "/saveinvoice" ||
                    window.location.pathname === "/createinvoice"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Issue Invoice
              </Link>

              {/* <Link
                to="/card"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/createinvoice"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Card
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/card" ? "Bold" : "Linear"
                  }
                />
                Expense Card
              </Link> */}

              {/* <Link
              to="/verification"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                window.location.pathname === "/verification"
                  ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                  : "text-[#667185] font-normal"
              }`}
            >
              <Verify
                className="mr-[12px]"
                variant={
                  window.location.pathname === "/verification"
                    ? "Bold"
                    : "Linear"
                }
              />
              Verifications
            </Link> */}
              <Link
                to="/store"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]    leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/store"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <ShoppingCart
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/store" ? "Bold" : "Linear"
                  }
                />
                Store
              </Link>
              <Link
                to="/customers"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/customers"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Profile
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/customers"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Customers
              </Link>
              <Link
                to="/vant-assistant"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/vant-assistant"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <CommandSquare
                  className="mr-[12px]"
                  size={20}
                  variant={
                    window.location.pathname === "/vant-assistant"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Vant Assistant
              </Link>

              {/* <Link
              to="/users"
              className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
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
            </Link> */}
            </div>

            <div className="border-t pb-3 pt-2">
              <Link
                to="/setting/personal-info"
                onClick={onClose}
                className={` py-[10px] pl-[16px] flex items-center text-[14px]     leading-[20px] md:leading-[24px] ${
                  window.location.pathname === "/setting/personal-info" ||
                  window.location.pathname === "/setting/webhook" ||
                  window.location.pathname === "/setting/api-key" ||
                  window.location.pathname === "//setting/personal-info"
                    ? "text-[#26ae5f] font-medium rounded-md bg-slate-200"
                    : "text-[#667185] font-normal"
                }`}
              >
                <Setting2
                  className="mr-[12px]"
                  variant={
                    window.location.pathname === "/setting/personal-info" ||
                    window.location.pathname === "/setting/webhook" ||
                    window.location.pathname === "/setting/api-key" ||
                    window.location.pathname === "/setting/personal-info"
                      ? "Bold"
                      : "Linear"
                  }
                />
                Setting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
