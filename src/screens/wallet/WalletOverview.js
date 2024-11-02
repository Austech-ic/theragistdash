import {
  Add,
  ArrowDown,
  ArrowDown2,
  ArrowRight2,
  Bank,
  Chart,
  Copy,
  EmptyWalletTime,
  Eye,
  EyeSlash,
  RecordCircle,
  SearchNormal1,
  Send2,
  Sms,
  TickCircle,
  TransmitSquare,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import {
  decryptaValue,
  decryptValue,
  formatDateToText,
} from "../../utils/helperFunctions";
import { NumericFormat } from "react-number-format";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import RecentTransaction from "../../components/wallet/RecentTransaction";
import OtpModal from "../../components/wallet/OtpModal";
import CreatePin from "../../components/wallet/CreatePin";
import PinModal from "../../components/wallet/PinModal";
import { setPin } from "../../api/apicalls";
import PreviewModal from "../../components/wallet/PreviewModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export const options = {
  responsive: true,
  maintainAspectRatio: true,
  width: "100%",
  plugins: {
    // legend: {
    //   position: 'top',
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

export const pieData = {
  labels: ["Credits", "Debits"],
  datasets: [
    {
      label: "Number of Task",
      data: [5, 8],
      backgroundColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
      borderColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
      borderWidth: 1,
      borderJoinStyle: "round",
      spacing: 1,
      borderRadius: 2,
    },
  ],
};

const WalletOverdiv = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [isTransferOthers, setIsTransferOthers] = useState(false);
  const [bankName, setBankName] = useState("");
  const [banksVisible, setBanksVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("");

  const [accountName, setAccountName] = useState("");
  const [toKyc, setToKyc] = useState("");
  const [toBvn, setToBvn] = useState("");
  const [toSession, setToSession] = useState("");
  const [toClient, setToClient] = useState("");
  const [transferPhase, setTransferPhase] = useState(1);
  const [otp, setOtp] = useState("");
  const [isCreatePin, setIsCreatePin] = useState(false);
  const [naration, setNaration] = useState("");
  const [purpose, setPurpose] = useState("");

  const [pin, setPin] = useState("");

  const isPin = false;

  useEffect(() => {
    if (isPin) {
      setIsCreatePin(true);
    }
  }, []);

  const closeTransferOthers = () => {
    setIsTransferOthers(false);
    setTransferPhase(1);
    clearForm()
  };
  const openTransferOthers = () => {
    setIsTransferOthers(true);
  };
  const hideMyBalance = () => {
    setHideBalance(!hideBalance);
  };
  async function getBanks(page) {
    const response = await api.getBanks({ params: { page } });
    return response;
  }

  const BankQuery = useQuery(["bank"], () => getBanks(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  let Bankss = BankQuery?.data;
  const [filteredData, setFilteredData] = useState(Bankss || []);
  useEffect(() => {
    setFilteredData(BankQuery.data);
  }, [BankQuery.data]);

  const handleSearch = (query) => {
    const filteredbanks = BankQuery.data.filter((bank) =>
      bank.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredbanks);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (text) => {
    console.log(accountNumber);
    if (accountNumber !== "" && selectedBank == "") {
      // Show an error message or do something else here
      enqueueSnackbar("Please Select a bank", { variant: "error" });

      return;
    }

    if (text.length == 10) {
      // Search from the API here, using the input text as the search query
      // searchAPI(text);

      verifyAccount();
    }
  };

  useEffect(() => {
    handleChange(accountNumber);
  }, [accountNumber]);

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setBanksVisible(false);
  };
  const verifyAccount = async () => {
    setNameLoading(true);
    try {
      const response = await api.verifyAccountNunmber({
        account_number: accountNumber,
        account_bank: selectedBank?.code,
      });
      console.log(
        "response of account verification==>>>>>",
        decryptaValue(response?.data)
      );
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      console.log("dddd", decryptRes?.status);
      if (decryptRes.status === "error") {
        // setAccountName(response.data.name)
        setAccountName("");

        enqueueSnackbar(decryptRes.message, { variant: "error" });
      }
      if (decryptRes.status === "success") {
        enqueueSnackbar(decryptRes.message, { variant: "success" });

        setAccountName(decryptRes.data.name);
        setToBvn(decryptRes.data.bvn);
        setToKyc(decryptRes.data.status);
        setToSession(decryptRes.data.account.id);
        setToClient(decryptRes.data.clientId);
      }
      setNameLoading(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      setAccountName("");

      setNameLoading(false);
    }
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await api.sendOtp({
        event: "transfer",
      });
      console.log("response of send otp==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      console.log("response of send otp==>>>>>", decryptRes?.status);

      if (decryptRes.status === true) {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
        setTransferPhase(2);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const handleOtp = () => {
    setTransferPhase(3);
  };
  const handlePin = () => {
    setTransferPhase(4);
  };
  function clearForm(){
    setAccountNumber("");
    setAccountName("");
    setToKyc("");
    setToBvn("");
    setToSession("");
    setToClient("");
    setNaration("");
    setPurpose("");
    setAmount("");
    setOtp("");
    setPin("");
    setTransferPhase(1);
    setSelectedBank(null)
  }

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      const response = await api.initiateTransfer({
        amount: amount,
        name: accountName,
        naration: naration,
        category: purpose,
        account_number: accountNumber,
        bank: selectedBank?.name,
        bank_code: selectedBank?.code,
        otp: otp,
        pin: pin,
        toKyc,
        toSession,
        toBvn,
      });
      console.log("response of transfer==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      console.log("response of transfer==>>>>>", decryptRes?.status);

      if (decryptRes.status === true) {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
        setTransferPhase(1);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      {setIsCreatePin && (
        <CreatePin isCreatePin={isCreatePin} setIsCreatePin={setIsCreatePin} />
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] mt-5 ">
        <li>
          <div className="rounded-[12px] px-[16px] pt-4 pb-6 bg-[#26ae5f] ">
            <div className="flex-between">
              <div className="flex-item gap-2">
                <div className="py-[5px] text-[12px] px-[10px] flex cursor-pointer bg-white rounded-[48px] w-[90px]  gap-[8px] banks-center ">
                  <img
                    src="/assets/ng.png"
                    className="h-[13px] w-[13px]"
                    alt="flag ng"
                  />
                  <p>NGN</p>
                  <ArrowDown2 variant="Bold" size={20} />
                </div>
                <button onClick={hideMyBalance}>
                  {hideBalance ? (
                    <Eye color="#fff" variant="Linear" size={14} />
                  ) : (
                    <EyeSlash color="#fff" variant="Linear" size={14} />
                  )}
                </button>
              </div>
              <p className="text-[#fff]  font-medium  text-[12px] leading-[14px]  tracking-[0.2px]   ">
                {formatDateToText(new Date())}
              </p>
            </div>

            <div className="flex-between mt-6">
              <div>
                {/* {userQuery.isLoading || hideBalance ? ( */}
                {hideBalance ? (
                  <p className="text-[#fff]  font-semibold  text-[16px] leading-[19px]  tracking-[0.2px]   ">
                    {"₦"} *****
                  </p>
                ) : (
                  <NumericFormat
                    value={200000}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={(value) => (
                      <p className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                        {value}
                      </p>
                    )}
                  />
                )}
              </div>
              <button
                // onPress={() => selectedCard.add()}
                className="px-2 py-1 bg-white"
                style={{
                  borderRadius: 40,
                  flexDirection: "row",
                  alignbanks: "center",
                }}
              >
                <p className="text-[#272F35]  font-normal  text-[10px] leading-[14px]  tracking-[0.2px]   ">
                  Add Money
                </p>
              </button>
            </div>
          </div>

          <div className=" bg-[#1B2026] relative   rounded-[12px]  px-[16px] pb-[14px] pt-[24px] -mt-[16px]   ">
            <p className="text-[#fff]  font-medium  text-[12px] leading-[14px]  tracking-[0.2px]  mb-[8px]  ">
              {/* {userQuery?.data?.account_numbers[0]?.bank} */}
              VFD Bank
            </p>
            <div
              style={{
                flexDirection: "row",
                alignbanks: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="text-[#fff]  font-semibold  text-[14px] leading-[17px]  tracking-[0.2px]    ">
                {/* {userQuery?.data?.account_numbers[0]?.account_number} */}
                983645446637
              </p>
              <button
                //   onPress={() =>
                //     copyKeyToClipboard(
                //       userQuery?.data?.account_numbers[0]?.account_number
                //     )
                //   }
                className="absolute top-[12px] right-[16px]"
              >
                <p className="text-[#3B6896] font-semibold font-i_medium text-[10px] leading-[9.68px]  ">
                  {/* {copySuccess ===
                        userQuery?.data?.account_numbers[0]?.account_number ? (
                          "Copied!"
                        ) : (
                          <Copy size={20} variant="Bold" color="#fff" />
                        )} */}
                  <Copy size={20} variant="Bold" color="#fff" />
                </p>
              </button>
            </div>
            <p className="text-[#fff]  font-normal font-i_normal text-[12px] leading-[14px]  tracking-[0.2px] ">
              {/* {userQuery?.data?.account_numbers[0]?.account_name} */}
              Ogundele Caleb
            </p>
          </div>
        </li>

        <li className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] bg-[#fefefe] shadow p-2 md:p-4">
          <button
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                           bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
            <Add color="#4CAF50" size={20} /> <p>Top Up Wallet </p>
          </button>{" "}
          <button
            onClick={openTransferOthers}
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
            <Send2 color="#4CAF50" size={20} /> <p>Transfer to other banks </p>
          </button>{" "}
          <button
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
            <Send2 color="#4CAF50" size={20} /> <p>Transfer to Vant Tag </p>
          </button>{" "}
        </li>
        <li className="rounded-lg relative overflow-hidden border-[0.8px] bg-[#fefefe]  border-[#E4E7EC] shadow p-2 md:p-4 h-[215px]">
          <Chart
            size="184"
            color="#E4E2DFA0"
            className="absolute bottom-0 -z-10"
          />
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    pointStyle: "rect",
                    usePointStyle: true,
                    // fullSize: false,
                    // pointStyleWidth: 10,
                    font: {
                      size: 10,
                    },
                  },
                },
              },
            }}
          />
        </li>
      </ul>

      <Modal
        isCentered
        isOpen={isTransferOthers}
        onClose={closeTransferOthers}
        size="xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          {transferPhase === 1 && (
            <>
              {" "}
              <ModalHeader
                py="4"
                color="#000000"
                className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
              >
                Transfer Money
              </ModalHeader>
              <ModalCloseButton size={"sm"} />
              <Divider color="#98A2B3" />
              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "16px", md: "24px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
              >
                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Amount(#)
                  </label>
                  <div className=" relative    flex banks-center">
                    <input
                      type="text"
                      placeholder="2,000"
                      className="w-full h-[48px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      name="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Bank
                  </label>
                  <button
                    onClick={() => setBanksVisible(!banksVisible)}
                    className="w-full h-[48px] pl-[24px] pr-[8px] flex-between py-[12px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  >
                    <div className="flex-row banks-center">
                      {selectedBank ? (
                        <p className="text-[#272F35] font-normal font-i_normal text-[12px] leading-[15px] tracking-[0.028px] ">
                          {selectedBank?.name}
                        </p>
                      ) : (
                        <p className="text-[#838383] font-normal font-i_normal text-[12px] leading-[15px]  tracking-[0.028px] ">
                          {"Select a Bank"}
                        </p>
                      )}
                    </div>
                    <ArrowDown2 variant="Linear" color={"#838383"} size={14} />
                  </button>
                  {banksVisible && (
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
                      className="w-full h-[300px] overflow-y-auto  px-2 py-3 text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                    >
                      <div className=" relative  w-full mx-auto mb-2  flex items-center">
                        <SearchNormal1
                          size="14"
                          color="#98A2B3"
                          className="absolute left-[16px]"
                        />

                        <input
                          type="email"
                          placeholder="search bank"
                          className="w-full  h-[36px] pl-[44px] py-[12px] text-[14px] text-[#344054]  bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                          required
                          autoComplete="on"
                          name="email"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                          }}
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                      {filteredData &&
                        filteredData?.map((bank, index) => (
                          <button
                            // onPress={() => {
                            //   ToggleBottomdiv(),
                            //     setBank(bank.code),
                            //     setBankName(bank.name),
                            //     setAccountName(""),
                            //     setAccountNumber("");
                            // }}

                            onClick={() => handleSelectBank(bank)}
                            className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                            style={{
                              borderColor: "rgba(18, 3, 58, 0.10)",
                              borderWidth: 0.2,
                            }}
                          >
                            <div className="flex-item">
                              {bank.logo ? (
                                <img
                                  src={bank?.logo}
                                  alt=""
                                  style={{ height: 24, width: 24 }}
                                  className="mr-3 rounded-full"
                                />
                              ) : (
                                <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3 ">
                                  <Bank
                                    size="14"
                                    color="#BAB4B2FF"
                                    variant="Bold"
                                  />
                                </div>
                              )}
                              <p className="text-[#272F35] flex-1 font- font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                                {bank?.name}
                              </p>
                            </div>

                            {selectedBank?.code === bank?.code ? (
                              <RecordCircle
                                size="16"
                                color="#26ae5f"
                                variant="Bold"
                              />
                            ) : (
                              <RecordCircle
                                size="16"
                                color="#DEDEDE"
                                variant="Bold"
                              />
                            )}
                          </button>
                        ))}
                    </m.div>
                  )}

                  <div className="my-[18px]">
                    <label className="text-[14px] text-[#667185]    mb-[8px] ">
                      Account Number
                    </label>
                    <div className=" relative    flex banks-center">
                      <input
                        type="text"
                        placeholder="0002-XXXX-XX"
                        className="w-full h-[48px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                        name="accountNumber"
                        id="full-name"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  {nameLoading && (
                    <div className="mt-2 ml-2">
                      {" "}
                      <ClipLoader color={"green"} size={16} />
                    </div>
                  )}
                </div>

                {accountName && (
                  <div className="mb-5 p-[12px] rounded-[8px] bg-[#EDF7EE] text-[#4CAF50] flex-item ">
                    <TickCircle color="#4CAF50" variant="Bold" size={16} />
                    <p className="text-[#4CAF50] ml-2 font-normal font-i_normal text-[14px] leading-[15px]   tracking-[0.028px] ">
                      {accountName}
                    </p>
                  </div>
                )}
                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Transfer Purpose
                  </label>
                  <div className=" relative  flex banks-center">
                    <select
                      type="text"
                      placeholder="Name"
                      className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      name="full-name"
                      id="full-name"
                      value={purpose}
                      //value=""
                      onChange={(e) => {
                        setPurpose(e.target.value);
                      }}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    >
                      <option value="">Select Purpose</option>
                      <option value="Monthly Payslip">Utilities</option>
                    </select>
                  </div>
                </div>
                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185] leading-[14px]   mb-[8px] ">
                    Naration
                  </label>
                  <div className=" relative  flex banks-center">
                    <textarea
                      type="text"
                      placeholder="description..."
                      className="w-full h-[120px] p-2 text-[14px] text-[#344054] leading-[16px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                      name="full-name"
                      id="full-name"
                      //value=""
                      //onChange={() => {}}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter gap={"16px"}>
                <button onClick={closeTransferOthers} className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
                  Cancel
                </button>
                <button
                  onClick={sendOtp}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Send </>
                  )}
                </button>
              </ModalFooter>
            </>
          )}
          {transferPhase === 2 && (
            <>
              <OtpModal
                isLoading={isLoading}
                otp={otp}
                setOtp={setOtp}
                handleOtp={handleOtp}
                onClose={closeTransferOthers}
              />
            </>
          )}
          {transferPhase === 3 && (
            <>
              <PinModal
                isLoading={isLoading}
                pin={pin}
                setPin={setPin}
                handlePin={handlePin}
                onClose={closeTransferOthers}

              />
            </>
          )}
          {transferPhase === 4 && (
            <>
              <PreviewModal
                isLoading={isLoading}
                accountNumber={accountNumber}
                name={accountName}
                purpose={purpose}
                naration={naration}
                handleTransfer={handleTransfer}
                handleClose={closeTransferOthers}
                bank={selectedBank?.name}
                amount={amount}
                onClose={closeTransferOthers}

              />
            </>
          )}
        </ModalContent>
      </Modal>

      <RecentTransaction />
    </div>
  );
};

export default WalletOverdiv;
