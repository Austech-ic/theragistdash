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
import { enqueueSnackbar } from "notistack";
import { formatDate } from "../../utils/helperFunctions";
import Status2 from "../../components/common/Status2";

const BookingTracker = () => {
  const [listType, setListType] = useState("All");
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState(1);
  const [formValue, setFormValue] = useState({
    name: "",
    amount: "",
    color: "",
  });
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

  async function getCategories(page) {
    const response = await api.getCategories({});
    return response;
  }

  const categoryResults = useQuery(["getCategories"], () => getCategories(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const categoriesData = categoryResults?.data?.data || [];

  const createACatgory = async () => {
    setIsLoading(true);
    try {
      const response = await api.createCategory({
        name: formValue?.name,
        price: formValue?.amount,
        color: formValue?.color,
      });
      enqueueSnackbar("Category Created Successfully", { variant: "success" });
      categoryResults.refetch();
      setIsLoading(false);
      setIsCreate(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };
  function ClearForm() {
    setFormValue({
      name: "",
      amount: "",
      color: "",
    });
    setId("");
  }
  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton
          action={() => openCreateModal()}
          name="Create Category"
          noIcon={true}
        />
      </div>
      <div className="flex items-center justify-between ">
        <SearchInput placeholder={"Search Bookings"} />

     
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
            {/* <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>0</p>
            </div> */}
          </li>
          {/* <li
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
              <p>0</p>
            </div>
          </li> */}
          {/* <li
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
              <p>0</p>
            </div>
          </li> */}
        </ul>
      </div>
      <Categories data={categoriesData} />

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
                        User ID{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Date/Time{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Amount{" "}
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Category{" "}
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
                  </tr>
                </thead>
                <tbody>
                  {trackData && trackData?.length < 1 && (
                    <EmtyTable
                      name="Add Counselor"
                      label={"No Booking yet"}
                      cols={5}
                      action={openCreateModal}
                      noButton={true}
                    />
                  )}

                  {trackData?.map((item) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                        {item?.user_id}
                      </td>
                      <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-center text-[#9C9C9C]">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#9C9C9C]">
                        N{item?.category?.price}
                      </td>
                      <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      {item?.category?.name}
                      </td>

                      <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                       <Status2 status={item?.status} />
                      </td>
                    </tr>
                  ))}
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
              You about to Delete this Counsellor{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this councilor? This action will
              Permanently delete the Counsellor profile on the platform.
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
            <div className="items-center">Create Category</div>
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
                  value={formValue.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[8px] ">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Amount<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="">
                <InputField
                  type="text"
                  placeholder=""
                  value={formValue.amount}
                  name="amount"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[8px] ">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Select Color<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="flex items-center gap-2">
                {color?.map((item) => (
                  <div
                    onClick={() =>
                      setFormValue({
                        ...formValue,
                        color: item?.color.substring(1),
                      })
                    }
                    style={{ backgroundColor: item?.color }}
                    className={` ${formValue?.color === item?.color.substring(1) ? "border-2 border-[#2e2e2e]" : "" } h-[24px] lg:h-[32px] w-[24px] cursor-pointer lg:w-[32px] rounded-full `}
                  ></div>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button
              onClick={createACatgory}
              className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
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
