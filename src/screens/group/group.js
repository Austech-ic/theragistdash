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
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { formatDate } from "../../utils/helperFunctions";
import Status from "../../components/common/Status";
import { ClipLoader } from "react-spinners";

const Group = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [listType, setListType] = useState("All");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [resultId, setResultId] = useState("")

  const openSuspend = () => {

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

  async function getGroups(page) {
    const response = await api.getGroups({
      // params: {
      //   search: search,
      // },
    });
    return response;
  }

  const results = useQuery(["getGroups"], () => getGroups(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const groupData = results?.data?.data || [];
  const deletedGroup =
  groupData &&
  groupData.filter((item) => item?.status === "deleted").length;
const suspendedGroup =
groupData &&
groupData.filter((item) => item?.status === "suspended").length;
  const activeGroup =
  groupData &&
  groupData.filter((item) => item?.status === "active").length;

   const deleteGroup = async () => {
      setIsLoading(true);
  
      try {
        const response = await api.deleteGroup(resultId);
        enqueueSnackbar(response?.message, { variant: "success" });
        results.refetch();
        setIsLoading(false);
        closeDelete(false);
        setResultId("");
      } catch (error) {
        setIsLoading(false);

        enqueueSnackbar(error.detail, { variant: "error" });
  
      }
    };
  

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
     
      <div className="flex items-center justify-between ">
        <SearchInput placeholder={"Search Group"} />
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
            <p>All Groups</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>{groupData?.length}</p>
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
            <p>Suspended Group</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center text-xs  rounded-full ${
                listType === "Suspended"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>{suspendedGroup}</p>
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
            <p>Deleted Group</p>{" "}
            <div
              className={` text-xs h-[24px] w-[24px]  flex items-center justify-center rounded-full ${
                listType === "Deleted"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea] "
              }`}
            >
              <p>{deletedGroup}</p>
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
                        Group members{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap   gap-[6px] md:gap-[12px] items-center my-0">
                        Group Creator{" "}
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
                  {groupData && groupData?.length < 1 && (
                    <EmtyTable
                      label={"No Group Registered yet"}
                      cols={6}
                      action={openCreateModal}
                      noButton= {true}
                    />
                  )}

                  {groupData?.map((item, index) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                        {index+1}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                        <p className="font-medium whitespace-nowrap">
                          {item?.name}
                        </p>
                      </td>
                      <td className="px-5 py-[16px] text-center whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      {formatDate(item?.created_at)}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px] items-center  text-[#9C9C9C]">
                        {item?.members_count}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px]   text-[#9C9C9C]">
                      {item?.author}
                      </td>

                      <td className="px-5 py-[16px] text-center text-[14px]  text-[#212121]">
                       <Status status={item?.status} />
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
              You about to Delete this Group{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this Group? This action will
              Permanently delete the group on the platform.
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
              onClick={deleteGroup}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
 {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Delete </>
              )}            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Group;
