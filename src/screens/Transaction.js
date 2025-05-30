import {
  Add,
  ArrowDown,
  ArrowUp,
  Book,
  Calendar,
  Calendar2,
  Clipboard,
  ClipboardText,
  CloseCircle,
  DocumentDownload,
  DocumentUpload,
  More,
  Note1,
  Printer,
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
import React, { useRef, useState } from "react";
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TransactionReceipt from "../components/transaction-receipt";
import { StatementOfAccountPDF } from "../components/StatementOfAccount";
import { pdf } from "@react-pdf/renderer";
import { useUserContext } from "../utils/UserProvider";

const Transactions = () => {
  const navigate = useNavigate();
  const receiptRef = useRef();
  const [isViewModal, setIsViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [reference, setReference] = useState("");
  const [type, setType] = useState("");
  const [transacDetails, setTransacDetails] = useState([]);
  const [copiedRef, setCopiedRef] = useState(null);
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [reason, setReason] = useState("");
  const [statement, setStatement] = useState(false);
  const [statementPhase, setStatementPhase] = useState(1);

  const { profile } = useUserContext();
  // Function to copy text to the clipboard
  const handleCopy = async (transactionRef) => {
    try {
      await navigator.clipboard.writeText(transactionRef);
      setCopiedRef(transactionRef); // Set copied ref to show feedback
      setTimeout(() => setCopiedRef(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {}
  };

  function HandleStatementModalClose() {
    setStatement(false);
    setStatementPhase(1);
    setStartdate("");
    setEndDate("");
  }

  function ToggleStatementModal() {
    setStatement(!statement);
  }

  const handleSort = () => {
    if (!startdate) {
      enqueueSnackbar("Please select a start date", {
        variant: "error",
      });
      return;
    }
    if (!enddate) {
      enqueueSnackbar("Please select an end date", {
        variant: "error",
      });
      return;
    }
    if (startdate > enddate) {
      enqueueSnackbar("Start date cannot be greater than end date", {
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatementPhase(2);
    }, 3000);
  };

  const handleDetails = (result) => {
    setIsViewModal(true);
    setTransacDetails(result);
  };
  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const handleDownload = (id) => {
    const input = document.getElementById("print");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // Adjust width according to your requirement
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Receipt.pdf");
    });
  };

  const handleDownloadPdf = () => {
    setIsLoading(true);
    if (receiptRef.current) {
      receiptRef.current.generatePDF();
    }
  };

  async function getTransaction(page) {
    const response = await api.getTransaction({
      params: {
        page,
        search: reference,
        from: startdate,
        until: enddate,
        is_credit: type,
        status,
        currency,
        reason,
      },
    });
    return response;
  }

  const results = useQuery(
    [
      "transactions",
      page,
      reference,
      startdate,
      enddate,
      type,
      status,
      currency,
      reason,
    ],
    () => getTransaction(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function getexportTransaction(page) {
    const response = await api.getTransactionFullLength({
      params: {
        from: startdate,
        until: enddate,
        currency: "NGN"
       
      },
    });
    return response;
  }

  const exportdata = useQuery(
    [
      "exportdata",
      page,
      startdate,
      enddate,

    ],
    () => getexportTransaction(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const statementData = exportdata?.data?.data?.filter((item)=> item.status === "successful")

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
  const exportToExcel = () => {
    const data = results?.data?.data;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "Transaction-Report.xlsx");
  };

  const generateAndDownloadPDF = async () => {
    const blob = await pdf(
      <StatementOfAccountPDF profile={profile} data={statementData} startDate={startdate} endDate={enddate} />
    ).toBlob();
    saveAs(blob, "Transaction_Statement.pdf");
  };



  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
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
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => exportToExcel()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#667185] leading-[20px]">
                Export CSV
              </p>

              <DocumentUpload variant="Linear" color="#667185" size="16" />
            </button>
            <button
              onClick={ToggleStatementModal}
              className="border-[0.2px] px-2  border-[#98A2B3]  bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[7px] text-[12px] font-medium text-white hover:bg-opacity-80"
            >
              Generate Account Statement
            </button>

            <div className="hidden">
              {" "}
              <TransactionReceipt
                ref={receiptRef}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                transaction={transacDetails}
                showDownloadButton={false} // Hide the built-in download button
              />
            </div>
          </div>
        </div>
        <div className="p-[10px] md:p-[16px] lg:p-[20px]">
          {" "}
          <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar">
            <input
              type="text"
              placeholder="Transaction Reference"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
            <select
              type="text"
              placeholder=""
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="">Select Currency</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <DatePicker
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="Start Date"
              selected={startdate}
              onChange={(date) => setStartdate(date)}
            />
            <DatePicker
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="End Date"
              selected={enddate}
              onChange={(date) => setEndDate(date)}
            />
            <select
              type="text"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Transaction Type</option>
              <option value="1">Credit</option>
              <option value="0">Debit</option>
            </select>

            <select
              type="text"
              placeholder="Select Item Type"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">pending</option>
              <option value="successful">Success</option>
              <option value="failed">Failed</option>
              <option value="reversed">Reversed</option>
            </select>
            <select
              type="text"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Transaction Reason</option>
              <option value="Wallet Funding">Wallet Funding</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Withdrawal Transfer Fee">
                Withdrawal Transfer Fee
              </option>
              <option value="Dynamic Account Funding">
                Dynamic Account Funding
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
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
                        <td className="whitespace-nowrap py-[16px]  bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <div className="flex-item gap-2 ">
                            {result?.reference}{" "}
                            <button
                              onClick={() => handleCopy(result?.reference)}
                              className="hover:-translate-y-1  transition-transform ease-in-out "
                            >
                              {" "}
                              {copiedRef === result?.reference ? (
                                <span className="font-normal text-[12px]">
                                  Copied!
                                </span>
                              ) : (
                                <ClipboardText size={14} />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.reason}
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <NumericFormat
                            value={result?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={
                              result?.reason === "Dollar Wallet Funding"
                                ? "$"
                                : "₦"
                            }
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
                            //   </Text>x
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
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px]  text-[14px] leading-[24px] tracking-[0.2px]  font-medium text-left  ">
                          <button
                            className={`rounded-[20px] md:rounded-[40px] w-[80px] w- py-[2px] md:py-[4px] mx-auto ${
                              result.status === "failed"
                                ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                                : result.status === "pending"
                                ? "bg-[rgb(255,245,230)] text-orange-400 border-orange-400"
                                : result.status === "reversed"
                                ? "bg-yellow-100 text-yellow-500 border-yellow-500"
                                : "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
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
                                  Transaction Details
                                </p>
                              </MenuItem>
                            </MenuList>
                          </Menu>
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

      {/* Generate statement */}
      <Modal
        isCentered
        isOpen={statement}
        onClose={HandleStatementModalClose}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          {statementPhase === 1 && (
            <>
              <ModalHeader
                py="4"
                color="#000000"
                className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
              >
                Generate Account Statement
              </ModalHeader>
              <ModalCloseButton size={"sm"} />
              <Divider color="#98A2B3" />
              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "16px", md: "24px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
              >
                <div className="mb-[24px] w-full">
                  <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                    Start Date
                  </label>
                  <div className=" ">
                    <input
                      type="date"
                      className="w-full h-[38px] pl-[10px] pr-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                      name="startDate"
                      value={startdate}
                      onChange={(e) => setStartdate(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div className="mb-[24px] w-full">
                  <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                    End Date
                  </label>
                  <div className="w-full ">
                    <input
                      type="date"
                      className="w-full h-[38px] pl-[10px] pr-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                      value={enddate}
                      onChange={(e) => setEndDate(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                    />
                  </div>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter gap={"16px"}>
                <button
                  onClick={HandleStatementModalClose}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSort}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Generate </>
                  )}
                </button>
              </ModalFooter>
            </>
          )}

          {statementPhase === 2 && (
            <>
                          <ModalCloseButton size={"sm"} />

              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "16px", md: "24px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
              >
                <div className="mb-[24px] w-full">
                  <Calendar2
                    size="32"
                    color="#667185"
                    className="text-center mx-auto mb-5"
                  />
                  <p className="text-[16px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px] text-center">
                    Your Account Statement is Ready!!{" "}
                  </p>

                  <p className="text-[14px] text-[#44444f] leading-[20px] font-semibold  mb-[8px] md:mb-[16px] text-center">
                    {startdate + " " + "-" + " " + enddate}{" "}
                  </p>
                </div>
                <div className="mb-[24px] w-full">
                  <button
                    onClick={generateAndDownloadPDF}
                    className="border-[0.2px]  border-[#98A2B3] px-3 mx-auto bg-[#26ae5f] flex banks-center hover:bg-opacity-85 justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                  >
                    Download Account Statement
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* view Modal */}
      <ModalLeft isOpen={isViewModal} onClose={closeViewModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[10px] flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <button>
                {" "}
                <Printer variant="Linear" color="#667185" size="16" />{" "}
              </button>
              <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
              <div className="">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Transactions Details
                </p>
              </div>
            </div>
            <div className="">
              <button onClick={closeViewModal} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>
          <div id="print">
            <div className="w-full">
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleDownloadPdf}
                  className="flex gap-1 border  bg-[#26ae5f] text-[#fff] px-[6px] py-2 text-[13px] leading-[13px] items-center rounded-md hover:opacity-80 mr-3"
                >
                  {isLoading ? (
                    <ClipLoader size={12} />
                  ) : (
                    <DocumentDownload size="14px" color="#fff" />
                  )}
                  Download Receipt
                </button>
              </div>{" "}
              <p className=" text-[26px] my-3  mt-6 text-[#000] leading-[24px] font-semibold text-center ">
                {" "}
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
              </p>
            </div>

            <table className="mt-[18px] md:mt-[24px] max-w-[490px] mx-[16px] md:mx-[20px]  ">
              <tr className="">
                <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                  Reference:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 ">
                  {transacDetails?.reference}
                </td>
              </tr>
              <tr className="">
                <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                  Reason:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 ">
                  {transacDetails?.reason}
                </td>
              </tr>
              <tr className="">
                <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                  Amount:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 font-medium">
                  <NumericFormat
                    value={transacDetails?.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
              </tr>
              <tr className="">
                <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                  Balance Before:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 font-medium ">
                  <NumericFormat
                    value={transacDetails?.balance_before}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
              </tr>
              <tr className="">
                <th className="text-[14px] pb-[20px] text-[#667185] leading-[20px] font-medium text-left ">
                  Balace After:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 font-medium ">
                  <NumericFormat
                    value={transacDetails?.balance_after}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </td>
              </tr>
              <tr>
                <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                  Transaction Type:
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
              {transacDetails?.fee && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Fee:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                      {transacDetails?.fee}
                    </p>
                  </td>
                </tr>
              )}
              {/* {transacDetails?.channel && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Channel:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                      {transacDetails?.channel}
                    </p>
                  </td>
                </tr>
              )} */}

              {/* {transacDetails?.beneficiary && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Beneficiary:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                      {JSON.stringify(transacDetails?.beneficiary)}
                    </p>
                  </td>
                </tr>
              )} */}

              {transacDetails?.remark && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Remark:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                      {transacDetails?.remark}
                    </p>
                  </td>
                </tr>
              )}

              {/* {transacDetails?.meta && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Meta:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] font-medium text-left ">
                      {JSON.stringify(transacDetails?.meta)}
                    </p>
                  </td>
                </tr>
              )}
              {transacDetails?.webhook && (
                <tr>
                  <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                    Webhook:
                  </th>
                  <td className="pb-[20px] pl-4 md:pl-6 ">
                    <p className=" text-[14px]  text-[#000] leading-[20px] max-w-[200px] font-medium text-left ">
                      {JSON.stringify(transacDetails?.webhook)}
                    </p>
                  </td>
                </tr>
              )} */}

              <tr>
                <th className="pb-5 text-[14px] text-[#667185] leading-[20px] font-medium text-left ">
                  Status:
                </th>
                <td className="pb-[20px] pl-4 md:pl-6 ">
                  <button
                    className={`rounded-[8px]  flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px] ${
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
        </div>
      </ModalLeft>
    </div>
  );
};

export default Transactions;
