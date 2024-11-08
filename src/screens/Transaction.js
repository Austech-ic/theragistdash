import {
  Add,
  ArrowDown,
  ArrowUp,
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
  Note1,
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

import ModalLeft from "../components/ModalLeft";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import api from "../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../components/TableLoading";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import { decryptaValue } from "../utils/helperFunctions";
import EmptyTable from "../components/EmptyTable";
import { NumericFormat } from "react-number-format";
import moment from "moment";

const Transactions = () => {
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
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [reference, setReference] = useState("");
  const [type, setType] = useState("");
  const [transacDetails, setTransacDetails] = useState([]);

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

  const handleDetails = (result) => {
    setIsViewModal(true);
    setTransacDetails(result);
  };
  const closeViewModal = () => {
    setIsViewModal(false);
  };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const response = await api.getTransaction({

  //     });
  //     console.log("responce==>>>>>", response);
  //     enqueueSnackbar("Leave Application successfull", { variant: "success" });
  //     setIsLoading(false);
  //     navigate("submited");
  //   } catch (error) {
  //     console.log(error);
  //     enqueueSnackbar(error.message, { variant: "error" });
  //     setIsLoading(false);
  //   }
  // }

  async function getTransaction(page) {
    const response = await api.getTransaction({
      params: {
        page,
        search: reference,
        //from: startdate,
        //until: enddate,
        //is_credit: type,
      },
    });
    return response;
  }

  const results = useQuery(
    ["transactions", page, reference, startdate, enddate, type],
    () => getTransaction(page),
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

 
  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className="border-b border-b-[#E4E7EC] h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Transactions
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by transaction ref.."
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              // onClick={() => toggleImportModal()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#667185] leading-[20px]">
                Export CSV
              </p>

              <DocumentUpload variant="Linear" color="#667185" size="16" />
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
        <div className="p-[10px] md:p-[16px] lg:p-[20px]">
          {" "}
          <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar">
            <input
              type="text"
              placeholder="Transaction Reference"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
            <select
              type="text"
              placeholder=""
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            >
              <option value="">Select Currency</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <DatePicker
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="Start Date"
              selected={startdate}
              onChange={(date) => setStartdate(date)}
            />
            <DatePicker
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="End Date"
              selected={enddate}
              onChange={(date) => setEndDate(date)}
            />
            <select
              type="text"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={type}
              onChange={(e) => setType(e.taget.value)}
            >
              <option value="">Select Transaction Type</option>
              <option value="1">Credit</option>
              <option value="0">Debit</option>
              <option value="Medium">Success</option>
            </select>

            <select
              type="text"
              placeholder="Select Item Type"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            >
              <option value="">Select Status</option>
              <option value="Medium">Processing</option>
              <option value="Medium">Failed</option>
              <option value="Medium">Success</option>
            </select>
            <select
              type="text"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            >
              <option value="">Select Transaction Reason</option>
              <option value="Wallet Funding">Wallet Funding</option>
              <option value="Withdrawal">Withdrawal</option>
              {/* <option value="Medium">Success</option> */}
            </select>
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
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                        Transaction Ref
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                        Reason
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Amount
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Type
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Balance Before
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Balance after
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Date{" "}
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
                    <EmptyTable cols={8} />
                  )}
                  {/*  {TaskSummaryData &&
                  results?.data?.data?.map((result) => ( */}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.reason}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.reference}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <NumericFormat
                            value={result?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            // renderText={(value) => (
                            //   <Text className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                            //     {value}
                            //   </Text>
                            // )}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <div className="flex-item gap-1">
                            {" "}
                            {result?.type === "debit" ? (
                              <ArrowUp size={14} color="red" />
                            ) : (
                              <ArrowDown size={14} color="green" />
                            )}{" "}
                            {result?.type}
                          </div>
                        </td>
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        <NumericFormat
                            value={result?.balance_before}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            // renderText={(value) => (
                            //   <Text className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                            //     {value}
                            //   </Text>
                            // )}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        <NumericFormat
                            value={result?.balance_after}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            // renderText={(value) => (
                            //   <Text className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                            //     {value}
                            //   </Text>
                            // )}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <button
                            className={`rounded-[20px] md:rounded-[40px] w-[80px] w- py-[2px] md:py-[4px] mx-auto ${
                              result.status === "failed"
                                ? "bg-[rgb(255,245,230)] text-[#DB0404FFFF]"
                                : result.status === "Ongoing"
                                ? "bg-[#F9FAFB] text-[#667185]"
                                : "bg-[#EDF7EE] text-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                          >
                            <p>{result.status}</p>
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {moment(result?.date).format("MMM DD, HH:mm:ss")}
                        </td>

                        <td className="whitespace-nowrap py-[16px] flex-item gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <Menu>
                            <MenuButton bg={"none"} _hover={"none"}>
                              <button
                                //onClick={() => handleTransacModalOpen(result)}
                                className="   rounded-sm flex justify-center items-center  hover:bg-[#CBD5E0]  "
                              >
                                <More
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="24"
                                />{" "}
                              </button>
                            </MenuButton>
                            <MenuList maxW="32" className="">
                              <MenuItem
                                onClick={() => handleDetails(result)}
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                              >
                                <Note1
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  Receipt
                                </p>
                              </MenuItem>
                            </MenuList>
                          </Menu>

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

                                <p className="text-[14px]  text-[#667185] leading-[20px] font-normal text-center mt-2  ">
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
                          </Modal>
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
      {/* Create Modal */}
      <ModalLeft isOpen={isViewModal} onClose={closeViewModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[16px] md:p-[20px]  md:flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Transactions Details
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={closeViewModal} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <table className="mt-[18px] md:mt-[24px] max-w-[490px] mx-[16px] md:mx-[20px]  ">
            <tr className="">
              <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                Reference
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                {transacDetails?.reference}
              </td>
            </tr>
            <tr className="">
              <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                Reason
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                {transacDetails?.reason}
              </td>
            </tr>
            <tr className="">
              <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                Amount
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                <NumericFormat
                  value={transacDetails?.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  // renderText={(value) => (
                  //   <Text className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                  //     {value}
                  //   </Text>
                  // )}
                />
              </td>
            </tr>
            <tr>
              <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                Transaction Type
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                <div className="flex-item gap-1">
                  {" "}
                  {transacDetails?.type === "debit" ? (
                    <ArrowUp size={14} color="red" />
                  ) : (
                    <ArrowDown size={14} color="green" />
                  )}{" "}
                  {transacDetails?.type}
                </div>
              </td>
            </tr>

            <tr>
              <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                Fee
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                  {transacDetails?.fee}
                </p>
              </td>
            </tr>

            <tr>
              <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                Status
              </th>
              <td className="pb-[20px] pl-4 md:pl-6 ">
                <button
                  className={`rounded-[20px] md:rounded-[40px] flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px] ${
                    transacDetails?.status === "failed"
                      ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                      : // : c.mode === "Medium"
                        // ? "bg-[#FFF5E6] text-[#F44336] border-[#FF9800]"
                        "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
                  }  text-[12px] md:text-[14px]  font-semibold leading-[16px] md:leading-[18px] `}
                >
                  <p> {transacDetails?.status}</p>
                </button>{" "}
              </td>
            </tr>
          </table>
        </div>
      </ModalLeft>
    </div>
  );
};

export default Transactions;
