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
  InfoCircle,
  TickCircle,
} from "iconsax-react";
import { motion as m } from "framer-motion";
import SelectCard from "../../components/card/dollarcard/SelectCard";
import { useUserContext } from "../../utils/UserProvider";
import { decryptaValue } from "../../utils/helperFunctions";
import api from "../../api";
import { Link } from "react-router-dom";

const DollarCard = () => {
  const [createCardPhase, setCreateCardPhase] = useState(0);
  const [isCreateCard, setIsCreateCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [confirmPin, setConfirmPin] = useState("")


  const { profile } = useUserContext();

  const closeCraeteCard = () => {
    setIsCreateCard(false);
    setVerifySuccess(false);
    setVerifyFailed(false);
    setConfirmPin("")
    setSelectedCard(null);
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
      }
    } catch (e) {
      console.log("error in creating card holder", e);
    }

    // setCreateCardPhase(2);
  };

  const createCard = async () => {
    if (!confirmPin) {
      setPinError("Please enter both PINs!");
      return;
    }
    setIsLoading(true);
    try {
      // call API to create card

      const response = await api.createCard({
      
        card_limit: selectedCard?.limit,
        pin: confirmPin
        
        
      });
      console.log("response of create card==>>>>>",decryptaValue(response?.data));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200  p-4 md:p-6 ">
      <div className="flex flex-col md:flex-row items-center  gap-4">
        <div className="w-full md:w-96">
          <p className="text-sm text-center text-gray-600 animate-pulse mb-3 transition-transform duration-500 ease-in-out">
            Hover on card to flip
          </p>
          <CreditCard />
        </div>
        <div className="md:self-end w-full md:w-96">
          <NewCard action={openCreateCard} />
        </div>
      </div>{" "}
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
                        <div className="ml-[8px]  text-sm">
                          <p className="font-semibold">Business Verification</p>
                          <p>Confirmed</p>
                        </div>
                        <div className="flex-1 text-right">
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
                        <div className="ml-[8px]  text-sm">
                          <p className="font-semibold">Address Verification</p>
                          <p>Confirmed</p>
                        </div>
                        <div className="flex-1 text-right">
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
                      <Link to="/setting/business-info" className="flex items-center justify-between pb-2 border-b">
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Building color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px]  text-sm">
                          <p className="font-semibold">Business Verification</p>
                          {IsBusinessVerivied ? (
                            <p>Confirmed</p>
                          ) : (
                            <p className="text-red-500">Failed</p>
                          )}
                        </div>
                        <div className="flex-1 text-right">
                          <TickCircle
                            color={IsBusinessVerivied ? "green" : "red"}
                            size={18}
                            variant="Bold"
                            className="justify-self-end"
                          />
                        </div>
                      </Link>
                      <Link to="/setting/business-info" className="flex items-center justify-between pb-2 border-b">
                        <div className="h-8 w-8 bg-[#3B6896]/20 rounded-full flex justify-center items-center ">
                          <Buildings2 color="#3B6896" size={14} />
                        </div>
                        <div className="ml-[8px]  text-sm">
                          <p className="font-semibold">Address Verification</p>
                          {calculateProgress() !== 100 ? (
                            <p className="text-red-500">Failed</p>
                          ) : (
                            <p>Confirmed</p>
                          )}
                        </div>
                        <div className="flex-1 text-right">
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
                    onClick={handleCreateCard}
                    className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
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
