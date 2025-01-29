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


const PinModal = ({isLoading, pin,setPin, handlePin, onClose, color}) => {
    const userRef = useRef();
  return (
    <>
      {" "}
      <ModalHeader
        py="4"
        color="#000000"
        className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
      >
        Enter Transaction Pin
      </ModalHeader>
      <ModalCloseButton size={"sm"} />
      <Divider color="#98A2B3" />
      <ModalBody
        pt={{ base: "20px", md: "24px" }}
        px={{ base: "16px", md: "24px" }}
        pb={{ base: "30px", md: "40px" }}
        className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
      >
        <p className="text-[#667185] text-md mb-5 w-[100%] text-center">
          Enter your 4-digit transaction pin
          {/* {hideEmail(location.state.email)} */}
        </p>
        <div className="flex justify-center my-6">
          <OTPInput
            //   className=" h-[44px] bg-[#DBDCDDFF]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            value={pin}
            className="border-[#000] "
            onChange={setPin}
            autoFocus
            ref={userRef}
            OTPLength={4}
            otpType="number"
            disabled={false}
            secure
            //   style
            inputStyles={{
              padding: "5px",
              // width: "46px",
              // height: "46px",
              backgroundColor: "#DBDCDDFF",
              border: "#000",
              borderRadius: "5px",
            }}
          />
        </div>
      </ModalBody>
      <Divider />
      <ModalFooter gap={"16px"}>
        <button onClick={onClose}  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black">
          Cancel
        </button>
        <button onClick={handlePin} disabled={isLoading} className={`border-[0.2px]  border-[#98A2B3] w-[99px] ${color ? `bg-[${color}]` : "bg-[#26ae5f]"  } flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white`}>

          {isLoading ? <ClipLoader color={"white"} size={20} /> : <> Send </>}
        </button>
      </ModalFooter>
    </>
  );
};

export default PinModal;
