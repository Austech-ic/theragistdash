import {
  ArrowDown2,
  ArrowRight2,
  Eye,
  EyeSlash,
  InfoCircle,
} from "iconsax-react";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
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
import { motion as m } from "framer-motion";

const SelectCard = ({
  setSelectedCard,
  selectedCard,
  cardVisible,
  setCardVisible,
  isLoading,
  confirmPin,
  setConfirmPin,
  createCard,
  closeCraeteCard,
}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinError, setPinError] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  const toggle2 = () => {
    setOpen2(!open2);
  };
  const handleNewPinChange = (e) => {
    setNewPin(e.target.value);
  };
  const handleConfirmPinChange = (event) => {
    let confirm_pin = event.target.value;
    setConfirmPin(confirm_pin);
    if (confirm_pin !== newPin) {
      setPinError("Pin does not match!");
    } else {
      setPinError("Pin match!");
    }
  };

  const handleSelectedCard = (card) => {
    setCardVisible(false);
    setSelectedCard(card);
  };

  const cardType = [
    {
      id: 1,
      type: "Mastercard ($5,000 monthly limit)",
      limit: 10000,
      icon: "/assets/mastercard.png",
      color: "#F0384D",
    },
    {
      id: 2,
      type: "Mastercard ($10,000 monthly limit)",
      limit: 10000,
      icon: "/assets/mastercard.png",
      color: "#FF9F00",
    },
  ];

  return (
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
          <div className="p-2 py-3 mb-3 shadow border bg-[#111111]  rounded-lg flex gap-1">
            <InfoCircle
              color="white"
              variant="Bold"
              size={16}
              className="w-[20px]"
            />
            <p className="text-sm text-white  ">
              Important: Please note that the card creation fee will be deducted
              from your USD wallet balance. You are to select between Visa and
              Mastercard for the card type.
            </p>
          </div>

          <div className="mb-[18px]">
            <label className="text-[14px] text-[#667185]    mb-[8px] ">
              Choose card type
            </label>
            <button
              onClick={() => setCardVisible(!cardVisible)}
              className="w-full h-[38px] pl-[10px] pr-[8px] flex-between py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#3B6896] "
            >
              <div className="flex-row banks-center">
                {selectedCard ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedCard?.icon}
                      alt="card logo"
                      style={{ height: 20, width: 24 }}
                      className="mr-3"
                    />
                    <p className="text-[#272F35] font-normal font-i_normal text-[12px] leading-[15px] tracking-[0.028px] ">
                      {selectedCard?.type}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#838383] font-normal font-i_normal text-[12px] leading-[15px]  tracking-[0.028px] ">
                    {"Select card type"}
                  </p>
                )}
              </div>
              <ArrowDown2 variant="Linear" color={"#838383"} size={14} />
            </button>
            {cardVisible && (
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
                className="w-full h-[150px] overflow-y-auto  px-2 py-3 text-[14px] text-[#000000] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#3B6896] "
              >
                {cardType?.map((card, index) => (
                  <button
                    onClick={() => handleSelectedCard(card)}
                    className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                    style={{
                      borderColor: "rgba(18, 3, 58, 0.10)",
                      borderWidth: 0.2,
                    }}
                  >
                    <div className="flex-item">
                      <img
                        src={card?.icon}
                        alt="card logo"
                        style={{ height: 20, width: 22 }}
                        className="mr-3 "
                      />

                      <p className="text-[#272F35] flex-1 font- font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                        {card?.type}
                      </p>
                    </div>

                    <ArrowRight2
                      size="14"
                      color={
                        selectedCard?.id === card?.id ? "#3B6896" : "#DEDEDE"
                      }
                      variant="Linear"
                    />
                  </button>
                ))}
              </m.div>
            )}
          </div>

          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px]  font-normal  text-[#000000] mb-[8px]">
              Card Pin
            </label>
            <div className=" relative    flex items-center">
              <div className="absolute right-[16px]">
                {open === false ? (
                  <Eye size="14" color="#98A2B3" onClick={toggle} />
                ) : (
                  <EyeSlash size="14" color="#98A2B3" onClick={toggle} />
                )}
              </div>
              <input
                type={open === false ? "password" : "text"}
                placeholder="****"
                className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#3B6896] focus:border-[#3B6896] "
                required
                autoComplete="on"
                name="pin"
                value={newPin}
                onChange={(e) => handleNewPinChange(e)}
                maxLength={4}
              />
            </div>
          </div>

          <div className="mb-[16px]">
            <label className="text-[14px] md:text-[14px]  font-normal  text-[#000000] mb-[8px]">
              Confirm Card Pin
            </label>
            <div className=" relative    flex items-center">
              <div className="absolute right-[16px]">
                {open2 === false ? (
                  <Eye size="14" color="#98A2B3" onClick={toggle2} />
                ) : (
                  <EyeSlash size="14" color="#98A2B3" onClick={toggle2} />
                )}
              </div>
              <input
                type={open2 === false ? "password" : "text"}
                placeholder="****"
                className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#3B6896] focus:border-[#3B6896] "
                name=""
                value={confirmPin}
                onChange={(e) => handleConfirmPinChange(e)}
                maxLength={4}
              />
            </div>
            {pinError && (
              <p
                className={` ${
                  pinError === "Pin match!" ? "text-green-400" : "text-[red]"
                }  pt-1 pl-1 text-left text-xs`}
              >
                {pinError}
              </p>
            )}
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter gap={"16px"}>
          <button
            onClick={closeCraeteCard}
            className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
          >
            Cancel
          </button>
          <button
            onClick={createCard}
            className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#3B6896] hover:bg-opacity-75 flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
          >
            {isLoading ? <ClipLoader color={"white"} size={20} /> : <> Send </>}
          </button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default SelectCard;
