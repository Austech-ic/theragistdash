import React, { useState } from "react";
import AddButton from "../../components/common/AddButton";
import SearchInput from "../../components/common/SearchInput";
import {
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
} from "@chakra-ui/react";
import InputField from "../../components/InputField";
import { Edit, Edit2, Eye, Trash } from "iconsax-react";
import EmtyTable from "../../components/common/EmtyTable";

const User = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [listType, setListType] = useState("All");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);

  const openSuspend = () => {
    setIsSuspend(true);
  };
  const closeSuspend = () => {
    setIsSuspend(false);
  };
  const openDelete = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };

  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
  };

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      {/* <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton action={() => openCreateModal()} name="Add User" />
      </div> */}
      <div className="flex items-center justify-between ">
        <SearchInput placeholder={"Search User"} />

        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap ">Filter By</p>{" "}
          <select className="w-full  pl-[6px] py-[10px] text-[14px] text-[#2e2e2e] leading-[20px] bg-[#fff] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#E1E1E1] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] ">
            <option value="">Attended Sessions</option>
            <option value="">Categories</option>
            <option value="">Status</option>
          </select>{" "}
        </div>
      </div>

      <div className="mt-5 md:mt-6">
        <ul className="flex gap-3 md:gap-4 lg-gap-5">
          <li
            onClick={() => setListType("All")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "All"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>All Users</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>112</p>
            </div>
          </li>
          <li
            onClick={() => setListType("Suspended")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "Suspended"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Suspended User</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center text-xs  rounded-full ${
                listType === "Suspended"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>80</p>
            </div>
          </li>
          <li
            onClick={() => setListType("Deleted")}
            className={`pb-2  cursor-pointer flex items-center gap-[6px]  ${
              listType === "Deleted"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Deleted User</p>{" "}
            <div
              className={` text-xs h-[24px] w-[24px]  flex items-center justify-center rounded-full ${
                listType === "Deleted"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea] "
              }`}
            >
              <p>2</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block  min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
                  <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
SN                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Name{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Registration Date
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                      Attended session
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Email
                      </div>
                    </th>
                   
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <EmtyTable
                    name="Add User"
                    label={"No User Registered yet"}
                    cols={6}
                    action={openCreateModal}
                  />

                  <tr className="border-b-[0.8px] border-[#E4E7EC]">
                  <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                      1
                    </td>
                    <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                      <p className="font-medium whitespace-nowrap">
                        SOS User
                      </p>
                      <p className="text-[#9C9C9C] ">ID: 2346570067</p>
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      31. Dec. 2022
                    </td>
                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                      48
                    </td>
                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                      rachealbambam@gmail.com
                    </td>
                  

                    <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
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
                        <p>Active</p>
                      </div>{" "}
                    </td>
                    <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                      <div className="flex items-center gap-1">
                        <Eye
                          onClick={openSuspend}
                          size="20"
                          variant="Bold"
                          color="#F7A30A"
                          className="cursor-pointer"
                        />
                         <Edit
                          onClick={openSuspend}
                          size="20"
                          variant=""
                          color="blue"
                          className="cursor-pointer"
                        />
                        <Trash
                          onClick={openDelete}
                          size="20"
                          variant="Bold"
                          color="red"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isCreate}
        onClose={closeCreate}
        size={{ base: "xs", sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="4"
            color="#000000"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={"400"}
          >
            <div className="items-center">Create User </div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <>
              <div className="mb-[8px] mt-4 md:mt-5">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  User Name<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    placeholder="Enter name"
                    // value={formValue.name}
                    // name="name"
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Email<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    type="email"
                    placeholder="e.g. abc@website.com"
                    // value={formValue.name}
                    // name="name"
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Phone Number<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <select className="w-[20%] h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] ">
                    <option>+234</option>
                    <option>+234</option>
                    <option>+234</option>
                  </select>
                  <InputField
                    type="email"
                    placeholder="00000000000"
                    // value={formValue.name}
                    // name="name"
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Number of session<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    type="text"
                    placeholder="Enter number"
                    // value={formValue.name}
                    // name="name"
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Address<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    type="text"
                    placeholder="Enter Address"
                    // value={formValue.name}
                    // name="name"
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </>
          </ModalBody>
          {/* <div className="flex justify-center py-3 ">
        
            <button
              onClick={() => {
                if (phase === 1) {
                  setPhase(2);
                } else {
                }
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {phase === 1 ? (
                "Next"
              ) : isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Register </>
              )}
            </button>
          </div> */}
        </ModalContent>
      </Modal>

      {/* Suspend Councellor Modal */}
      <Modal
        isCentered
        isOpen={isSuspend}
        onClose={closeSuspend}
        size={{ base: "xs", sm: "md" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
          >
            <p className=" text-[16px] md:text-lg text-center mt-4  text-[#000] leading-[24px] font-medium  ">
              You about to Suspend this User
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to suspend this User? This action will
              restrict their access to the platform till it is undone.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeSuspend();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              //   onClick={}
              className=" w-[99px] text-center bg-[#F7A30A] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              Suspend
            </button>
          </div>
        </ModalContent>
      </Modal>
      {/* Delete Counselor Modal */}
      <Modal
        isCentered
        isOpen={isDelete}
        onClose={closeDelete}
        size={{ base: "xs", sm: "md" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
          >
            <p className=" text-[16px] md:text-lg text-center mt-4  text-[#000] leading-[24px] font-medium  ">
              You about to Delete this User{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this User? This action will
              Permanently delete the councilor’s profile on the platform.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeDelete();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              // onClick={closeCancel}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              Delete
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default User;
