import React, { useState } from "react";
import CreditCard from "../../components/creditcard";
import {
  CardReceive,
  CardSend,
  Copy,
  GridEdit,
  InfoCircle,
  Lock1,
} from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
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
import OTPInput from "otp-input-react";
import PredivModal from "../../components/wallet/PreviewModal";
import { decryptaValue } from "../../utils/helperFunctions";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../components/InputField";
import { ClipLoader } from "react-spinners";
import RecentDollarTransaction from "./RecentDollarTransaction";

const DollarCardDetails = () => {
  const location = useLocation();
  const cardDetails = location?.state;
  const [copiedRef, setCopiedRef] = useState(null);
  const [pin, setPin] = useState("");
  const [fundingCard, setFundingCard] = useState(null);
  const [isPrevFundCard, setPrevFundCard] = useState(false);
  const [isFundCard, setIsFundCard] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const togglePrevFundCard = () => {
    setPrevFundCard(!isPrevFundCard);
  };
  function closePrevFundCard() {
    setPrevFundCard(false);
  }

  const closeFundCard = () => {
    setIsFundCard(false);
    setPin("");
    setAmount("");
  };
  const toggleFundCard = (cardId, cardName, lastDigit) => {
    setIsFundCard(!isFundCard);
    setFundingCard([cardId, cardName, lastDigit]);
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

  // get card transactions
  async function getCardTransactions(page) {
    const response = await api.getCardTransactions({
      params: { card_id: cardDetails?.cardDetails.id },
    });
    return response;
  }

  const TransactionQuery = useQuery(
    ["getCardTransactions"],
    () => getCardTransactions(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );
  const transactionData = TransactionQuery?.data || [];
  const transactionLoading = TransactionQuery?.isLoading;

  //   console.log(cardDetails);
  const quickAction = [
    {
      icon: <CardReceive size={20} color="#3B6896" />,
      label: "Fund Card",
      action: () => {
        toggleFundCard(
          cardDetails?.cardDetails.id,
          cardDetails?.cardDetails?.name,
          cardDetails?.cardDetails?.last_4
        );
      },
    },
    {
      icon: <Lock1 size={20} color="#3B6896" />,
      label: "Freeze",
      //   action: () => {
      //   setIsVantTagModal(true)
      //   },
    },

    // {
    //   icon: <GridEdit size={20} color="#3B6896" />,
    //   label: "Change Pin",
    //   //   action: () => {
    //   //     navigation("/invoice");
    //   //   },
    // },
  ];

  // Function to copy text to the clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRef(text); // Set copied ref to show feedback
      setTimeout(() => setCopiedRef(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {
      //console.error("Failed to copy:", err);
    }
  };

  const fundCard = async () => {
    if (!fundingCard) {
      enqueueSnackbar("Please select a card", { variant: "warning" });
      return;
    }
    if (!fundingCard[0] || !fundingCard[1]) {
      enqueueSnackbar("Please select a card", { variant: "warning" });
      return;
    }
    if (!amount) {
      enqueueSnackbar("Amount is required", { variant: "warning" });
      return;
    }

    if (!pin) {
      enqueueSnackbar("Pin is required", { variant: "warning" });
      return;
    }
    if (pin.length < 4) {
      enqueueSnackbar("Pin is incomplete", { variant: "warning" });
      return;
    }

    if (amount <= 0) {
      enqueueSnackbar("Amount should be greater than 0", {
        variant: "warning",
      });
      return;
    }
    if (amount > profileData?.default_partner?.dollar_wallet_balance) {
      enqueueSnackbar("Insufficient Dollar Balance ", { variant: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.fundCard({
        card_id: fundingCard && fundingCard[0],
        card_name: fundingCard && fundingCard[1],
        amount: amount,
        pin: pin,
      });
      const decr = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decr?.message, { variant: "success" });
      setIsLoading(false);
      // getCardDetails(fundingCard[0])
      setIsFundCard(false);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200  p-4 md:p-6 ">
      <div className="flex items-center mb-3">
        <Link to="/usd-card">
          <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
            Dollar Card /
          </p>
        </Link>

        <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
          &nbsp; Card Details
        </p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap   gap-4 mt-5">
        <div className="w-full md:w-96">
          <p className="text-sm text-center text-gray-600 animate-pulse mb-3 transition-transform duration-500 ease-in-out">
            Hover on card to flip
          </p>
          <CreditCard cardDetails={cardDetails?.cardDetails} />
        </div>

        <div className=" w-full md:w-96 ">
          <div className="md:mt-8 rounded-lg md:h-[224px] overflow-hidden border-[0.8px] border-[#E4E7EC] bg-[#fefefeec] shadow p-2 md:p-3 ">
            <p className="text-sm text-gray-600 mb-1">
              Card Name:
              <span className="pl-2 font-semibold robot tracking-wider">
                {cardDetails?.cardDetails?.name}
              </span>{" "}
            </p>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-600">
                Card Number:{" "}
                <span className="pl-2 font-semibold robot tracking-wider">
                  {cardDetails?.cardDetails?.card_number}
                </span>{" "}
              </p>

              <button
                onClick={() =>
                  handleCopy(cardDetails?.cardDetails?.card_number)
                }
              >
                <p className="text-gray-500 font-semibold font-i_medium text-[10px] leading-[9.68px]  ">
                  {copiedRef === cardDetails?.cardDetails?.card_number ? (
                    "Copied!"
                  ) : (
                    <Copy size={18} variant="Bold" color="gray" />
                  )}
                </p>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Expiry Date:{" "}
              <span className="pl-2 font-semibold robot tracking-wider">
                {cardDetails?.cardDetails?.expiry}
              </span>{" "}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              CVV:{" "}
              <span className="pl-2 font-semibold robot tracking-wider">
                {cardDetails?.cardDetails?.cvv}
              </span>{" "}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              Balance:{" "}
              <NumericFormat
                value={cardDetails?.cardDetails?.balance / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(value) => (
                  <p className="pl-2 font-semibold robot tracking-wider">
                    {value}
                  </p>
                )}
              />{" "}
            </p>

            <div className=" mt-5 grid grid-cols-3 gap-1 gap-x-3">
              {quickAction?.map((card) => (
                <div
                  className="cursor-pointer px-1 py-2 hover:bg-gray-100 rounded-lg shadow"
                  onClick={card.action}
                >
                  <div className="flex flex-col items-center gap-2  ">
                    {card.icon}
                    <p className="text-[12px] whitespace-nowrap">
                      {card.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RecentDollarTransaction data={transactionData} loading={transactionLoading}/>

      <Modal
        isCentered
        isOpen={isPrevFundCard}
        onClose={closePrevFundCard}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />

        <ModalContent>
          <PredivModal
            isLoading={isLoading}
            lastDigit={fundingCard && fundingCard[2]}
            name={fundingCard && fundingCard[1]}
            purpose="Fund Dollar Card"
            action={fundCard}
            handleClose={closePrevFundCard}
            amount={amount}
            onClose={closePrevFundCard}
            color="#3B6896"
            isFundDollarCard={true}
          />
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        isOpen={isFundCard}
        onClose={closeFundCard}
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
            className="text-[16px] md:text-[18px] text-[#000000] font-medium leading-[18px] md:leading-[20px]"
          >
            Fund Card
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "10px", md: "18px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[16px] md:pt-[20px] px-[10px] md:px-[20px] pb-[24px] md:pb-[30px]"
          >
            <div className="p-2 py-3 mb-3 shadow border bg-[#111111]  rounded-lg flex gap-1">
              <InfoCircle
                color="white"
                variant="Bold"
                size={16}
                className="w-[20px]"
              />
              <p className="text-sm text-white  ">
                Important: The card funding amount will be directly deducted
                from your USD wallet balance.
              </p>
            </div>

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
                  type="text"
                  placeholder="20"
                  value={amount}
                  name="amount"
                  onChange={(e) => setAmount(e.target?.value)}
                  autoComplete={false}
                />
                {amount >
                  profileData?.default_partner?.dollar_wallet_balance && (
                  <p className="text-xs text-red-400 mt-1">
                    You do not enough Dollar balance
                  </p>
                )}
              </div>
            </div>
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Pin
              </label>
              <div className="flex">
                <OTPInput
                  //   className=" h-[44px] bg-[#DBDCDDFF]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  value={pin}
                  className="border-[#000] "
                  onChange={setPin}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  secure
                  //   style
                  inputStyles={{
                    padding: "5px",
                    backgroundColor: "#DBDCDDFF",
                    border: "#000",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <Divider />

          <ModalFooter>
            <button
              onClick={togglePrevFundCard}
              className={`border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white `}
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Submit </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DollarCardDetails;
