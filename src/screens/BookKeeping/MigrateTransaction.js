import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Convertshape2,
  DocumentUpload,
  SearchNormal1,
  TransmitSqaure2,
} from "iconsax-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import EmptyTable from "../../components/EmptyTable";
import TableLoading from "../../components/TableLoading";
import DatePicker from "react-datepicker";
import api from "../../api";
import { decryptaValue, truncateSentence } from "../../utils/helperFunctions";
import { ClipLoader } from "react-spinners";
import { enqueueSnackbar } from "notistack";
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const MigrateTransaction = () => {
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [reason, setReason] = useState("");
  const [page, setPage] = useState(1);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [type, setType] = useState(null);
  const [reference, setReference] = useState("");
  const [checkedState, setCheckedState] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMigrate, setIsMigrate] = useState(false)

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
      "transaction",
      page,
      reference,
      startdate,
      enddate,
      status,
      currency,
      type,
      reason,
    ],
    () => getTransaction(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const transactionData = results?.data?.data || [];
  useEffect(() => {
    if (transactionData)
      setCheckedState(Array(transactionData?.length).fill(false));
  }, []);
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

  // Function to toggle IDs when a checkbox is checked/unchecked
  const toggleRowSelection = (ids, index, isChecked) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, ids]); // Add all IDs from the row
    } else {
      setSelectedIds((prev) => prev.filter((id) => id !== ids)); // Remove all IDs from the row
    }

    setCheckedState((prev) => {
      const updatedState = [...prev];
      updatedState[index] = isChecked;
      return updatedState;
    });
  };
  console.log("Show", selectedIds);

  const handleSelect = () => {
    if (isSelectAll) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  // Function to select all rows
  const selectAll = () => {
    const allIds = transactionData?.flatMap((entry) => entry.id);
    setSelectedIds(allIds);
    setIsSelectAll(true);
    setCheckedState(Array(transactionData?.length).fill(true));
  };

  // Function to deselect all rows
  const deselectAll = () => {
    setSelectedIds([]);
    setIsSelectAll(false);

    setCheckedState(Array(transactionData?.length).fill(false));
  };

  const migrateTransaction = async () => {
    setIsLoading(true);
    try {
      const response = await api.migrateTransactions({
        transaction_ids: selectedIds,
        // "start_date": "2025-01-01",
        // "end_date": "2025-01-31"
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));

      enqueueSnackbar("Transaction(s) migrated successfully", { variant: "success" });
      setIsLoading(false);
      closeMigrate()
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };
  const openMigrate = ()=> {
    if(selectedIds <1 ) {
      enqueueSnackbar("Please select at least one transaction to migrate", { variant: "error" });
      return;
    }
    setIsMigrate(true);

  }

  const closeMigrate =()=> {
    setIsMigrate(false);
    // setSelectedIds([]);
    // setIsSelectAll(false);
    // setCheckedState(Array(transactionData?.length).fill(false));
  }
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
              onClick={()=> openMigrate()}
              className="border-[0.2px] px-2  border-[#98A2B3] gap-1  bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[7px] text-[12px] font-medium text-white hover:bg-opacity-80"
            >
              Migrate Transaction
              <TransmitSqaure2 size={16} color="white" />
            </button>
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
                      <input
                        type="checkbox"
                        className="h-[24px] accent-green-400 "
                        onChange={handleSelect}
                      />
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
                        Remark
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
                  </tr>
                </thead>
                <tbody>
                  {results?.isLoading && <TableLoading cols={8} />}
                  {results?.data && results?.data?.data?.length === 0 && (
                    <EmptyTable cols={8} />
                  )}

                  {results?.data &&
                    results?.data?.data?.map((result, index) => (
                      <tr key="index" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <input
                            type="checkbox"
                            className="h-[24px] accent-green-400 text-white "
                            checked={checkedState ? checkedState[index] : ""}
                            onChange={(e) =>
                              toggleRowSelection(
                                result?.id,
                                index,
                                e.target.checked
                              )
                            }
                          />
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
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {truncateSentence(result?.remark, 25)}
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
        isOpen={isMigrate}
        onClose={closeMigrate}
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
            <Convertshape2 size="32" color="#26ae5f" className="mx-auto" />
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium  ">
              Migrate Transaction(s)
            </p>

            <p className="text-[14px]  text-[#667185]  font-normal text-center mt-2  ">
              Are you sure you want to migrate this transaction(s) to book keeping
              entries
            </p>

            <p className="text-[14px]  text-[#667185]  font-normal text-center mt-2  ">
              Transactions: {selectedIds?.length}
            </p>
            <div>
              <button
                onClick={migrateTransaction}
                className="border-[0.2px] px-2 mt-4  mx-auto border-[#98A2B3] gap-1  bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[13px] font-medium text-white hover:bg-opacity-80"
              >
                Migrate Transaction
                <TransmitSqaure2 size={16} color="white" />
                {isLoading && <ClipLoader color={"white"} size={16} />}
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MigrateTransaction;
