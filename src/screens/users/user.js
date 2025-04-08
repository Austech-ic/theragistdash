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
import { Edit, Edit2, Eye, ShieldTick, Trash } from "iconsax-react";
import EmtyTable from "../../components/common/EmtyTable";
import { enqueueSnackbar } from "notistack";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Status from "../../components/common/Status";

const User = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [listType, setListType] = useState("All");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [resultId, setResultId] = useState("");


  const openActivate = (id) => {
    setResultId(id);

    setIsActivate(true);
  };
  const closeActivate = () => {
    setIsActivate(false);
  };

  const openSuspend = (id) => {
    setResultId(id);

    setIsSuspend(true);
  };
  const closeSuspend = () => {
    setIsSuspend(false);
  };
  const openDelete = (id) => {
    setResultId(id);

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

  async function getUsers(page) {
    const response = await api.getUsers({
      params: {
        search: search,
      },
    });
    return response;
  }

  const results = useQuery(["xxxx", search], () => getUsers(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const companyData = results?.data?.data || [];

  const deleteUser = async () => {
    setIsLoading(true);

    try {
      const response = await api.deleteUser(resultId);
      enqueueSnackbar(response?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeDelete(false);
      setResultId("");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  // activate user
  const activateUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.activateUser(resultId);
      enqueueSnackbar(response?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeActivate();
      setResultId("");
    } catch (error) {
      enqueueSnackbar(error.detail, { variant: "error" });

      setIsLoading(false);
    }
  };

  const suspendUser = async () => {
    setIsLoading(true);

    try {
      const response = await api.suspendUser(resultId);
      enqueueSnackbar(response?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeSuspend();
      setResultId("");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      {/* <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton action={() => openCreateModal()} name="Add User" />
      </div> */}
      <div className="flex items-center justify-between ">
        <SearchInput
          placeholder={"Search User"}
          onChange={(e) => setSearch(e.target?.value)}
        />
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
            {/* <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>112</p>
            </div> */}
          </li>
          {/* <li
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
          </li> */}
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
                        SN{" "}
                      </div>
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
                  {companyData && companyData?.length < 1 && (
                    <EmtyTable
                      name="Add User"
                      label={"No User Registered yet"}
                      cols={6}
                      action={openCreateModal}
                    />
                  )}

                  {companyData?.map((item, index) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                        {index + 1}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                        <p className="font-medium whitespace-nowrap">
                          {item?.username}
                        </p>
                      </td>
                      <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                        {formatDate(item?.date_joined)}
                      </td>
                      <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                        {item?.session_used}
                      </td>
                      <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                        {item?.email}
                      </td>

                      <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                        {/* <div className="flex gap-1 bg-[#91C561] bg-opacity-15 px-[12px] py-[4px] text-[#008D36] items-center rounded-xl">
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
                          <p>{item?.status}</p>
                        </div>{" "} */}

                        <Status status={item?.status} />
                      </td>
                      <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                        <div className="flex items-center gap-1">
                          <Link to="/user/user-details" state={item}>
                            <Eye
                              size="20"
                              variant="Bold"
                              color="#F7A30A"
                              className="cursor-pointer"
                            />
                          </Link>
                          <Edit
                            onClick={() => openSuspend(item?.id)}
                            size="20"
                            variant=""
                            color="blue"
                            className="cursor-pointer"
                          />
                          <ShieldTick
                            onClick={() => openActivate(item?.id)}
                            size="20"
                            variant=""
                            color="green"
                            className="cursor-pointer"
                          />
                          <Trash
                            onClick={() => openDelete(item?.id)}
                            size="20"
                            variant="Bold"
                            color="red"
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

     

       {/* activate User Modal */}
       <Modal
        isCentered
        isOpen={isActivate}
        onClose={closeActivate}
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
              You about to Activate this User
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to activate this User? This action will
              activate their access to the platform till it is undone.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeActivate();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={activateUser}
              className=" w-[99px] text-center bg-green-400 rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Activate </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>

      {/* Suspend User Modal */}
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
              onClick={suspendUser}
              className=" w-[99px] text-center bg-[#F7A30A] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Suspend </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
      {/* Delete User Modal */}
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
              onClick={deleteUser}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Delete </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default User;
