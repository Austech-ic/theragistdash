import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { clearUserData } from "../../utils/utils";
import {
  Add,
  ArrowDown,
  ArrowDown2,
  DocumentDownload,
  InfoCircle,
  Logout,
  SecuritySafe,
  Send2,
  Setting,
  Setting2,
  Trash,
  UserCirlceAdd,
  UserEdit,
} from "iconsax-react";
import Moment from "moment";
import {
  Grid,
  Flex,
  Button,
  Divider,
  Modal,
  Thead,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
} from "@chakra-ui/react";
import api from "../../api";
import { ClipLoader } from "react-spinners";

const Topbar = ({ setIsSidebar }) => {
  const [logo, setLogo] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enableLogin, setEnableLogin] = useState(false);
  const [enableImage, setEnableImage] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let userData = localStorage.getItem("authData");
  userData = JSON.parse(userData);

  const handleIsModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSettingsModalClose = () => {
    setIsSettingsModal(false);
  };
  function formatDate(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("dddd, Do MMMM, YYYY");
    return formattedDate;
  }
  function formatTime(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedTime = date.format("h:mm a");
    return formattedTime;
  }

  return (
    <div className="flex w-full items-center justify-between px-6 gap-[16px] py-2 border-l-[0.2px] border-[#D0D5DD]">
      <div className="flex items-center">
        <button
          class="h-10 w-10 bg-[#FAFAFA] hover:bg-[#eeeded] flex justify-center items-center rounded-md lg:hidden mr-2"
          onClick={setIsSidebar}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 18H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="md:flex items-center gap-[16px] hidden">
          <div className="flex items-center">
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              {formatDate(new Date())}
            </p>
          </div>
          <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
          <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
            {formatTime(new Date())}
          </p>
        </div>
        <h4 className="text-[20px] text-[#1a202c] font-bold hidden ">
          {location.pathname === "/dashboard"
            ? "Dashboard"
            : location.pathname === "/transaction"
            ? "Transactions"
            : location.pathname === "/settlement"
            ? "Settlements"
            : location.pathname === "/merchant"
            ? "Team"
            : location.pathname === "/apikey"
            ? "API Credentials"
            : location.pathname === "/businessProfile"
            ? "Business Profile"
            : location.pathname === "/settlementAccount"
            ? "Settlement Account"
            : location.pathname === "/name"
            ? "Name"
            : location.pathname === "/userAdmin"
            ? "User Admin"
            : location.pathname === "/isActive"
            ? "IsActive"
            : location.pathname === "/accountDetails"
            ? "Account Details"
            : location.pathname === "/paymentlink"
            ? "Payment Link"
            : location.pathname === "/currency"
            ? "Currency"
            : location.pathname === "/security"
            ? "Security"
            : ""}
        </h4>{" "}
      </div>

      <div className="flex flex-row gap-3">

      <div className="flex items-center gap-1">
                <Switch
                  colorScheme="green"
                  onChange={() => setEnableImage(!enableImage)}
                />
                 <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
             Live
            </p>
              </div>

        
        <div className="flex  gap-[12px]  items-center rounded-[18px]">
          <div className="flex items-center">
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              {userData?.user?.name}
            </p>
            <Menu>
              <MenuButton bg={"none"}>
                <button className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] rounded-[8px] hover:bg-[#F7F9FC] flex justify-center items-center">
                  <ArrowDown2 size={16} color="#667185" />
                </button>
              </MenuButton>
              <MenuList
                maxW="289px"
                w="289px"
                className="border-[2px] p-[10px] md:p-[16px]"
              >
                <div className="flex-item gap-[16px]">
                  <div className="h-[28px] w-[28px] md:h-[32px] md:w-[32px] rounded-[4px] bg-[#F9FAFB] flex justify-center items-center">
                    {" "}
                    <p className="text-[#475367] text-[12px] md:text-[12px] xl:text-[12px] font-bold leading-[24px] ">
                      EA
                    </p>
                  </div>
                  <p className="text-[#000000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                    Eaglion’s Workspace
                  </p>
                </div>
                <div className="flex-item justify-between mb-[20px] mt-[12px]">
                  <button
                    onClick={() => setIsSettingsModal(true)}
                    className="py-[5px] px-[12px] border-[0.2px] rounded-md border-[#98A2B3] w-[96px] flex-item gap-2"
                  >
                    <Setting2 size={13} color="#98A2B3" />{" "}
                    <p className="text-[#98A2B3] text-[10px]  xl:text-[12px] font-normal leading-[18px] ">
                      Settings
                    </p>
                  </button>
                  <button
                    onClick={() => setIsInvite(true)}
                    className="py-[5px] px-[12px] border-[0.2px] rounded-md border-[#98A2B3]  flex-item gap-2"
                  >
                    <UserCirlceAdd size={13} color="#98A2B3" />{" "}
                    <p className="text-[#98A2B3] text-[10px]  xl:text-[12px] font-normal leading-[18px] ">
                      Invite members
                    </p>
                  </button>
                </div>
                <div>
                  <p className="text-[#98A2B3] text-[10px]  xl:text-[12px] font-normal leading-[18px] ">
                    ogundelecaleb@gmail.com
                  </p>
                </div>
                <div className="flex-item gap-2">
                  <div className="h-[28px] w-[28px] md:h-[32px] md:w-[32px] rounded-[4px] bg-[#F9FAFB] flex justify-center items-center">
                    {" "}
                    <p className="text-[#475367] text-[12px] md:text-[12px] xl:text-[12px] font-bold leading-[24px] ">
                      EA
                    </p>
                  </div>
                  <p className="text-[#000000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                    Eaglion’s Workspace
                  </p>
                </div>
                <div className="flex-item gap-2">
                  <div className="h-[28px] w-[28px] md:h-[32px] md:w-[32px] rounded-[4px] bg-[#F9FAFB] flex justify-center items-center">
                    {" "}
                    <p className="text-[#475367] text-[12px] md:text-[12px] xl:text-[12px] font-bold leading-[24px] ">
                      EA
                    </p>
                  </div>
                  <p className="text-[#000000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                    Eaglion’s Workspace
                  </p>
                </div>
                <div className="py-[16px] border-t-[0.2px]  border-[#98A2B3] mt-[20px] ">
                  <button
                    onClick={() => setIsCreate(true)}
                    className="flex-item gap-2 "
                  >
                    {" "}
                    <Add size={20} color="#98A2B3" />{" "}
                    <p className="text-[#98A2B3] text-[12px]  xl:text-[14px] font-normal leading-[18px] ">
                      Create new worksapce
                    </p>
                  </button>
                  <button
                    onClick={() => setIsProfile(true)}
                    className="flex-item gap-2 mt-[20px]"
                  >
                    {" "}
                    <UserEdit size={20} color="#98A2B3" />{" "}
                    <p className="text-[#98A2B3] text-[12px]  xl:text-[14px] font-normal leading-[18px] ">
                      Profile
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      // navigate("/login");

                      api.logout();
                      navigate("/login");
                      // setIsOpen(false);
                    }}
                    className="flex-item gap-2 mt-[20px]"
                  >
                    {" "}
                    <Logout size={20} color="#26ae5f" />{" "}
                    <p className="text-[#26ae5f] text-[12px]  xl:text-[14px] font-normal leading-[18px] ">
                      Log out
                    </p>
                  </button>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isProfile}
        onClose={() => setIsProfile(false)}
        size="2xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />

          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div>
              {" "}
              <p className="text-[14px] md:text-[16px] mb-2 font-medium text-[#000] leading-[20px]  ">
                Profile details
              </p>
              <p className="text-[14px] text-[#667185] leading-[20px]  ">
                Edit your personal information
              </p>
            </div>

            <div className="flex-item flex-col md:flex-row gap-[32px]">
              <div className=" ease-in-out transition delay-1000 duration-1000 w-full md:w-[35%]">
                {" "}
                <div className="mt-[20px] md:mt-[26px] lg:mt-[32px] mb-[14px] h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[148px] lg:w-[148px] rounded-[8px] bg-[#FEEEE6] flex justify-center items-center">
                  {" "}
                  <p className="text-[#26ae5f] text-[20px] md:text-[32px] xl:text-[24px] font-bold ">
                    EA
                  </p>
                </div>
                <div className=" rounded-[8px] bg-[#F9FAFB] max-w-[247px] flex gap-1 py-[10px] md:py-[12px] px-[20px] items-center mb-[28px] md:mb-[40px]">
                  <Send2 color={"#667185"} size={20} />
                  <p className="text-[14px] text-[#667185] leading-[20px]  ">
                    Upload workspace picture
                  </p>
                </div>
              </div>
              <div className=" w-full md:w-[60%]">
                <p className="text-[14px] md:text-[16px] mb-3 md:mb-4 font-medium text-[#000] leading-[20px]  ">
                  Name
                </p>
                <input
                  className="flex  h-9 max-w-[410px] w-full mb-5 md:mb-6 rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                  id="name"
                  name="name"
                  type="text"
                />
                 <p className="text-[14px] md:text-[16px] mb-3 md:mb-4 font-medium text-[#000] leading-[20px]  ">
                Email
                </p>
                <input
                  className="flex  h-9 max-w-[410px] w-full mb-5 md:mb-6 rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                  id="name"
                  name="name"
                  type="text"
                />
              </div>
            </div>

            <div className="py-3 md:py-4 px-3 md:px-5 rounded-lg bg-[#FFF5E6] ">
              <InfoCircle
                color="#FF9800"
                size={20}
                variant="Bold"
                className="mb-2"
              />
              <p className="text-[14px] md:text-base text-[#FF9800] leading-[20px] md:leading-6  ">
              Please upload a valid image file. Size of image should not be more than 2MB.
              </p>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
              Cancel
            </button>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
              {!isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Upload </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isCreate}
        onClose={() => setIsCreate(false)}
        size="2xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="4"
            color="#000000"
            className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
          >
            Create New Workspace
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalCloseButton size={"sm"} />

          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <p className="text-[14px] md:text-[16px] mb-3 md:mb-4 font-medium text-[#000] leading-[20px]  ">
              Name
            </p>
            <input
              className="flex  h-9 max-w-[410px] w-full mb-5 md:mb-6 rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
              id="name"
              name="name"
              type="text"
            />
            <li className="flex-item justify-between mb-[32px]">
              <div>
                {" "}
                <p className="text-[14px] md:text-[16px] mb-2 font-medium text-[#000] leading-[20px]  ">
                  Workspace picture{" "}
                </p>
                <p className="text-[14px] text-[#667185] leading-[20px]  ">
                  Enable or disable workspace picture
                </p>
              </div>

              <div>
                <Switch
                  colorScheme="orange"
                  onChange={() => setEnableImage(!enableImage)}
                />
              </div>
            </li>

            {enableImage && (
              <div className=" ease-in-out transition delay-1000 duration-1000">
                {" "}
                <div className="mt-[20px] md:mt-[26px] lg:mt-[32px] mb-[14px] h-[32px] w-[32px] md:h-[48px] md:w-[48px] lg:h-[80px] lg:w-[80px] rounded-[8px] bg-[#F9FAFB] flex justify-center items-center">
                  {" "}
                  <p className="text-[#475367] text-[18px] md:text-[24px] xl:text-[24px] font-bold ">
                    EA
                  </p>
                </div>
                <div className=" rounded-[8px] bg-[#F9FAFB] max-w-[247px] flex gap-1 py-[10px] md:py-[12px] px-[20px] items-center mb-[28px] md:mb-[40px]">
                  <Send2 color={"#667185"} size={20} />
                  <p className="text-[14px] text-[#667185] leading-[20px]  ">
                    Upload workspace picture
                  </p>
                </div>
              </div>
            )}

            <div className="py-3 md:py-4 px-3 md:px-5 rounded-lg bg-[#FFF5E6] ">
              <InfoCircle
                color="#FF9800"
                size={20}
                variant="Bold"
                className="mb-2"
              />
              <p className="text-[14px] md:text-base text-[#FF9800] leading-[20px] md:leading-6  ">
                Note: When creating a new workspace, keep in mind that
                information can’t be transferred across Workspaces.{" "}
              </p>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
              Cancel
            </button>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
              {!isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Upload </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isInvite}
        onClose={() => setIsInvite(false)}
        size="2xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="4"
            color="#000000"
            className="flex-item justify-between bg-[#F9FAFB]"
          >
            <p className="text-[14px] md:text-[16px] text-[#667185] font-medium leading-[24px] md:leading-[24px]">
              {" "}
              Invite others by name or email
            </p>{" "}
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
              {!isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Save </>
              )}
            </button>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />

          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <p className="text-[14px] md:text-[16px] text-[#667185] font-medium leading-[24px] md:leading-[24px]">
              {" "}
              Who has access?
            </p>{" "}
            <div className="flex-item gap-2 mt-3">
              <SecuritySafe size={20} color="#667185" />
              <p className="text-[14px] md:text-[16px] text-[#000] font-medium leading-[24px] md:leading-[24px]">
                {" "}
                Only those you invite will have access to this workspace
              </p>
            </div>
            <div className="flex-item mt-4">
              <img src="./assets/imageList.png" alt="" />{" "}
              <p className="text-[14px] md:text-[16px] text-[#000] font-medium leading-[24px] md:leading-[24px]">
                {" "}
                Only those you invite will have access to this workspace
              </p>{" "}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        isOpen={isSettingsModal}
        onClose={handleSettingsModalClose}
        size="2xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />

          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="flex-item justify-between mt-2">
              <div>
                <p className="text-[16px] md:text-[18px] text-[#000] leading-[22px] md:leading-[27px]  mb-[4px] ">
                  Workspace Settings
                </p>
                <p className="text-[14px] text-[#667185] leading-[20px]  ">
                  Edit your workspace settings
                </p>
              </div>
              <div className="flex-item gap-[20px]">
                {" "}
                <button
                  onClick={handleSettingsModalClose}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                  {!isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Save </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-[20px] md:mt-[26px] lg:mt-[32px] mb-[14px] h-[32px] w-[32px] md:h-[48px] md:w-[48px] lg:h-[80px] lg:w-[80px] rounded-[8px] bg-[#F9FAFB] flex justify-center items-center">
              {" "}
              <p className="text-[#475367] text-[18px] md:text-[24px] xl:text-[24px] font-bold ">
                EA
              </p>
            </div>

            <div className=" rounded-[8px] bg-[#F9FAFB] max-w-[247px] flex gap-1 py-[10px] md:py-[12px] px-[20px] items-center mb-[28px] md:mb-[40px]">
              <Send2 color={"#667185"} size={20} />
              <p className="text-[14px] text-[#667185] leading-[20px]  ">
                Upload workspace picture
              </p>
            </div>
            <ul>
              <li className="mb-[32px]">
                <p className="text-[14px] md:text-[16px] mb-2 font-medium text-[#000] leading-[20px]  ">
                  Upload workspace picture
                </p>
                <input
                  className="flex  h-9 max-w-[410px] w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                  id="name"
                  name="name"
                  type="text"
                />
              </li>
              <li className="flex-item justify-between mb-[32px]">
                <div>
                  {" "}
                  <p className="text-[14px] md:text-[16px] mb-2 font-medium text-[#000] leading-[20px]  ">
                    Workspace picture{" "}
                  </p>
                  <p className="text-[14px] text-[#667185] leading-[20px]  ">
                    Enable or disable workspace picture
                  </p>
                </div>

                <div>
                  <Switch
                    colorScheme="orange"
                    onChange={() => setEnableLogin(!enableLogin)}
                  />
                </div>
              </li>
              <li className="flex-item justify-between ">
                <div>
                  {" "}
                  <p className="text-[14px] md:text-[16px] mb-2 font-medium text-[#000] leading-[20px]  ">
                    Remove workspace{" "}
                  </p>
                  <p className="text-[14px] text-[#667185] leading-[20px]  ">
                    This removes the workspace and automatically deletes all the
                    information{" "}
                  </p>
                </div>

                <div>
                  <Trash
                    color="orange"
                    size={20}
                    onChange={() => setEnableLogin(!enableLogin)}
                  />
                </div>
              </li>
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Topbar;
