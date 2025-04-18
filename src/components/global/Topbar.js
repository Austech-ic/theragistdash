import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {

  ArrowDown2,
  DocumentDownload,
  DocumentSketch,
  EmptyWalletChange,
  HambergerMenu,
  InfoCircle,
  Logout,
  Notification,
  ProfileCircle,

} from "iconsax-react";
import Moment from "moment";
import {
 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
} from "@chakra-ui/react";
import api from "../../api";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const Topbar = ({ setIsSidebar }) => {
  const [logo, setLogo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSwitchModal, setIsSwitchModal] = useState(false);
  const [switchId, setSwitchId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();



  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    rcNumber: "",
    email: "",
    phone: "",
    incopDate: "",
    address: "",
  });
  // bg-[#26ae5f6a]
  async function getProfile(page) {
    const response = ""
    return response;
  }

  const ProfileQuery = useQuery(["profile"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = ProfileQuery?.data || [];

  useEffect(() => {
    setFormValue({
      ...formValue,
      firstName: profileData?.user?.first_name,
      lastName: profileData?.user?.last_name,
      phone: profileData?.user?.phone,
      email: profileData?.user?.email,
    });
  }, [ProfileQuery?.data]);



 

  return (
    <div className="flex w-full items-center justify-between px-6 gap-[16px] py-2 border-l-[0.2px] border-[#D0D5DD]">
      <div className="flex items-center">
        <button
          class="h-8 w-8 sm:h-10 sm:w-10 bg-[#FAFAFA] hover:bg-[#efeeee] flex justify-center items-center rounded-md lg:hidden mr-2"
          onClick={setIsSidebar}
        >
          <HambergerMenu size={18} color="#1254bd" />
        </button>

        <div className="md:flex items-center gap-1 hidden ">
          <HambergerMenu
            size={24}
            color="#1254bd"
            className="hidden lg:block"
          />
          <h4 className="text-[20px] text-[#1254bd] font-normal ">
            {location.pathname === "/dashboard"
              ? "Dashboard"
              : location.pathname === "/counselor-management"
              ? "User Management"
              : location.pathname === "/categories"
              ? "Categories"
              : location.pathname === "/booking-tracker"
              ? "Booking Tracker"
              : location.pathname === "/company-management"
              ? "Company Management"
              : location.pathname === "/user"
              ? "User"
              : location.pathname === "/messages"
              ? "Messages"
              : location.pathname === "/privacy-policy"
              ? "Privacy Policy"
              : location.pathname === "/community-guidline"
              ? "Community Guidline"
              : location.pathname === "/about-us"
              ? "About Us"
              : location.pathname === "/group-management"
              ? "Group Management"
              : location.pathname === "/user-assessment"
              ? "User Assessment"
              : location.pathname === "/space-management"
              ? "Space Management"
              : location.pathname === "/feed-management/article"
              ? "Articles"
              : location.pathname === "/feed-management/post"
              ? "Post"
              : location.pathname === "/categories"
              ? "Categories"
              : ""}
          </h4>{" "}
        </div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <Menu>
          <MenuButton bg={"none"}>
            <button className=" p-2 rounded-full relative hover:opacity-80 border border-[#E1E1E1] ">
              <div className="h-3 w-3 rounded-full flex justify-center items-center bg-red-500 absolute right-1 top-1 text-white text-[8px] font-semibold">
                0
              </div>
              <Notification size={16} color="#1254bd" />
            </button>
          </MenuButton>
          <MenuList
            maxW="289px"
            w="210px"
            className="border-[2px] p-[10px] md:p-[16px] shadow"
          >
          <p className="text-sm">Notification</p>

          <div className="py-6 flex flex-col items-center justify-center" >
          <div className="rounded-full  mx-auto bg-[#E8E8E8] h-[50px] md:h-[60px] lg:h-[70px] xl:h-[100px] w-[50px] md:w-[60px] lg:w-[70px] xl:w-[100px] flex items-center justify-center ">
            <DocumentSketch
              color="#fff"
              variant="Bold"
              className="h-[20px] md:h-[30px] xl:h-[[40px]"
            />
          </div>
            
            </div>  
          </MenuList>
        </Menu>

        <div className="flex  gap-[12px] border-[1px] border-[#E1E1E1] px-3 py-1  items-center rounded-[8px]">
          <div className="">
            <Menu>
              <MenuButton bg={"none"}>
                <div className="flex items-center gap-3">
                  <p className="text-[#1254bd] whitespace-nowrap font-medium text-[14px] md:text-[14px] xl:text-[16px]  leading-[24px] ">
                    Hi {profileData?.data?.username}
                  </p>

                  <button className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] rounded-[8px] hover:bg-[#F7F9FC] flex justify-center items-center">
                    <ArrowDown2 size={14} color="#1254bd" />
                  </button>
                </div>
              </MenuButton>
              <MenuList
                maxW="289px"
                w="210px"
                className="border-[2px] p-[10px] md:p-[16px] shadow-xl"
              >
                <div className="flex items-center gap-2">
                  {profileData?.data?.pic ? (
                    <img src="" alt="profile" />
                  ) : (
                    <ProfileCircle size={24} color="#1254bd" />
                  )}
                  <p className="text-gray-500">{profileData?.data?.username}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-800 text-sm">Email: </p>
                <p className="text-gray-500 text-sm">{profileData?.data?.email}</p>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
