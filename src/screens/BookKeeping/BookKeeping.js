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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";

import moment from "moment";
import TableLoading from "../../components/TableLoading";
import { decryptaValue, truncateSentence } from "../../utils/helperFunctions";
import EmptyWallet from "../../components/EmptyWallets";
import ModalLeft from "../../components/ModalLeft";
import api from "../../api";
import InputField from "../../components/InputField";
import { getTag } from "../../api/actions";
import AddButton from "../../components/AddButton";
import { NumericFormat } from "react-number-format";

const BookKeeping = () => {
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
  const [inputField, setInputField] = useState(null);
  const [formValue, setFormValue] = useState({
    type: "",
    amount: "",
    description: "",
    category_id: "",
    tags: null,
    currency: "NGN",
    recorded_at: "",
  });

  function HandleEditModalClose() {
    setIsEditOpen(false);
    ClearForm();
  }

  function ToggleEditModal(item) {
    setIsEditOpen(!isEditOpen);
    setResultId(item?.id);
    setFormValue({
      type: item?.type,
      amount: item?.amount,
      description: item?.description,
      category_id: item?.category?.id,
      tags: item?.tags?.id,
      currency: item?.currency,
      recorded_at: item?.recorded_at,
    });
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
      type: "",
      amount: "",
      description: "",
      category_id: "",
      tags: null,
      currency: "NGN",
      recorded_at: "",
    });
  };

  const UpdateExpense = async () => {
    setIsLoading(true);
    try {
      const response = await api.updateBookKeeping(resultId, {
        type: formValue?.type,
        amount: formValue?.amount,
        description: formValue?.description,
        category_id: formValue?.category_id,
        tags: formValue?.tags?.length > 0 ? [formValue?.tags] : null,
        currency: formValue?.currency,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Record Updated Successfully", { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsEditOpen(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const CreateExpense = async () => {
    setIsLoading(true);
    try {
      const response = await api.createBookKeeping({
        type: formValue?.type,
        amount: formValue?.amount,
        description: formValue?.description,
        category_id: formValue?.category_id,
        tags: formValue?.tags?.length > 0 ? [formValue?.tags] : null,
        currency: formValue?.currency,
        // recorded_at: "2025-02-25T10:00:00Z",
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Record Created Successfully", { variant: "success" });
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

  async function getExpense(page) {
    const response = await api.getBookKeeping({
      params: {
        page,
        search,
      },
    });
    return response;
  }

  const results = useQuery(["expense", page, search], () => getExpense(page), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

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

  const getCatQuery = useQuery(["cat"], () => getCategorys(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  async function getCategorys() {
    try {
      const response = await api.getCategories();

      return response;
    } catch (error) {
      return error;
    }
  }

  const catigories = getCatQuery?.data?.data || [];

  const getTagQuery = useQuery(["getTag"], () => getTag(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const tags = getTagQuery?.data?.data || [];

  const importCsv = async () => {
    setIsLoading(true);
    const selectedFile = inputField.target.files[0];

    const formData = new FormData();
    formData.append("csv_file", selectedFile);

    try {
      const response = await api.importBookKeepingCSV(formData);
      enqueueSnackbar("CSV uploaded successfully", { variant: "success" });
      result.refetch();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.error, { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className=" h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                BookKeeping
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054]  placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by record type.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <>
              {" "}
              <AddButton action={toggleCreate} title={"Create Record"} />
            </>

            <button
              onClick={() => toggleImportModal()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#667185] ">Import CSV</p>

              <DocumentUpload variant="Linear" color="#667185" size="16" />
            </button>

            <Modal
              isCentered
              isOpen={isOpenImportModal}
              onClose={closeImportModal}
              size={{ sm: "md", lg: "xl" }}
              style={{ borderRadius: 12 }}
              motionPreset="slideInBottom"
              className="rounded-[12px]"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader
                  py="4"
                  color="#000000"
                  className="text-[16px] md:text-[18px] text-[#000000] font-medium leading-[18px] md:"
                >
                  Import Record
                </ModalHeader>
                <ModalCloseButton size={"sm"} />
                <Divider color="#98A2B3" />
                <ModalBody
                  pt={{ base: "20px", md: "24px" }}
                  px={{ base: "16px", md: "24px" }}
                  pb={{ base: "30px", md: "40px" }}
                  className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                >
                  <p className="text-[14px] text-[#667185]  mb-[20px] ">
                    Select CSV File
                  </p>

                  <input
                    className="flex mb-[20px] h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                    accept=".csv"
                    onChange={(e) => setInputField(e)}
                  />
                  {/* //Link to download CSV file  */}
                  <a
                    href="./bookkeeping_sample.csv"
                    download="bookkeeping_sample.csv"
                  >
                    <div className="flex gap-[8px] items-center">
                      {" "}
                      <p className="text-[14px] underline text-[#667185]   ">
                        Download Sample Record CSV File
                      </p>
                      <DocumentDownload
                        color="#4CAF50"
                        variant="Bold"
                        size="20px"
                      />
                    </div>
                  </a>
                </ModalBody>
                <Divider />
                <ModalFooter gap={"16px"}>
                  <button
                    onClick={closeImportModal}
                    className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={importCsv}
                    className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                  >
                    {isLoading ? (
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
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                        Type
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Amount
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Category
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Description
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Date Recorded
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium  md:leading-[24px] tracking-[0.2%]"
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
                      action={"Record"}
                      subheading={"Your book keeping records will appear here."}
                    />
                  )}
                  {/*  {TaskSummaryData &&
                    results?.data?.data?.map((result) => ( */}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.type}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <NumericFormat
                            value={result?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={result?.currency}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.category?.name}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {truncateSentence(result?.description, 25)}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {moment(result?.recorded_at).format(
                            "MMM DD, HH:mm:ss"
                          )}
                        </td>

                        <td className="whitespace-nowrap py-[16px]  gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <button onClick={() => ToggleEditModal(result)}>
                            <Edit variant="Linear" color="#667185" size="16" />
                          </button>

                          {/* <Modal
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
                                    Delete Transactions
                                  </p>
  
                                  <p className="text-[14px]  text-[#667185]  font-normal text-center mt-2  ">
                                    Are you sure you want to delete this
                                    Transactions? This action cannot be undone.
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
                                    // onClick={handleDelete}
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
                            </Modal> */}
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

      {/* Create Modal */}
      <ModalLeft isOpen={isCreate} onClose={closeCreateModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[10px]    flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className=" h-[26px]  w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Create Record{" "}
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
            <div className=" mb-[11px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Type
              </label>
              <div className="">
                <select
                  name="type"
                  required={true}
                  value={formValue.type}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                >
                  <option value="">-- Select Type --</option>
                  <option value={"income"}>Income</option>
                  <option value={"expense"}>Expense</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-[11px]">
              <div className="">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Category{" "}
                </label>
                <div className="">
                  <select
                    name="category_id"
                    required={true}
                    value={formValue.category_id}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  >
                    <option value="">-- Select Category --</option>
                    {catigories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Tag
                </label>
                <div className="">
                  <select
                    name="tags"
                    required={true}
                    value={formValue.tags}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  >
                    <option value="">-- Select Tag --</option>
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-[11px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Amount
              </label>
              <div className="">
                <InputField
                  placeholder=""
                  name="amount"
                  required={true}
                  value={formValue.amount}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className=" mb-[11px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Currency
              </label>
              <div className="">
                <select
                  name="currency"
                  required={true}
                  value={formValue.currency}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                >
                  <option value="">-- Select Currency --</option>
                  <option value={"NGN"}>NGN</option>
                  <option value={"USD"}>USD</option>
                  <option value={"GBP"}>GBP</option>
                </select>
              </div>
            </div>
            <div className=" mb-[11px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Description
              </label>
              <div className="">
                <textarea
                  name="description"
                  required={true}
                  value={formValue.description}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full h-[90px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                />
              </div>
            </div>

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={closeCreateModal}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={CreateExpense}
                  className="border-[0.2px]  border-[#98A2B3] w-[140px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Record</>
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
        onClose={HandleEditModalClose}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="3"
            color="#000000"
            fontSize={{ base: "16px", md: "18px" }}
            className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
          >
            Edit Record
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "16px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] "
          >
            <div className="h-[380px] md:h-[500px] overflow-auto">
              <div className=" mb-[11px]">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Type
                </label>
                <div className="">
                  <select
                    name="type"
                    required={true}
                    value={formValue.type}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  >
                    <option value="">-- Select Type --</option>
                    <option value={"income"}>Income</option>
                    <option value={"expense"}>Expense</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-[11px]">
                <div className="">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Category{" "}
                  </label>
                  <div className="">
                    <select
                      name="category_id"
                      required={true}
                      value={formValue.category_id}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    >
                      <option value="">-- Select Category --</option>
                      {catigories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Tag
                  </label>
                  <div className="">
                    <select
                      name="tags"
                      required={true}
                      value={formValue.tags}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    >
                      <option value="">-- Select Tag --</option>
                      {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-[11px]">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Amount
                </label>
                <div className="">
                  <InputField
                    placeholder=""
                    name="amount"
                    required={true}
                    value={formValue.amount}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className=" mb-[11px]">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Currency
                </label>
                <div className="">
                  <select
                    name="currency"
                    required={true}
                    value={formValue.currency}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  >
                    <option value="">-- Select Currency --</option>
                    <option value={"NGN"}>NGN</option>
                    <option value={"USD"}>USD</option>
                    <option value={"GBP"}>GBP</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label className="text-[14px] text-[#667185]   ">
                  Description
                </label>
                <div className="">
                  <textarea
                    name="description"
                    required={true}
                    value={formValue.description}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full h-[50px] pl-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={HandleEditModalClose}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={UpdateExpense}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
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

export default BookKeeping;
