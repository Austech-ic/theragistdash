import React, { useState } from "react";
import CreditCard from "../../components/creditcard";
import NewCard from "../../components/NewCard";
import { ClipLoader, RotateLoader } from "react-spinners";
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
import InputField from "../../components/InputField";
import {
  ArrowDown2,
  ArrowRight2,
  Building,
  Buildings2,
  CardAdd,
  Eye,
  InfoCircle,
  TickCircle,
} from "iconsax-react";
import { motion as m } from "framer-motion";
import SelectCard from "../../components/card/dollarcard/SelectCard";
import { useUserContext } from "../../utils/UserProvider";
import { decryptaValue } from "../../utils/helperFunctions";
import api from "../../api";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { EyeClosed, EyeOff } from "lucide-react";
import OTPInput from "otp-input-react";
import PredivModal from "../../components/wallet/PreviewModal";


const DollarCard = () => {
  const [createCardPhase, setCreateCardPhase] = useState(0);
  const [isCreateCard, setIsCreateCard] = useState(false);
  const [isFundCard, setIsFundCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const [viewAmount, setViewAmount] = useState(true);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [fundingCard, setFundingCard] = useState(null);
  const [isPrevFundCard, setPrevFundCard] = useState(false);

  const togglePrevFundCard = () => {
    setPrevFundCard(!isPrevFundCard);
  };
  function closePrevFundCard() {
    setPrevFundCard(false);
  }

  const { profile } = useUserContext();
  function toggleViewAmount() {
    setViewAmount(!viewAmount);
  }

  const closeCraeteCard = () => {
    setIsCreateCard(false);
    setVerifySuccess(false);
    setVerifyFailed(false);
    setConfirmPin("");
    setSelectedCard(null);
  };
  const closeFundCard = () => {
    setIsFundCard(false);
    setPin("");
    setAmount("");
  };
  const toggleFundCard = (cardId, cardName, lastDigit) => {
    setIsFundCard(!isFundCard);
    setFundingCard([cardId, cardName, lastDigit]);
  };

  const openCreateCard = () => {
    setCreateCardPhase(1);
    setIsCreateCard(true);
    setTimeout(() => {
      setIsLoading(false);
      if (IsBusinessVerivied && calculateProgress() >= 100) {
        setVerifySuccess(true);
      } else {
        setVerifyFailed(true);
      }
    }, 3000);
  };

  const calculateProgress = () => {
    const fieldsToCheck = [
      "address",
      "house_no",
      "state",
      "country",
      "postal_code",
      "city",
    ];
    const filledFields = fieldsToCheck.reduce((count, field) => {
      if (
        profile &&
        profile[field] !== null &&
        profile[field] !== undefined &&
        profile[field] !== ""
      ) {
        count++;
      }
      return count;
    }, 0);
    const progressPercentage = (filledFields / fieldsToCheck.length) * 100;
    return Math.round(progressPercentage);
  };

  const IsBusinessVerivied =
    profile && profile?.is_verified === 1 ? true : false;

  const failedVerification =
    IsBusinessVerivied === false && calculateProgress() !== 100 ? true : false;

  const handleCreateCard = async () => {
    setIsLoading(true);

    try {
      if (!profile?.card_holder_id) {
        const response = await api.createCardHolder();
        console.log(
          "response of account verification==>>>>>",
          decryptaValue(response?.data)
        );
        const decryptRes = JSON.parse(decryptaValue(response?.data));
        setVerifySuccess(false);
        setVerifyFailed(false);
        setIsLoading(false);
        setCreateCardPhase(2);
      } else {
        setIsLoading(false);
        setCreateCardPhase(2);
      }
    } catch (e) {
      console.log("error in creating card holder", e);
    }
  };

  const createCard = async () => {
    if (!selectedCard) {
      enqueueSnackbar("Please select a card", { variant: "warning" });
      return;
    }

    if (!confirmPin) {
      enqueueSnackbar("Pin is required", { variant: "warning" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.createCard({
        card_limit: selectedCard?.limit,
        pin: confirmPin,
      });
      const decr = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decr?.message, { variant: "success" });
      setIsLoading(false);
      setIsCreateCard(false);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  async function getCards() {
    const response = await api.getCards({
      // params: { cardholder_id: profile?.card_holder_id},
    });

    return response;
  }

  const cardHolderQuery = useQuery(["cardHolderQuery"], () => getCards(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const cardData = cardHolderQuery?.data?.data || [];

  async function getCardDetails(id) {
    setIsLoading(true);
    if (!id) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.getCardDetails({
        params: { card_id: id },
      });
      setCardDetails(response?.data);
      setIsLoading(false);
    } catch (e) {
      console.log("error in fetching card details", e);
      setIsLoading(false);
    }
  }

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
      setIsFundCard(false);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
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

  return (
    <div className="min-h-screen bg-gray-200  p-4 md:p-6 ">
      <div className="flex flex-col md:flex-row flex-wrap items-center  gap-4">
        {cardData &&
          cardData?.map((card, index) => (
            <div className="w-full md:w-96">
              <p className="text-sm text-center text-gray-600 animate-pulse mb-3 transition-transform duration-500 ease-in-out">
                Hover on card to flip
              </p>
              <CreditCard cardDetails={cardDetails} />
              <div className="p-2 rounded-md shadow border flex items-center gap-3 w-full  max-w-96 sm:w-96">
                {!cardDetails && (
                  <button onClick={() => getCardDetails(card?.card_id)}>
                    <div className="flex items-center justify-center px-4 py-[6px] text-sm text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-600">
                      {isLoading ? (
                        <ClipLoader color={"#3B6896"} size={20} />
                      ) : (
                        <> Fetch Card Details </>
                      )}
                    </div>
                  </button>
                )}
                {cardDetails && (
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-600 flex flex-col">
                        <span className="text-xs text-gray-400">
                          Card Balance:{" "}
                        </span>
                        {!viewAmount ? (
                          "XX.XX"
                        ) : (
                          <NumericFormat
                            value={cardDetails?.balance / 100}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={(value) => (
                              <p className="text-[#667185] robot font-semibold  text-[24px] leading-[26px] text-center  tracking-[0.2px]   ">
                                {value}
                              </p>
                            )}
                          />
                        )}
                      </p>
                      <button onClick={toggleViewAmount} className="flex">
                        {viewAmount ? (
                          <EyeClosed color="gray" size={16} />
                        ) : (
                          <Eye color="gray" size={16} />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        toggleFundCard(card?.card_id, cardDetails?.card_name, cardDetails?.last_4)
                      }
                      className="flex items-center text-[#3B6896] hover:text-gray-500 transition-transform delay-100 flex-col"
                    >
                      <CardAdd size={18} />

                      <p className="text-sm  flex flex-col">
                        <span className="text-xs ">Fund Card</span>
                      </p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        <div className=" w-full md:w-96">
          <div className="md:-mt-6">
            <NewCard action={openCreateCard} />
          </div>
        </div>
      </div>{" "}
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
                  name=""
                  onChange={(e) => setAmount(e.target?.value)}
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
      <Modal
        isCentered
        isOpen={isCreateCard}
        onClose={closeCraeteCard}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />

        {createCardPhase === 1 && (
          <>
            <ModalContent>
              <ModalHeader
                py="3"
                color="#000000"
                className="text-[16px] md:text-[18px] text-[#000000] font-medium leading-[18px] md:leading-[20px]"
              >
                Create Dollar Card
              </ModalHeader>
              <ModalCloseButton size={"sm"} />
              <Divider color="#98A2B3" />
              <ModalBody
                pt={{ base: "20px", md: "24px" }}
                px={{ base: "10px", md: "18px" }}
                pb={{ base: "30px", md: "40px" }}
                className="pt-[16px] md:pt-[20px] px-[10px] md:px-[20px] pb-[24px] md:pb-[30px]"
              >
                {!verifyFailed && !verifySuccess && (
                  <>
                    <div className="flex items-center justify-center my-4">
                      <ClipLoader color="#3B6896" size={40} />
                    </div>
                    <p className="text-[#3B6896] text-sm animate-pulse text-center mb-5">
                      Verifying User Profile.....
                    </p>
                  </>
                )}

                {verifySuccess && (
                  <div className="flex flex-col gap-7">
                    <div className="text-center">
                      <p className="font-semibold">
                        You're all set to create a Dollar card 🎊
                      </p>
                      <div className="text-sm">
                        There is a $5.00 fee to create a Dollar card.
                      </div>
                    </div>

                    <ul className="flex flex-col gap-4 px-2 md:px-6">
                      <li className="flex items-center justify-between pb-2 border-b">
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Building color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px] flex-1  text-sm">
                          <p className="font-semibold">Business Verification</p>
                          <p>Confirmed</p>
                        </div>
                        <div className=" text-right">
                          <TickCircle
                            color="green"
                            size={18}
                            variant="Bold"
                            className="justify-self-end"
                          />
                        </div>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b">
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Buildings2 color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px]  text-sm flex-1">
                          <p className="font-semibold">Address Verification</p>
                          <p>Confirmed</p>
                        </div>
                        <div className=" text-right">
                          <TickCircle
                            color="green"
                            size={18}
                            variant="Bold"
                            className="justify-self-end"
                          />
                        </div>
                      </li>
                    </ul>

                    <div className="p-2 py-3 mb-3 shadow border bg-[#111111]  rounded-lg flex gap-1">
                      <input
                        type="checkbox"
                        checked={isConsent}
                        onChange={(e) => setIsConsent(e.target?.checked)}
                      />
                      <p className="text-sm text-white  ">
                        By clicking continue you agree to Vant Dollar Virtual
                        Card{" "}
                        <a href="" className="text-[#3B6896]">
                          Terms and Condition
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {verifyFailed && (
                  <div className="flex flex-col gap-7">
                    <div className="text-center">
                      <p className="font-semibold">
                        Bussiness Verification Failed
                      </p>
                      <div className="text-sm text-red-400">
                        Fill up the necessary information on your profile to
                        continue
                      </div>
                    </div>

                    <ul className="flex flex-col gap-4 px-2 md:px-6">
                      <Link
                        to="/setting/business-info"
                        className="flex items-center justify-between pb-2 border-b"
                      >
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Building color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px] flex-1  text-sm">
                          <p className="font-semibold">Business Verification</p>
                          {IsBusinessVerivied ? (
                            <p>Confirmed</p>
                          ) : (
                            <p className="text-red-500">Failed</p>
                          )}
                        </div>
                        <div className="text-right">
                          <TickCircle
                            color={IsBusinessVerivied ? "green" : "red"}
                            size={18}
                            variant="Bold"
                            className="justify-self-end"
                          />
                        </div>
                      </Link>
                      <Link
                        to="/setting/business-info"
                        className="flex items-center justify-between pb-2 border-b"
                      >
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Buildings2 color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px]  flex-1 text-sm">
                          <p className="font-semibold">Address Verification</p>
                          {calculateProgress() !== 100 ? (
                            <p className="text-red-500">Failed</p>
                          ) : (
                            <p>Confirmed</p>
                          )}
                        </div>
                        <div className=" text-right">
                          <TickCircle
                            color={
                              calculateProgress() !== 100 ? "red" : "green"
                            }
                            size={18}
                            variant="Bold"
                            className="justify-self-end"
                          />
                        </div>
                      </Link>
                    </ul>
                  </div>
                )}
              </ModalBody>
              <Divider />
              <ModalFooter gap={"16px"}>
                <button
                  onClick={closeCraeteCard}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                {!failedVerification && (
                  <button
                    disabled={!isConsent}
                    onClick={handleCreateCard}
                    className={`border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white ${
                      isConsent ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Send </>
                    )}
                  </button>
                )}
              </ModalFooter>
            </ModalContent>
          </>
        )}

        {createCardPhase === 2 && (
          <SelectCard
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            cardVisible={cardVisible}
            setCardVisible={setCardVisible}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            confirmPin={confirmPin}
            setConfirmPin={setConfirmPin}
            createCard={createCard}
            closeCraeteCard={closeCraeteCard}
          />
        )}
      </Modal>
    </div>
  );
};

export default DollarCard;
