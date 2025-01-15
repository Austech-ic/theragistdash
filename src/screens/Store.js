import {
  Add,
  Book,
  Calendar,
  CloseCircle,
  DocumentDownload,
  DocumentUpload,
  Edit,
  ElementEqual,
  Eye,
  FilterSearch,
  Layer,
  Maximize4,
  Message2,
  More,
  RowHorizontal,
  SearchNormal1,
  Trash,
} from "iconsax-react";
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
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import ModalLeft from "../components/ModalLeft";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import api from "../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../components/TableLoading";

import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import { decryptaValue } from "../utils/helperFunctions";
import EmptyTable from "../components/EmptyTable";
import EmptyWallet from "../components/EmptyWallets";
import moment from "moment";
import { PackageOpen } from "lucide-react";
import { NumericFormat } from "react-number-format";
import InputField from "../components/InputField";
import { DocUrl } from "../utils/config";

const Store = () => {
  const navigate = useNavigate();
  const [isViewModal, setIsViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [resultId, setResultId] = useState(null);
  const [image, setImage] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    description: "",
    status: null,
  });
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("logo/")) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  function HandleEditModalClose() {
    setIsEditOpen(false);
    ClearForm();
  }

  function ToggleEditModal(id) {
    setIsEditOpen(!isEditOpen);
    setResultId(id);
    setFormValue({
      name: id?.name,
      price: id?.price,
      description: id?.description,
    });
    setPreview(id?.image ? DocUrl + id?.image : "");
  }

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const closeCreateModal = () => {
    setIsCreate(false);
    ClearForm();
  };

  function ToggleDeleteModal(id) {
    setIsDeleteModal(!isDeleteModal);
    setResultId(id);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  const toggleCreateModal = () => {
    setIsCreateModal(!isCreateModal);
  };

  const toggleImportModal = () => {
    setIsOpenImportModal(!isOpenImportModal);
  };
  const closeImportModal = () => {
    setIsOpenImportModal(false);
  };

  const toggleDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };
  const HandleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };
  const result = [{ status: "Success" }];

  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const ClearForm = () => {
    setFormValue({
      name: "",
      lastName: "",
      price: "",
      description: "",
      status: null,
    });
  };

  const UpdateProduct = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", formValue?.price);
    formData.append("name", formValue?.name);
    formData.append("description", formValue?.description);
    try {
      const response = await api.updateProduct(resultId?.id,formData);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsEditOpen(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const DeleteProduct = async () => {
    setIsLoading(true);
   
    try {
      const response = await api.deleteProduct(resultId);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeDeleteModal(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const CreateProduct = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", formValue?.price);
    formData.append("name", formValue?.name);
    formData.append("description", formValue?.description);
    try {
      const response = await api.createProducts(formData);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Product Created Successfully", { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsCreate(false);
      ClearForm();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  async function getProducts(page) {
    const response = await api.getProduct({
      params: {
        page,
        search,
      },
    });
    return response;
  }

  const results = useQuery(
    ["products", page, search],
    () => getProducts(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const handlePrev = (event) => {
    if (event) {
      setPage(page - 1);
    }
  };
  const handleNext = (event) => {
    if (event) {
      setPage(page + 1);
    }
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className=" h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Products{" "}
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by Product name.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => toggleCreate()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#26ae5f] leading-[20px]">
                Create Product
              </p>

              <Add variant="Linear" color="#26ae5f" size="16" />
            </button>

            <Modal
              isCentered
              isOpen={isOpenImportModal}
              onClose={closeImportModal}
              size="xl"
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
                  Export Transactions
                </ModalHeader>
                <ModalCloseButton size={"sm"} />
                <Divider color="#98A2B3" />
                <ModalBody
                  pt={{ base: "20px", md: "24px" }}
                  px={{ base: "16px", md: "24px" }}
                  pb={{ base: "30px", md: "40px" }}
                  className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                >
                  <p className="text-[14px] text-[#667185] leading-[20px] mb-[20px] ">
                    Select CSV File
                  </p>

                  <input
                    className="flex mb-[20px] h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                  />

                  <div className="flex gap-[8px] items-center">
                    {" "}
                    <p className="text-[14px] underline text-[#667185] leading-[20px]  ">
                      Download Sample Transactions CSV File
                    </p>
                    <DocumentDownload
                      color="#4CAF50"
                      variant="Bold"
                      size="20px"
                    />
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
                      <div className="flex justify-center text-center px-5   gap-[6px] md:gap-[12px] items-center">
                        Image
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center px-5   gap-[6px] md:gap-[12px] items-center">
                        Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Price
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Description
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center  gap-[6px] md:gap-[12px] items-center my-0">
                        Date Created
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.isLoading && <TableLoading cols={8} />}
                  {results?.data && results?.data?.data?.length === 0 && (
                    // decryptaValue(results?.data?.data) === 0 &&
                    <EmptyWallet
                      cols={8}
                      action={"Product"}
                      subheading={"Your Product will appear here."}
                    />
                  )}
                  {/*  {TaskSummaryData &&
                    results?.data?.data?.map((result) => ( */}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                          <div className="flex justify-center w-full ">
                            {" "}
                            {result?.image ? (
                              <img
                                className="rounded-full w-[35px] h-[35px] object-cover mx-auto"
                                src={DocUrl + result?.image}
                                alt="user-img"
                              />
                            ) : (
                              <PackageOpen />
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {result?.name}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          <NumericFormat
                            value={result?.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {result?.description}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {moment(result?.created_at).format("MMM DD yyyy")}
                        </td>

                        <td className="whitespace-nowrap py-[16px]  gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-center  ">
                        <div className="flex items-center justify-center gap-2">
                        <button onClick={() => ToggleEditModal(result)}>
                            <Edit variant="Linear" color="#667185" size="16" />
                          </button>
                          <button onClick={() => ToggleDeleteModal(result?.id)}>
                            <Trash variant="Linear" color="#F05454FF" size="16" />
                          </button>
                            </div>

                          
                        </td>
                      </tr>
                    ))}
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
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
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Prev
          </button>

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

          <button
            onClick={() => handleNext(results?.data?.links?.next)}
            disabled={!results?.data?.links.next}
            className={`rounded-tr-lg rounded-br-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.next
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <Modal
                              isCentered
                              isOpen={isDeleteModal}
                              onClose={closeDeleteModal}
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
                                  className="text-[18px]   font-medium leading-[24px] md:leading-[24px]"
                                >
                                  <svg
                                    className="mx-auto"
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="4"
                                      y="4"
                                      width="48"
                                      height="48"
                                      rx="24"
                                      fill="#FCC5C1"
                                    />
                                    <rect
                                      x="4"
                                      y="4"
                                      width="48"
                                      height="48"
                                      rx="24"
                                      stroke="#FEECEB"
                                      stroke-width="8"
                                    />
                                    <path
                                      d="M28 38C33.5 38 38 33.5 38 28C38 22.5 33.5 18 28 18C22.5 18 18 22.5 18 28C18 33.5 22.5 38 28 38Z"
                                      stroke="#26ae5f"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M28 24V29"
                                      stroke="#26ae5f"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M27.9961 32H28.0051"
                                      stroke="#26ae5f"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </ModalHeader>
                                <ModalCloseButton size={"sm"} />
                                <ModalBody
                                  py={{ base: "20px", md: "24px" }}
                                  px={{ base: "16px", md: "24px" }}
                                  className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                                >
                                  <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium  ">
                                    Delete Product
                                  </p>
  
                                  <p className="text-[14px]  text-[#667185] leading-[20px] font-normal text-center mt-2  ">
                                    Are you sure you want to delete this
                                    Product? This action cannot be undone.
                                  </p>
                                </ModalBody>
                                <ModalFooter gap={"16px"}>
                                  <button
                                    onClick={closeDeleteModal}
                                    className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={DeleteProduct}
                                    className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
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

      {/* Create Modal */}
      <ModalLeft isOpen={isCreate} onClose={closeCreateModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[10px] md:p-[14px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Create Product
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
                Product Name
              </label>
              <div className="">
                <InputField
                  placeholder="product"
                  value={formValue.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Price
              </label>
              <div className=" ">
                <InputField
                  placeholder="100"
                  value={formValue?.price}
                  name="price"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="max-w-md mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                  isDragging ? "border-blue-500" : "border-gray-300"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded mb-4"
                  />
                )}

                <input
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                />

                <p className="text-gray-500 text-[14px]">
                  Drag & Drop an image here
                </p>

                <label
                  htmlFor="fileInput"
                  className="mt-1 text-[#26ae5f] cursor-pointer hover:underline text-[14px]"
                >
                  Or select an image
                </label>
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Description
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
                  onClick={CreateProduct}
                  className="border-[0.2px]  border-[#98A2B3] w-[140px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Product</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLeft>

      <Modal
        isCentered
        isOpen={isEditOpen}
        onClose={ToggleEditModal}
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
            className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
          >
            Edit Product
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Name
              </label>
              <div className="">
                <InputField
                  placeholder="product"
                  value={formValue.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Price
              </label>
              <div className=" ">
                <InputField
                  placeholder="100"
                  value={formValue?.price}
                  name="price"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="max-w-md mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                  isDragging ? "border-blue-500" : "border-gray-300"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded mb-4"
                  />
                )}

                <input
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                />

                <p className="text-gray-500 text-[14px]">
                  Drag & Drop an image here
                </p>

                <label
                  htmlFor="fileInput"
                  className="mt-1 text-[#26ae5f] cursor-pointer hover:underline text-[14px]"
                >
                  Or select an image
                </label>
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Product Description
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
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={HandleEditModalClose}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={UpdateProduct}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Update </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Store;
