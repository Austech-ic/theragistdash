import React, { useRef } from "react";
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
import { ClipLoader } from "react-spinners";
import OTPInput from "otp-input-react";
import { NumericFormat } from "react-number-format";

const PreviewModal = ({
  isLoading,
  accountNumber,
  name,
  purpose,
  naration,
  handleTransfer,
  onClose,
  bank,
  amount,
  tag,
}) => {
  const userRef = useRef();
  function getFormattedCurrentDay(format = "full") {
    const date = new Date();
    const options = {
      full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
      short: { weekday: "short", month: "short", day: "numeric" },
      weekday: { weekday: "long" },
      compact: { weekday: "short" },
    };

    return date.toLocaleDateString("en-US", options[format]);
  }
  return (
    <>
      {" "}
      <ModalHeader
        py="4"
        color="#000000"
        className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
      >
        Preview Details
      </ModalHeader>
      <ModalCloseButton size={"sm"} />
      <Divider color="#98A2B3" />
      <ModalBody
        pt={{ base: "20px", md: "24px" }}
        px={{ base: "16px", md: "24px" }}
        pb={{ base: "30px", md: "40px" }}
        className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
      >
        <div className="px-[10px] py-[18px] rounded-lg bg-slate-100 text-[#667185] w-[85%] mx-auto">
          <div className="mx-auto">
            {" "}
            <NumericFormat
              value={amount}
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
            {tag && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Vant Tag:</p>
                <p className="text-[14px] leading-[14px] font-medium">{tag}</p>
              </li>
            )}
            {name && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Name:</p>
                <p className="text-[14px] leading-[14px] font-medium">{name}</p>
              </li>
            )}
            {amount && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Amount:</p>
                <p className="text-[14px] leading-[14px] font-medium">
                  {" "}
                  <NumericFormat
                    value={amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={(value) => (
                      <p className="text-[14px] leading-[14px] font-medium">
                        {" "}
                        {value}
                      </p>
                    )}
                  />
                </p>
              </li>
            )}

            {accountNumber && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Account Number:</p>
                <p className="text-[14px] leading-[14px] font-medium">
                  {accountNumber}
                </p>
              </li>
            )}
            {bank && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Bank Name</p>
                <p className="text-[14px] leading-[14px] font-medium">{bank}</p>
              </li>
            )}
            {purpose && (
              <li className="flex-between ">
                <p className="text-[14px] leading-[14px] ">Purpose:</p>
                <p className="text-[14px] leading-[14px] font-medium">
                  {purpose}
                </p>
              </li>
            )}

            <li className="flex-between ">
              <p className="text-[14px] leading-[14px] ">Date:</p>
              <p className="text-[14px] leading-[14px] font-medium">
                {getFormattedCurrentDay("short")}
              </p>
            </li>

            {naration && (
              <li className="flex-col space-y-1 ">
                <p className="text-[14px] leading-[14px] ">Naration:</p>
                <p className="text-[14px] leading-[14px] font-medium">
                  {naration}
                </p>
              </li>
            )}
          </ul>
        </div>
      </ModalBody>
      <Divider />
      <ModalFooter gap={"16px"}>
        <button
          onClick={onClose}
          className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
        >
          Cancel
        </button>
        <button
          onClick={handleTransfer}
          disabled={isLoading}
          className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
        >
          {isLoading ? (
            <ClipLoader color={"white"} size={20} />
          ) : (
            <> Confirm </>
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default PreviewModal;
