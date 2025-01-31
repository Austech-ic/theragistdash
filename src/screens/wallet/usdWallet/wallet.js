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
  ShieldSlash,
  Refresh,
  ArrowSwapHorizontal,
  CardSend,
  GridEdit,
  Note,
  CardEdit,
  CardReceive,
  ProgrammingArrows,
} from "iconsax-react";
import React, { useEffect, useState, useCallback } from "react";
import {
  decryptaValue,
  formatDateToText,
  Categories,
  getExchangeRate,
} from "../../../utils/helperFunctions";
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
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import RecentTransaction from "../../../components/wallet/RecentTransaction";
import OtpModal from "../../../components/wallet/OtpModal";
import CreatePin from "../../../components/wallet/CreatePin";
import PinModal from "../../../components/wallet/PinModal";
import { setPin } from "../../../api/apicalls";
import PredivModal from "../../../components/wallet/PreviewModal";
import ComingSoon from "../../../components/ComingSoon";
import debounce from "lodash/debounce";
import Success from "../../../components/Success";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../../../components/InputField";

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

const UsdWallet = () => {
  const navigation = useNavigate();
  const [hideBalance, setHideBalance] = useState(false);
  const [isFundUSD, setIsFundUSD] = useState(false);

  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const [accountName, setAccountName] = useState("");
  const [toKyc, setToKyc] = useState("");
  const [toBvn, setToBvn] = useState("");
  const [toSession, setToSession] = useState("");
  const [toClient, setToClient] = useState("");
  const [fundPhase, setfundPhase] = useState(1);
  const [otp, setOtp] = useState("");
  const [isCreatePin, setIsCreatePin] = useState(false);
  const [naration, setNaration] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [copiedRef, setCopiedRef] = useState(null);
  const [tag, setTag] = useState("");
 
  const [isVantTagModal, setIsVantTagModal] = useState(false);
  const [withdrawUsdPhase, setwithdrawUsdPhase] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const refreshRate = () => {
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // Match this with animation duration
    exchangeRateQuery.refetch();
  };

  const getExchangeRates = async () => {
    const response = await api.exchangeRates();
    return response.data;
  };

  const exchangeRateQuery = useQuery(["exchange"], getExchangeRates, {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const exchangeData = exchangeRateQuery?.data;

  const rate = exchangeData && getExchangeRate("USD", exchangeData);

  const ClosewithdrawUsdModal = () => {
    setIsVantTagModal(!isVantTagModal);
    setwithdrawUsdPhase(1);
    clearForm();
  };

  // Function to copy text to the clipboard
  const handleCopy = async (transactionRef) => {
    try {
      await navigator.clipboard.writeText(transactionRef);
      setCopiedRef(transactionRef); // Set copied ref to show feedback
      setTimeout(() => setCopiedRef(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {
      //console.error("Failed to copy:", err);
    }
  };



  const [pin, setPin] = useState("");


  const closeFundUSD = () => {
    setIsFundUSD(false);
    setfundPhase(1);
    clearForm();
  };
  const closeIsSuccess = () => {
    setIsSuccess(false);
  };
  const openTransferOthers = () => {
    setIsFundUSD(true);
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


  const [isLoading, setIsLoading] = useState(false);

 






  const verifyAccount = async () => {
    if (accountNumber !== "" && !selectedBank) {
      // Show an error message or do something else here
      enqueueSnackbar("Please Select a bank 😞", { variant: "error" });

      return;
    }
    setNameLoading(true);
    try {
      const response = await api.verifyAccountNunmber({
        account_number: accountNumber,
        account_bank: selectedBank?.code,
      });
    
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("dddd", decryptRes?.status);
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
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      setAccountName("");

      setNameLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!amount) {
      enqueueSnackbar("Please input an amount 😞", { variant: "error" });

      return;
    }
    if(amount * rate?.buy_rate >
      profileData?.default_partner?.wallet_balance) {
        enqueueSnackbar("Insufficient funds", { variant: "error" });
        return;
      }

    setIsLoading(true);
    try {
      const response = await api.sendOtp({
        event: "dollar_funding",
      });
      //console.log("response of send otp==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("response of send otp==>>>>>", decryptRes?.status);

      if (decryptRes.status === true) {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
        setfundPhase(2);
        setwithdrawUsdPhase(2);
      }
      setIsLoading(false);
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const sendOtpWithdraw = async () => {
    if (!amount) {
      enqueueSnackbar("Please input an amount 😞", { variant: "error" });

      return;
    }
    if(amount  >
      profileData?.default_partner?.wallet_balance) {
        enqueueSnackbar("Insufficient funds", { variant: "error" });
        return;
      }
    setIsLoading(true);
    try {
      const response = await api.sendOtp({
        event: "dollar_withdraw",
      });
      //console.log("response of send otp==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("response of send otp==>>>>>", decryptRes?.status);

      if (decryptRes.status === true) {
        enqueueSnackbar(decryptRes.message, { variant: "success" });
        setfundPhase(2);
        setwithdrawUsdPhase(2);
      }
      setIsLoading(false);
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const handleOtp = () => {
    if (!otp || otp?.length < 6) {
      enqueueSnackbar("Please input otp received via email😞", {
        variant: "error",
      });

      return;
    }
    setfundPhase(3);
    setwithdrawUsdPhase(3);
  };
  const handlePin = () => {
    if (!pin || pin.length < 4) {
      enqueueSnackbar("Please input a valid pin😞", { variant: "error" });

      return;
    }
    setfundPhase(4);
    setwithdrawUsdPhase(4);
  };
  function clearForm() {
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
    setfundPhase(1);
    setwithdrawUsdPhase(1);
    setSelectedBank(null);
  }

  const handleFundUSD = async () => {
    setIsLoading(true);
    try {
      const response = await api.fundUSD({
        amount: amount,
        otp: otp,
        pin: pin,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));

    
        enqueueSnackbar(decryptRes.message, { variant: "success" });
        closeFundUSD();
        setIsSuccess(true);
        ProfileQuery.refetch();
      
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handlewithdrawUSD= async () => {
    setIsLoading(true);
    try {
      const response = await api.withdrawUSD({
        amount: amount,
        otp: otp,
        pin: pin,
      });
      //console.log("response of transfer==>>>>>", decryptaValue(response?.data));
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("response of transfer==>>>>>", decryptRes?.status);
      enqueueSnackbar(decryptRes.message, { variant: "success" });
      ClosewithdrawUsdModal();
      setIsSuccess(true);
      ProfileQuery.refetch();

     
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
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

  useEffect(() => {
    if (profileData?.default_partner?.hasPin === false) {
      setIsCreatePin(true);
    }
  }, [profileData]);

  async function getTransactionSummary() {
    const response = await api.getTransactionSummary({ params: {} });
    return response;
  }

  const SummaryQuery = useQuery(["summ"], () => getTransactionSummary(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const summaryData = SummaryQuery?.data || [];

  const pieData = {
    labels: ["Credits", "Debits"],
    datasets: [
      {
        label: "Transactions %",
        data: [
          summaryData?.type_summary?.credit?.percentage,
          summaryData?.type_summary?.debit?.percentage,
        ],
        backgroundColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
        borderColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
        borderWidth: 1,
        borderJoinStyle: "round",
        spacing: 1,
        borderRadius: 2,
      },
    ],
  };

  const handleComingSoon = () => {
    setIsComingSoon(true);
    setTimeout(() => {
      setIsComingSoon(false);
    }, 3000);
  };

  const closeComingSoon = () => {
    setIsComingSoon(false);
  };


  const quickAction = [
    {
      icon: <CardReceive size={20} color="#3B6896" />,
      label: "Fund Wallet",
      action: () => {
        openTransferOthers();
      },
    },
    {
      icon: <CardSend size={20} color="#3B6896" />,
      label: "Withdraw Dollar",
      action: () => {
      setIsVantTagModal(true)
      },
    },
    {
      icon: <CardEdit size={20} color="#3B6896" />,
      label: "Create USD Card",
      action: () => {
        navigation("/usd-card");

      },
    },
    {
      icon: <Note size={20} color="#3B6896" />,
      label: "Payment Link",
      action: () => {
        navigation("/paymentlink");
      },
    },
    {
      icon: <GridEdit size={20} color="#3B6896" />,
      label: "Create Invoice",
      action: () => {
        navigation("/invoice");
      },
    },
  ];



  return (
    <div className="overflow-y-auto min-h-screen px-[10px] md:px-[16px] xl:px-[20px] border">
      <ComingSoon
        isComingSoon={isComingSoon}
        closeComingSoon={closeComingSoon}
      />

      <CreatePin
        isCreatePin={isCreatePin}
        setIsCreatePin={setIsCreatePin}
        refetch={ProfileQuery.refetch}
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] mt-5 ">
        <li>
          <div className="rounded-[12px] px-[16px] pt-4 pb-6 bg-[#3B6896] ">
            <div className="flex-between">
              <div className="flex-item gap-2">
                <div className="py-[5px] text-[12px] px-[10px] flex cursor-pointer bg-white rounded-[48px] w-[90px]  gap-[8px] items-center ">
                  <img
                    src="/assets/USbig.png"
                    className="h-[13px] w-[13px]"
                    alt="flag USD"
                  />

                  <p>USD</p>
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
                    {"$"} *****
                  </p>
                ) : (
                  <NumericFormat
                    value={profileData?.default_partner?.dollar_wallet_balance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
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
                className="px-2 py-1 bg-white"
                style={{
                  borderRadius: 40,
                  flexDirection: "row",
                  alignbanks: "center",
                }}
              >
                <p className="text-[#272F35]  font-normal  text-[10px] leading-[14px]  tracking-[0.2px]   ">
                  Vant
                </p>
              </button>
            </div>
          </div>

          <div className=" bg-[#1B2026] relative   rounded-[12px]  px-[16px] pb-[34px] pt-[24px] -mt-[16px]    ">
            <button
              onClick={refreshRate}
              className={` absolute top-[12px] right-[16px] rounded-full hover:text-gray-100 transition-all duration-200
        ${isRotating ? "animate-spin" : ""}`}
              aria-label="Refresh"
            >
              <Refresh className="w-4 h-4 text-white" />
            </button>
            <p className="text-[#fff]  font-medium  text-[12px] leading-[14px]  tracking-[0.2px]  mb-[8px]  ">
              Current Rate{" "}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignbanks: "center",
                justifyContent: "space-between",
                marginTop: "22px",
              }}
            >
              <p className="text-[#fff]  font-semibold  text-[14px] leading-[17px]  tracking-[0.2px]    ">
                1 USD
              </p>
              <ArrowSwapHorizontal className="w-5 h-5 text-white" />

              <p className="text-[#fff]  font-semibold  text-[14px] leading-[17px]  tracking-[0.2px]    ">
                NGN {rate?.buy_rate}
              </p>
            </div>
          </div>
        </li>

        <li className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] bg-[#fefefeec] shadow p-2 md:p-3 ">
          <p className="text-[#000]   font-semibold text-[14px] leading-[14px] text-center  tracking-[0.2px] ">
            Quick Action
          </p>
          <div className=" mt-7 grid grid-cols-3 gap-1 gap-y-3">
            {quickAction?.map((card) => (
              <div
                className="cursor-pointer px-1 py-2 hover:bg-gray-100 rounded-lg shadow"
                onClick={card.action}
              >
                <div className="flex flex-col items-center gap-2  ">
                  {card.icon}
                  <p className="text-[12px] whitespace-nowrap">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </li>
        <li className="rounded-lg relative overflow-hidden border-[0.8px] bg-[#fefefe]  border-[#E4E7EC] shadow p-2 md:p-4 h-[225px] flex justify-center  flex-col items-center">
          <p className="text-[#000] text-center   font-semibold text-[14px] leading-[14px]   tracking-[0.2px] ">
            Transaction Chart
          </p>

          <div className="h-[160px]">
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
          </div>

          <div className="flex-item w-full ">
            <div className="w-[50%] pr-2 py-1 border-r">
              <p className="text-[#000] text-center flex items-center   font-semibold text-[12px] leading-[12px]   tracking-[0.2px] ">
                Total Credit:{" "}
                <NumericFormat
                  value={summaryData?.type_summary?.credit?.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <p className="text-[#26ae5f] text-center   font-semibold text-[12px] leading-[12px]   tracking-[0.2px] ">
                      {value}
                    </p>
                  )}
                />
              </p>
            </div>
            <div className="w-[50%] pl-2 py-3 ">
              <p className="text-[#000] text-center flex items-center    font-semibold text-[12px] leading-[12px]   tracking-[0.2px] ">
                Total Debits:{" "}
                <NumericFormat
                  value={summaryData?.type_summary?.debit?.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <p className="text-orange-700 text-center   font-semibold text-[12px] leading-[12px]   tracking-[0.2px] ">
                      {value}
                    </p>
                  )}
                />
              </p>
            </div>
          </div>
        </li>
      </ul>

      <Modal
        isCentered
        isOpen={isFundUSD}
        onClose={closeFundUSD}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          {fundPhase === 1 && (
            <>
              {" "}
              <ModalHeader
                py="3"
                color="#000000"
                className="text-[16px] md:text-[18px] text-[#000000] font-medium leading-[18px] md:leading-[20px]"
              >
                Fund Dollar Wallet
              </ModalHeader>
              <ModalCloseButton size={"sm"} />
              <Divider color="#98A2B3" />
              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "10px", md: "18px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[16px] md:pt-[20px] px-[10px] md:px-[20px] pb-[24px] md:pb-[30px]"
              >
                <div className="p-2 py-3 mb-3 border-[#3B6896] border bg-[#3B6896] bg-opacity-35 rounded-lg">
                  <p className="text-sm  ">Naira Wallet Balance</p>
                  <p className="text-base mt-2 ">
                    <NumericFormat
                      value={profileData?.default_partner?.wallet_balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"NGN"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </p>
                </div>

                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Amount($)
                  </label>
                  <div className="">
                    <InputField
                      placeholder="$20"
                      value={amount}
                      name="amount"
                      onChange={(e) => setAmount(e.target?.value)}
                    />
                    {amount * rate?.buy_rate >
                      profileData?.default_partner?.wallet_balance && (
                      <p className="text-xs text-red-400 mt-1">
                        You do not enough Naira balance
                      </p>
                    )}
                  </div>
                </div>
                <ProgrammingArrows
                  size="32"
                  color="#3B6896"
                  className="text-center mx-auto my-5"
                />

                <p className="text-base font-medium text-center ">
                  <NumericFormat
                    value={amount * parseFloat(rate?.buy_rate)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"NGN"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </p>
              </ModalBody>
              <Divider />
              <ModalFooter gap={"16px"}>
                <button
                  onClick={closeFundUSD}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={sendOtp}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
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
          {fundPhase === 2 && (
            <>
              <OtpModal
                isLoading={isLoading}
                otp={otp}
                setOtp={setOtp}
                handleOtp={handleOtp}
                onClose={closeFundUSD}
                color="#3B6896"
              />
            </>
          )}
          {fundPhase === 3 && (
            <>
              <PinModal
                isLoading={isLoading}
                pin={pin}
                setPin={setPin}
                handlePin={handlePin}
                onClose={closeFundUSD}
                color="#3B6896"
              />
            </>
          )}
          {fundPhase === 4 && (
            <>
              <PredivModal
                isLoading={isLoading}
                accountNumber={accountNumber}
                name={accountName}
                purpose="Fund Dollar Wallet"
                naration={naration}
                action={handleFundUSD}
                handleClose={closeFundUSD}
                bank={selectedBank?.name}
                amount={amount}
                onClose={closeFundUSD}
                color="#3B6896"
                isFundDollar={true}
                rate={rate}
              />
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isVantTagModal}
        onClose={ClosewithdrawUsdModal}
        size={{ base: "xs", sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          {withdrawUsdPhase === 1 && (
            <>
              {" "}
              <ModalHeader
                py="4"
                color="#000000"
                className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
              >
               Withdraw USD
              </ModalHeader>
              <ModalCloseButton size={"sm"} />
              <Divider color="#98A2B3" />
              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "16px", md: "24px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
              >
                <div className="p-2 py-3 mb-3 border-[#3B6896] border bg-[#3B6896] bg-opacity-35 rounded-lg">
                  <p className="text-sm  ">Dollar Wallet Balance</p>
                  <p className="text-base mt-2 ">
                    <NumericFormat
                      value={profileData?.default_partner?.dollar_wallet_balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"USD"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </p>
                </div>

                <div className="mb-[18px]">
                  <label className="text-[14px] text-[#667185]    mb-[8px] ">
                    Amount($)
                  </label>
                  <div className="">
                    <InputField
                      placeholder="$20"
                      value={amount}
                      name="amount"
                      onChange={(e) => setAmount(e.target?.value)}
                    />
                    {amount  >
                      profileData?.default_partner?.dollar_wallet_balance && (
                      <p className="text-xs text-red-400 mt-1">
                        You do not enough Dollar balance
                      </p>
                    )}
                  </div>
                </div>
                <ProgrammingArrows
                  size="32"
                  color="#3B6896"
                  className="text-center mx-auto my-5"
                />

                <p className="text-base font-medium text-center ">
                  <NumericFormat
                    value={amount * parseFloat(rate?.buy_rate)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"NGN"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </p>
                
              </ModalBody>
              <Divider />
              <ModalFooter gap={"16px"}>
                <button
                  onClick={ClosewithdrawUsdModal}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={sendOtpWithdraw}
                  disabled={isLoading}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
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

          {withdrawUsdPhase === 2 && (
            <>
              <OtpModal
                isLoading={isLoading}
                otp={otp}
                setOtp={setOtp}
                handleOtp={handleOtp}
                onClose={ClosewithdrawUsdModal}
                color="#3B6896"
             

              />
            </>
          )}
          {withdrawUsdPhase === 3 && (
            <>
              <PinModal
                isLoading={isLoading}
                pin={pin}
                setPin={setPin}
                handlePin={handlePin}
                onClose={ClosewithdrawUsdModal}
                color="#3B6896"

              />
            </>
          )}
          {withdrawUsdPhase === 4 && (
            <>
              <PredivModal
                tag={tag}
                action={handlewithdrawUSD}
                handleClose={ClosewithdrawUsdModal}
                amount={amount}
                onClose={ClosewithdrawUsdModal}
                color="#3B6896"
                rate={rate}
                isWithdrawDollar={true}
                purpose="Withdraw Dollar Wallet"

              />
            </>
          )}
        </ModalContent>
      </Modal>

      <RecentTransaction />
      <Success isSuccess={isSuccess} closeIsSuccess={closeIsSuccess} />
    </div>
  );
};

export default UsdWallet;
