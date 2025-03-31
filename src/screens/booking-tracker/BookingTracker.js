import React, { useState } from "react";
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
import SearchInput from "../../components/common/SearchInput";
import AddButton from "../../components/common/AddButton";
import EmtyTable from "../../components/common/EmtyTable";
import { ClipLoader } from "react-spinners";
import InputField from "../../components/InputField";
import { ArrowSquareLeft, Eye, Trash } from "iconsax-react";
import { UploadCloud } from "lucide-react";
import Categories from "../../components/categories";
import { color } from "../../utils/Data";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";

const BookingTracker = () => {
  const [listType, setListType] = useState("All");
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState(1);

  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
  };
  const openDelete = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };
  const openCancel = () => {
    setIsCancel(true);
  };
  const closeCancel = () => {
    setIsCancel(false);
  };
  const openSuspend = () => {
    setIsSuspend(true);
  };
  const closeSuspend = () => {
    setIsSuspend(false);
  };


    async function getBookTrack(page) {
      const response = await api.getBookTrack({
        // params: {
        //   status: listType,
        //   name: search,
        // },
      });
      return response;
    }
  
    const results = useQuery(["getBookTrack"], () => getBookTrack(), {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    });
  
    const trackData = results?.data?.data || [];



  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton action={() => openCreateModal()} name="Create Category" noIcon={true} />
      </div>
      <div className="flex items-center justify-between ">
        <SearchInput placeholder={"Search Counselor"} />

        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap ">Filter By</p>{" "}
          <select className="w-full  pl-[6px] py-[10px] text-[14px] text-[#2e2e2e] leading-[20px] bg-[#fff] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#E1E1E1] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] ">
            <option value="">Date</option>
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
            <p>All Bookings</p>{" "}
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
            onClick={() => setListType("Declined")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "Declined"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Declined Booking</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center text-xs  rounded-full ${
                listType === "Declined"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>80</p>
            </div>
          </li>
          <li
            onClick={() => setListType("Pending")}
            className={`pb-2  cursor-pointer flex items-center gap-[6px]  ${
              listType === "Pending"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Pending Booking</p>{" "}
            <div
              className={` text-xs h-[24px] w-[24px]  flex items-center justify-center rounded-full ${
                listType === "Pending"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea] "
              }`}
            >
              <p>2</p>
            </div>
          </li>
        </ul>
      </div>
      <Categories />

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
                      User ID                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                      Date/Time                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                      Amount                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                      Category                      </div>
                    </th>
                 

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                   
                  </tr>
                </thead>
                <tbody>
                  <EmtyTable
                    name="Add Counselor"
                    label={"No Booking yet"}
                    cols={5}
                    action={openCreateModal}
                    noButton={true}
                  />

                  <tr className="border-b-[0.8px] border-[#E4E7EC]">
                    <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                    2346570067
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                    31. Dec. 2022 / 02:04:00 pm
                    </td>
                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                    1200
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                    Anxiety                    </td>
                  
                    <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                      <button className="flex w-auto  justify-center gap-1 bg-[#91C561] bg-opacity-15 px-[12px] py-[4px] text-[#008D36] items-center rounded-xl">
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
                        <p>Successfull</p>
                      </button>{" "}
                    </td>
                  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
              You about to Suspend this Councilor{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to suspend this councilor? This action will
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
              onClick={closeCancel}
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
            You about to Delete this Councilor            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
            Are you sure you want to delete this councilor? This action will Permanently delete the councilor’s profile on the platform.
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

      {/* Cancel Registration Modal */}
      <Modal
        isCentered
        isOpen={isCancel}
        onClose={closeCancel}
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
              You about to Cancel the registration{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              You have not finished the registration process, Are you sure you
              want to cancel.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeCreate();
                closeCancel();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={closeCancel}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              Back
            </button>
          </div>
        </ModalContent>
      </Modal>

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
            <div className="items-center">
             
              Create Category
            </div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
           
                <div className="mb-[8px]">
                  <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                    Category Name<sup className="text-[#A97400]">*</sup>
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
                    Amount<sup className="text-[#A97400]">*</sup>
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
                    Select Color<sup className="text-[#A97400]">*</sup>
                  </label>
                  <div className="flex items-center gap-2">
                    {color?.map((item) => (<div style={{backgroundColor: item?.color}} className="h-[24px] lg:h-[32px] w-[24px] lg:w-[32px] rounded-full "></div>))}
                    </div>
                    </div>
               
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button
             
              className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              { isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Create Category </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingTracker;
