import { useQuery } from "@tanstack/react-query";
import {
  Add,
  Arrow,
  ArrowDown2,
  BrifecaseCross,
  InfoCircle,
  ProfileCircle,
  RecordCircle,
  Refresh,
  SearchNormal1,
  Trash,
  Verify,
} from "iconsax-react";
import React, { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "react-tooltip";
import api from "../../../api";
import { motion as m } from "framer-motion";
import {
  decryptaValue,
  formatDate,
  formatDatewithYear,
  getCurrentDate,
  getFormattedCurrentDay,
  getTodayDate,
} from "../../../utils/helperFunctions";
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
import { UserContext } from "../../../utils/UserProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";
import { Package } from "lucide-react";
import PinModal from "../../../components/wallet/PinModal";
import OtpModal from "../../../components/wallet/OtpModal";
import Success from "../../../components/Success";
import EmptyList from "../../../components/EmptyList";

const BulkPayment = () => {
  const { profile } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProdQuery, setSearchProdQuery] = useState("");

  const navigate = useNavigate();
  const [transferPhase, setTransferPhase] = useState(1);
  const [isTransferBulk, setIsTransferBulk] = useState(false);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formValue, setFormValue] = useState({
    id: "",
    title: "",
    bankName: "",
    accountNumber: "",
    amount: 0,
    narration: "",
    bankCode: "",
    name: "",
    verified: "pending",
    toKyc: "",
    toSession: "",
    toBvn: "",
    toClient: "",
    updated_at: "",
    verifying: false,
  });

  const closeTransferBulk = () => {
    setIsTransferBulk(false);
    clearForm();
  };
  function openTransferBulk() {
    setIsTransferBulk(true);
  }
  const closeIsSuccess = () => {
    setIsSuccess(false);
  };


  const [isRotating, setIsRotating] = useState(false);

  const refreshRate = () => {
    setIsRotating(true);
 ProfileQuery.refetch();

    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // Match this with animation duration
  };

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const [items, setItems] = useState([]);

  const handleInputChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  async function getProfile(page) {
    const response = await api.getProfile({ params: { page } });
    return response;
  }

  const ProfileQuery = useQuery(["profile"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = ProfileQuery?.data || [];


  const addBeneficiaryItem = (data) => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const newItem = {
      id,
      name: data?.name || "",
      bankName: data?.bank || "",
      accountNumber: data?.account_number || "",
      bankCode: data?.bank_code || "",
      amount: "",
      narration: "",
      verified: "pending",
      toKyc: "",
      toSession: "",
      toBvn: "",
      toClient: "",
      updated_at: "",
      verifying: false,
    };

    setItems((prevItems) => {
      if (!prevItems || prevItems.length === 0 || prevItems[0]?.name === "") {
        return [newItem];
      }
      return [...prevItems, newItem];
    });

    if (data?.account_number && data?.bank_code) {
      setTimeout(() => {
        verifyAccount(data.account_number, data.bank_code, id);
      }, 1000);
    }
  };

  async function getBeneficiary() {
    const response = await api.getBeneficiary();
    return response;
  }

  const results = useQuery(["getBeneficiaries"], () => getBeneficiary(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  let Beneficiary = results?.data?.data;
  const [filteredBeneficiaryData, setFiltereProductdData] = useState(
    Beneficiary || []
  );
  useEffect(() => {
    setFiltereProductdData(results.data?.data);
  }, [results.data]);

  const handleSearchProduct = (query) => {
    const filtereBeneficiary = results?.data?.data?.filter((cust) =>
      cust?.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltereProductdData(filtereBeneficiary);
  };

  const onDeleteItemHandler = (index) => {
    let allItem = [...items];
    let eachItem = allItem[index];
    let amount = eachItem.amnt;
    allItem.splice(index, 1);
    setItems(allItem);
  };

  

  const verifyAccount = async (accountNumber, selectedBankCode, id) => {
    if (!accountNumber || !selectedBankCode) {
      enqueueSnackbar("Please Select a bank 😞", { variant: "error" });
      return;
    }

    // Update verifying status in a single state update
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, verifying: true } : item
      )
    );

    try {
      const response = await api.verifyAccountNunmber({
        account_number: accountNumber,
        account_bank: selectedBankCode,
      });

      const decryptRes = JSON.parse(decryptaValue(response?.data));

      // Batch all state updates together
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            if (decryptRes.status === "success") {
              return {
                ...item,
                verifying: false,
                name: decryptRes.data.name,
                toKyc: decryptRes.data.status,
                toSession: decryptRes.data.account.id,
                toBvn: decryptRes.data.bvn,
                toClient: decryptRes.data.clientId,
                verified: true,
              };
            } else {
              return {
                ...item,
                verifying: false,
                verified: false,
              };
            }
          }
          return item;
        })
      );

      // Show appropriate message
      if (decryptRes.status === "error") {
        enqueueSnackbar(decryptRes.message, { variant: "error" });
      } else if (decryptRes.status === "success") {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, verifying: false, verified: false } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    if (!items || items.length === 0) return 0;

    return items
      .filter((item) => item?.verified === true)
      .reduce((sum, item) => {
        // First convert empty string to 0
        let amount = item?.amount === "" ? 0 : item?.amount;
        amount = !amount ? 0 : parseFloat(amount);
        return sum + amount;
      }, 0);
  };

  const allAmountGreaterThan100 = items
    .filter((item) => item?.verified === true)
    .every((item) => parseFloat(item?.amount) > 100);
  const allObjectVerified = items
    .filter((item) => item?.verified === true)
    .every((item) => item?.verified === true);

  const sendOtp = async () => {
    if (!allAmountGreaterThan100) {
      enqueueSnackbar("one or more amount is less than ₦100", {
        variant: "error",
      });
      return;
    }

    if (!allObjectVerified) {
      enqueueSnackbar("one or more account is not verified", {
        variant: "error",
      });
      return;
    }

    if (calculateTotal() > profileData?.default_partner?.wallet_balance) {
        enqueueSnackbar("You do not have enough wallet balance", {
          variant: "error",
        });
        return;
      }

    setIsLoading(true);
    openTransferBulk();
    try {
      const response = await api.sendOtp({
        event: "transfer",
      });
      //console.log("response of send otp==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("response of send otp==>>>>>", decryptRes?.status);

      if (decryptRes.status === true) {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
      }
      setIsLoading(false);
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };
  function clearForm() {
    setOtp("");
    setPin("");
    setTransferPhase(1);
  }

  const handleOtp = () => {
    if (!otp || otp?.length < 6) {
      enqueueSnackbar("Please input otp received via email😞", {
        variant: "error",
      });

      return;
    }
    setTransferPhase(2);
  };
  const handlePin = () => {
    if (!pin || pin.length < 4) {
      enqueueSnackbar("Please input a valid pin😞", { variant: "error" });

      return;
    }
    setTransferPhase(3);
  };

  const TotalVerifiedBeneficiaries = items.filter(
    (item) => item?.verified === true
  ).length;

  const handleBulkTransfer = async () => {
    setIsLoading(true);

    const filteredTransferItems = items.map(
      ({ id, verified, verifying, ...rest }) => rest
    );

    try {
      const response = await api.bulkTransfer({
        transfers: filteredTransferItems?.map((item) => {
          return {
            toSession: item.toSession,
            amount: item.amount,
            name: item.name,
            account_number: item.accountNumber,
            bank: item.bankName,
            bank_code: item.bankCode,
            narration: item?.narration,
            category: "Bulk Payment",
            toKyc: item?.toKyc,
            toBvn:item?.toBvn,
            toClient: item?.toClient,

          };
        }),

        otp: otp,
        pin: pin,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));

        enqueueSnackbar(decryptRes.message, { variant: "success" });
        closeTransferBulk();
        setIsSuccess(true);
        ProfileQuery.refetch();
      
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:px-[20px] md:pb-[20px] md:pt-[12px] bg-[#F2F2F2] min-h-screen ">
      <div className="flex flex-col md:flex-row gap-3 ">
        <div className="w-full  md:w-[60%] xl:w-[65%]  bg-white  pt-4 pb-7 px-[10px] md:p-4 md:pb-7 rounded-lg border  ">
          <div>
            {" "}
            <h2 className="text-[#000] text-[18px] md:text-[20px]  font-semibold mb-[1px]  ">
              Bulk Transfer Payout
            </h2>
          </div>

          <div className="mb-4 ">
            <ul className=" grid grid-cols-1 ">
              <li className="py-2 md:py-3 ">
                <div className="flex flex-row md:flex-col items-center md:items-start gap-[3px]  mb-2">
                  <h2 className="text-[#000] text-[13px] md:text-[16px]   font-medium   ">
                    Issue date:
                  </h2>
                  <p className="text-[#667185] text-[12px]  md:text-[14px]  font-normal  ">
                    {formatDatewithYear()}
                  </p>
                </div>
              </li>
              <li className="p-2 md:p-3   rounded-lg shadow bg-[#26ae5f]">
                <h2 className="text-[#fff]  text-[14px]  md:text-[16px]   font-medium mb-[2px]  ">
                  Naira Wallet Balance
                </h2>
                <div className="flex justify-between ">
                  <p className="text-[#fff]   text-[14px]  md:text-[16px]   font-medium  ">
                    <NumericFormat
                      value={profileData?.default_partner?.wallet_balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      renderText={(value) => (
                        <p className="text-[#fff]  text-[16px]   font-normal  ">
                          {value}
                        </p>
                      )}
                    />{" "}
                  </p>
                  <button
                    onClick={refreshRate}
                    className={`  rounded-full hover:text-gray-100 transition-all duration-200
                                ${isRotating ? "animate-spin" : ""}`}
                    aria-label="Refresh"
                  >
                    <Refresh className="w-4 h-4 text-white" />
                  </button>
                </div>
              </li>
              <li className="py-2 md:py-3  border-[#98a2b3]">
                <h2 className="text-[#000]  text-[14px]  md:text-[16px]  font-medium mb-[2px]  ">
                  From:{" "}
                  <span className="text-[#667185]  text-[14px]  md:text-[16px]   font-medium  ">
                    {profile?.name}
                  </span>
                </h2>
              </li>
            </ul>
          </div>
          <div className="overflow-auto">
            {items.length < 1 ? (
              <div className="h-[120px] border text-[#667185] mb-4  hover:bg-gray-50  rounded-lg border-dashed border-spacing-2 flex flex-col justify-center items-center ">
                <BrifecaseCross size={14} />

                <p className="text-[12px]">No Beneficiary</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="border p-2 md:p-3 rounded-lg bg-gray-50  relative mb-3"
                >
                  <Trash
                    size={14}
                    onClick={() => onDeleteItemHandler(index)}
                    color="red"
                    className="cursor-pointer right-2 absolute top-2  "
                  />
                  <div className="absolute top-2 right-7">
                    {item?.verifying && (
                      <p className="text-[#26ae5f] text-[12px] animate-pulse">
                        {" "}
                        <ClipLoader color={"#26ae5f"} size={12} />
                        Verifying.....
                      </p>
                    )}
                  </div>
                  <div className="absolute top-2 right-7">
                    {item?.verified === true ? (
                      <Verify color="#26ae5f" variant="Bold" size={14} />
                    ) : item?.verified === false ? (
                      <InfoCircle color="red" variant="Bold" size={14} />
                    ) : (
                      ""
                    )}
                  </div>

                  <h2 className="text-[#000]  text-[12px]  md:text-[14px]  font-medium mb-[2px]  ">
                    Account Name:{" "}
                    <span className="text-[#667185]  ">{item?.name}</span>
                  </h2>

                  <h2 className="text-[#000]  text-[12px]  md:text-[14px]  font-medium mb-[2px]  ">
                    Bank Name:{" "}
                    <span className="text-[#667185]  ">{item?.bankName}</span>
                  </h2>
                  <div className="flex flex-col md:flex-row gap-[2px] md:items-center md:justify-between">
                    <h2 className="text-[#000]  text-[12px]  md:text-[14px]  font-medium mb-[2px]  ">
                      Account Number:{" "}
                      <span className="text-[#667185]  ">
                        {item?.accountNumber}
                      </span>
                    </h2>
                    <div className="flex items-center gap-1">
                      <label className="text-[14px] text-[#000]  ">
                        Amount(#):
                      </label>
                      <div className="">
                        <input
                          type="text"
                          placeholder="2000"
                          className="w-full h-[32px] pl-[6px] pr-[8px] py-[6px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                          name="amount"
                          onChange={(e) =>
                            handleInputChange(item.id, "amount", e.target.value)
                          }
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <label className="text-[14px] text-[#353536]  font-medium   mb-[8px] md:mb-[10px]">
                      Narration:
                    </label>
                    <div className=" relative  flex items-center">
                      <textarea
                        type="text"
                        placeholder=""
                        className="w-full h-[80px] p-[6px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                        name="narration"
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "narration",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <m.div
              initial={{ y: 10, opacity: 0.4 }}
              animate={{
                y: 0,
                opacity: 1,
                // scale: 1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="w-full h-[300px] overflow-y-auto  px-2 py-3 text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
            >
              <p className="mb-2 text-center font-medium">
                Select Beneficiaries
              </p>
              <div className=" relative  w-full mx-auto mb-2  flex items-center">
                <SearchNormal1
                  size="14"
                  color="#98A2B3"
                  className="absolute left-[16px]"
                />

                <input
                  type="text"
                  placeholder="search by name"
                  className="w-full  h-[36px] pl-[44px] py-[12px] text-[14px] text-[#344054]  bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                  required
                  autoComplete="on"
                  name=""
                  value={searchProdQuery}
                  onChange={(e) => {
                    setSearchProdQuery(e.target.value);
                    handleSearchProduct(e.target.value);
                  }}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              {filteredBeneficiaryData?.length < 1 ? (<EmptyList title="Beneficiary" action={()=> navigate("/beneficiaries")} />) :
              
              
              
              filteredBeneficiaryData &&
                filteredBeneficiaryData?.map((Beneficiary, index) => (
                  <button
                    onClick={() => addBeneficiaryItem(Beneficiary)}
                    className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                    style={{
                      borderColor: "rgba(18, 3, 58, 0.10)",
                      borderWidth: 0.2,
                    }}
                  >
                    <p className="text-[#272F35]   font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                      {Beneficiary?.name}
                    </p>
                    <p className="text-[#272F35] flex-1 font- font-i_medium text-right text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                      {Beneficiary?.account_number}
                    </p>
                  </button>
                )) }
            </m.div>
          </div>

          {/* <button
            className="text-md mx-auto text-[#fff] px-3 py-1 hover:-translate-y-1 rounded-md shadow-md  bg-[#26ae5f] flex-item gap-1 mt-4 text-[14px]"
            onClick={addItem}
          >
            {" "}
            <Add variant="Linear" color="#fff" size="16" />
            Add New Item
          </button> */}
        </div>
        <div className="w-full md:min-h-[100vh]  overflow-auto md:w-[40%] xl:w-[35%] flex flex-col gap-5">
          <div className=" w-full bg-white p-3  rounded-lg border-[0.2px] border-[#98a2b3] ">
            <h2 className="text-[#000] text-[18px] md:text-[20px] font-semibold mb-[2px] text-center  ">
              Review
            </h2>

            <div className="mt-6">
              {items.length < 1 ? (
                <div className="h-[120px] border text-[#667185] mb-4  hover:bg-gray-50  rounded-lg border-dashed border-spacing-2 flex flex-col justify-center items-center ">
                  <BrifecaseCross size={14} />

                  <p className="text-[12px]">No Verified Beneficiary</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[#000]  text-[12px]  md:text-[14px]  font-medium mb-[10px]   ">
                    Total Beneficiaries:{" "}
                    <span className="text-[#667185]  ">
                      {items.filter((item) => item?.verified === true).length}
                    </span>
                  </h2>

                  {items
                    .filter((item) => item?.verified === true)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="border p-[6px] md:p-2 rounded-lg bg-gray-50  relative mb-3"
                      >
                        <Trash
                          size={14}
                          onClick={() => onDeleteItemHandler(index)}
                          color="red"
                          className="cursor-pointer right-2 absolute top-2  "
                        />

                        <div className="absolute top-2 right-7">
                          {item?.verified === true ? (
                            <Verify color="#26ae5f" variant="Bold" size={14} />
                          ) : item?.verified === false ? (
                            <InfoCircle color="red" variant="Bold" size={14} />
                          ) : (
                            ""
                          )}
                        </div>

                        <h2 className="text-[#000]  text-[12px]    font-medium mb-[2px]  ">
                          Account Name:{" "}
                          <span className="text-[#667185]  ">{item?.name}</span>
                        </h2>

                        <h2 className="text-[#000]  text-[12px]    font-medium mb-[2px]  ">
                          Bank Name:{" "}
                          <span className="text-[#667185]  ">
                            {item?.bankName}
                          </span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-[2px] md:items-center md:justify-between">
                          <h2 className="text-[#000]  text-[12px]    font-medium mb-[2px]  ">
                            Account Number:{" "}
                            <span className="text-[#667185]  ">
                              {item?.accountNumber}
                            </span>
                          </h2>
                          <div className="flex items-center  text-[12px] text-[#000]  gap-1">
                            <label className=" ">Amount(#):</label>
                            <div className="text-[#667185] ">
                              <NumericFormat
                                value={item?.amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <h2 className="text-[#000]  text-[12px]  font-medium mb-[2px]  ">
                            Narration:{" "}
                            <span className="text-[#667185]  ">
                              {item?.narration}
                            </span>
                          </h2>
                        </div>
                      </div>
                    ))}

                  <h2 className="text-[#000]  text-[12px]  md:text-[14px]  font-medium mb-[10px]   ">
                    Total Payout Amount:{" "}
                    <span className="text-[#667185]  ">
                      <NumericFormat
                        value={calculateTotal()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </span>
                  </h2>
                </div>
              )}
            </div>
          </div>

          <div className="border  border-[#98a2b3] my-3" />

          <div className="flex-between mb-5 ">
            <button className="px-4 py-2  text-[14px] rounded-lg border-[0.2px]  border-[#98a2b3] text-md bg-slate-100">
              Cancel
            </button>
            <button
              onClick={sendOtp}
              className="px-4 py-2 text-[14px] rounded-lg text-white bg-[#26ae5f] flex items-center justify-center text-md "
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Submit</>
              )}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isTransferBulk}
        onClose={closeTransferBulk}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          {transferPhase === 1 && (
            <>
              <OtpModal
                isLoading={isLoading}
                otp={otp}
                setOtp={setOtp}
                handleOtp={handleOtp}
                onClose={closeTransferBulk}
              />
            </>
          )}
          {transferPhase === 2 && (
            <>
              <PinModal
                isLoading={isLoading}
                pin={pin}
                setPin={setPin}
                handlePin={handlePin}
                onClose={closeTransferBulk}
              />
            </>
          )}
          {transferPhase === 3 && (
            <>
              <ModalContent>
                <ModalHeader
                  py="4"
                  color="#000000"
                  className="text-[18px]   font-medium leading-[24px] md:leading-[24px]"
                >
                  <Arrow size="36" variant="Bold" color="#26ae5f" className="mx-auto text-center mt-6" />
                </ModalHeader>
                <ModalCloseButton size={"sm"} />
                <ModalBody
                  py={{ base: "20px", md: "24px" }}
                  px={{ base: "16px", md: "24px" }}
                  className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                >
                  <p className="text-[14px]  text-[#667185] leading-[20px] mb-2 font-normal text-center mt-2  ">
                    You are about to make a bulk payment to{" "}
                    {TotalVerifiedBeneficiaries} beneficiaries?
                  </p>

                  <div className="px-[10px] py-[18px] rounded-lg bg-slate-100 text-[#667185] w-[85%] mx-auto">
                    <div className="mx-auto">
                      {" "}
                      <NumericFormat
                        value={calculateTotal()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={(value) => (
                          <p className="text-[#667185] font-semibold font-i_medium text-[24px] leading-[26px] text-center  tracking-[0.2px]   ">
                            {value}
                          </p>
                        )}
                      />
                    </div>
                    <ul className="gap-[8px] flex flex-col mt-4">
                      <li className="flex-between ">
                        <p className="text-[14px] leading-[14px] ">
                          Total Beneficiaries:
                        </p>
                        <p className="text-[14px] leading-[14px] font-medium">
                          {TotalVerifiedBeneficiaries}
                        </p>
                      </li>
                      <li className="flex-between ">
                        <p className="text-[14px] leading-[14px] ">Date:</p>
                        <p className="text-[14px] leading-[14px] font-medium">
                          {getFormattedCurrentDay("short")}
                        </p>
                      </li>
                    </ul>
                  </div>
                </ModalBody>
                <ModalFooter gap={"16px"}>
                  <button
                    onClick={closeTransferBulk}
                    className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkTransfer}
                    className="border-[0.2px]  border-[#98A2B3] w-[109px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                  >
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Make Transfer </>
                    )}
                  </button>
                </ModalFooter>
              </ModalContent>
            </>
          )}
        </ModalContent>
      </Modal>
      <Success isSuccess={isSuccess} closeIsSuccess={closeIsSuccess} />

    </div>
  );
};

export default BulkPayment;
