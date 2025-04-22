import {
  Add,
  CloseCircle,
  DocumentDownload,
  DocumentUpload,
  Edit,
  Maximize4,
  More,
  RowHorizontal,
  SearchNormal1,
  Trash,
} from "iconsax-react";
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import api from "../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import ModalLeft from "../components/ModalLeft";
import InputField from "../components/InputField";

const Sales = () => {
  const navigate = useNavigate();
  const [isViewModal, setIsViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [formValue, setFormValue] = useState({});

  function HandleEditModalClose() {
    setIsEditOpen(false);
  }

  function ToggleEditModal() {
    setIsEditOpen(!isEditOpen);
  }

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const closeCreateModal = () => {
    setIsCreate(false);
  };

  function ToggleDeleteModal(id) {
    setIsDeleteModal(!isDeleteModal);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  const result = [{ status: "Success" }];

  const closeViewModal = () => {
    setIsViewModal(false);
  };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const response = await api.getTransaction({

  //     });
  //     //console.log("responce==>>>>>", response);
  //     enqueueSnackbar("Leave Application successfull", { variant: "success" });
  //     setIsLoading(false);
  //     navigate("submited");
  //   } catch (error) {
  //     //console.log(error);
  //     enqueueSnackbar(error.message, { variant: "error" });
  //     setIsLoading(false);
  //   }
  // }

  // const handlePrev = (event) => {
  //   if (event) {
  //     setPage(page - 1);
  //   }
  // };
  // const handleNext = (event) => {
  //   if (event) {
  //     setPage(page + 1);
  //   }
  // };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className="border-b border-b-[#E4E7EC] h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Sales Management
              </p>
            </div>
            <div className="h-[28px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#1254bd] focus:border-b-[#1254bd] "
                placeholder="Search by Sales name.."
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => toggleCreate()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#26ae5f] leading-[20px]">
                Create Sales
              </p>

              <Add variant="Linear" color="#26ae5f" size="16" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8 mt-5">
          <div class="inline-block min-w-full  sm:px-6 lg:px-8">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Date Created
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {results?.isLoading && <TableLoading cols={8} />}
                  {results?.data && results?.data?.data?.length === 0 && ( */}
                  {/* <EmptyWallet
                      cols={8}
                      action={"Users"}
                      subheading={"Your sub users will appear here."}
                    />
                  )} */}

                  {/* {results?.data &&
                    results?.data?.data?.map((result) => ( */}
                  <tr key="_" className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                      Ogundele Caleb{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                      ogun!@gmail.com
                    </td>

                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                      <button
                        className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                          result.status === "Pending"
                            ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                            : result.status === "Ongoing"
                            ? "bg-[#F9FAFB] text-[#667185]"
                            : "bg-[#EDF7EE] text-[#4CAF50]"
                        }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                      >
                        <p>Active</p>
                      </button>{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                      Sep 11, 2024 (at 03.00 AM)
                    </td>

                    <td className="whitespace-nowrap  flex-item gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-center ">
                      <div className="flex items-center py-[20px] justify-center gap-2">
                        <button onClick={() => ToggleEditModal()}>
                          <Edit variant="Linear" color="#667185" size="16" />
                        </button>
                        <button onClick={() => ToggleDeleteModal()}>
                          <Trash variant="Linear" color="#F05454FF" size="16" />
                        </button>
                      </div>

                      <Modal
                        isCentered
                        isOpen={isDeleteModal}
                        onClose={closeDeleteModal}
                        size="md"
                        style={{ borderRadius: 12 }}
                        motionPreset="slideInBottom"
                        className="rounded-[12px]"
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader
                            py="4"
                            color="#000000"
                            className="text-[18px]   font-medium leading-[24px] md:leading-[24px]"
                          >
                            <Trash
                              variant="Linear"
                              color="red"
                              size="36"
                              className="mx-auto"
                            />
                          </ModalHeader>
                          <ModalCloseButton size={"sm"} />
                          <ModalBody
                            py={{ base: "20px", md: "24px" }}
                            px={{ base: "16px", md: "24px" }}
                            className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                          >
                            <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium  ">
                              Delete Sales
                            </p>

                            <p className="text-[14px]  text-[#667185] leading-[20px] font-normal text-center mt-2  ">
                              Are you sure you want to delete this Sales?
                              This action cannot be undone.
                            </p>
                          </ModalBody>
                          <ModalFooter gap={"16px"}>
                            <button
                              onClick={closeDeleteModal}
                              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                            >
                              Cancel
                            </button>
                            <button
                              // onClick={handleDelete}
                              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f]  text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                            >
                              {isLoading ? (
                                <ClipLoader color={"white"} size={20} />
                              ) : (
                                <> Delete </>
                              )}
                            </button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </td>
                  </tr>
                  {/* ))} */}
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {/* <div className="flex items-center justify-between">
        <p className="text-[14px] leading-[16px] tracking-[0.2px] text-[#667185]">
          Showing {results?.data?.meta.from || 0} -{" "}
          {results?.data?.meta.to || 0} of {results?.data?.meta.total} results |
          Page {results?.data?.meta.current_page} of{" "}
          {results?.data?.meta.last_page}
        </p>
        <div>
          <button
            onClick={() => handlePrev(results?.data?.links?.prev)}
            disabled={!results?.data?.links.prev}
            className={`rounded-tl-lg rounded-bl-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.prev
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#1254bd]"
            }`}
          >
            Prev
          </button> */}

      {/* {results?.data?.meta.links.map((link, index) => (
              link.url ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(link.url)}
                  className={link.active ? 'active' : ''}
                >
                  {link.label}
                </button>
              ) : (
                <span key={index}>{link.label}</span>
              )
            ))} */}

      {/* <button
            onClick={() => handleNext(results?.data?.links?.next)}
            disabled={!results?.data?.links.next}
            className={`rounded-tr-lg rounded-br-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.next
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#1254bd]"
            }`}
          >
            Next
          </button>
        </div> 
      </div>*/}

      <ModalLeft isOpen={isEditOpen} onClose={HandleEditModalClose}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[8px] md:p-[10px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[27px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Edit Sales
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={HandleEditModalClose} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <div className="p-[12px] md:p-[20px] xl:p-[24px]">
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Name
              </label>
              <div className="">
                <InputField
                  placeholder=""
                  value={formValue.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Email
              </label>
              <div className=" ">
                <InputField
                  placeholder="@email.com"
                  value={formValue?.price}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Phone Number
              </label>
              <div className=" ">
                <InputField
                  placeholder="080*********"
                  value={formValue?.description}
                  name="phone"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Sales
              </label>
              <div className=" ">
                <InputField
                  placeholder=""
                  value={formValue?.description}
                  name="description"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={closeCreateModal}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  // onClick={CreateProduct}
                  className="border-[0.2px]  border-[#98A2B3] w-[140px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Sales</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLeft>

      <ModalLeft isOpen={isCreate} onClose={closeCreateModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[8px] md:p-[10px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[27px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Create Sales
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={closeCreateModal} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <div className="p-[12px] md:p-[20px] xl:p-[24px]">
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Name
              </label>
              <div className="">
                <InputField
                  placeholder=""
                  value={formValue.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Email
              </label>
              <div className=" ">
                <InputField
                  placeholder="@email.com"
                  value={formValue?.price}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Phone Number
              </label>
              <div className=" ">
                <InputField
                  placeholder="080*********"
                  value={formValue?.description}
                  name="phone"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Sales
              </label>
              <div className=" ">
                <InputField
                  placeholder=""
                  value={formValue?.description}
                  name="description"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={closeCreateModal}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  // onClick={CreateProduct}
                  className="border-[0.2px]  border-[#98A2B3] w-[140px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Sales</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLeft>
    </div>
  );
};

export default Sales;
