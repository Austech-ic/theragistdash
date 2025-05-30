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
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { formatDate } from "../../utils/helperFunctions";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Status from "../../components/common/Status";

const Comapny = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [listType, setListType] = useState("active");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultId, setResultId] = useState("");
  const [formValue, setFormValue] = useState({
    namd: "",
    company_mail: "",
    allocated_session: 0,
    company_address: "",
    csv_file: "",
  });

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

  async function getCompany(page) {
    const response = await api.getCompany({
      params: {
        status: listType,
        name: search,
      },
    });
    return response;
  }

  const results = useQuery(["xxxx", listType, search], () => getCompany(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const companyData = results?.data?.data || [];
  const deletedCompany =
    companyData &&
    companyData.filter((item) => item?.status === "deleted").length;
  const suspendedCompany =
    companyData &&
    companyData.filter((item) => item?.status === "suspended").length;
  const activeCompany =
    companyData &&
    companyData.filter((item) => item?.status === "active").length;

  const deleteComapany = async () => {
    setIsLoading(true);

    try {
      const response = await api.deleteComapany(resultId);
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

  const suspendComapany = async () => {
    setIsLoading(true);

    try {
      const response = await api.suspendComapany(resultId);
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

  const createCompany = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", formValue?.name);
    formData.append("company_mail", formValue?.company_mail);
    formData.append("allocated_session", formValue?.allocated_session);
    formData.append("document", formValue?.document);
    formData.append("company_address", formValue?.company_address);
    formData.append("csv_file", formValue?.csv_file);

    try {
      const response = await api.createCounsellor(formData);
      enqueueSnackbar(" Counselor Created Successfully", {
        variant: "success",
      });
      results.refetch();
      setIsLoading(false);
      // ClearForm();
    } catch (error) {
      enqueueSnackbar(error.detail, { variant: "error" });

      setIsLoading(false);
    }
  };

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <Link to="/company/create-company">
          <AddButton name="Add Company" />
        </Link>
      </div>
      <div className="flex items-center justify-between ">
        <SearchInput
          placeholder={"Search Company"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5 md:mt-6">
        <ul className="flex gap-3 md:gap-4 lg-gap-5">
          <li
            onClick={() => setListType("active")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "active"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>All Company</p>{" "}
            {/* <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>{activeCompany}</p>
            </div> */}
          </li>
          <li
            onClick={() => setListType("suspended")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "suspended"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Suspended Company</p>{" "}
            {/* <div
              className={`h-[24px] w-[24px] flex items-center justify-center text-xs  rounded-full ${
                listType === "Suspended"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>{suspendedCompany}</p>
            </div> */}
          </li>
          <li
            onClick={() => setListType("deleted")}
            className={`pb-2  cursor-pointer flex items-center gap-[6px]  ${
              listType === "deleted"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Deleted Comapny</p>{" "}
            {/* <div
              className={` text-xs h-[24px] w-[24px]  flex items-center justify-center rounded-full ${
                listType === "Deleted"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea] "
              }`}
            >
              <p>{deletedCompany}</p>
            </div> */}
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <div className=" mt-5">
          <div className="inline-block  min-w-full  ">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
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
                        Number of Users
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
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Allocated Sessions{" "}
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
                      name="Add Company"
                      label={"No Company Registered yet"}
                      cols={6}
                      action={openCreateModal}
                    />
                  )}

                  {companyData?.map((item) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                        <p className="font-medium whitespace-nowrap">
                          {item?.name}
                        </p>
                      </td>
                      <td className="px-5 py-[16px] whitespace-nowrap text-[14px] text-center  text-[#9C9C9C]">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#9C9C9C]">
                        {item?.total_user}
                      </td>
                      <td className="px-5 text-center py-[16px] text-[14px]  text-[#9C9C9C]">
                        {item?.company_mail}{" "}
                      </td>
                      <td className="px-5 text-center py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                        {item?.used_session} of {item?.allocated_session}
                      </td>

                      <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                        <Status status={item?.status} />
                      </td>
                      <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                        <div className="flex items-center gap-1">
                          <Link to="/company/users" state={item}>
                            {" "}
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
            <div className="items-center">Create Company </div>
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
                  Company Name<sup className="text-[#A97400]">*</sup>
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

        </ModalContent>
      </Modal>

      {/* Suspend Company Modal */}
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
              You about to Suspend this Company
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to suspend this company? This action will
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
              onClick={suspendComapany}
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
              You about to Delete this Company{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this company? This action will
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
              onClick={deleteComapany}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white "
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

export default Comapny;
