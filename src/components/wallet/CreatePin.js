import React, { useRef, useState } from "react";
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
import { ArrowLeft2 } from "iconsax-react";
import { enqueueSnackbar } from "notistack";
import api from "../../api";
import { decryptaValue } from "../../utils/helperFunctions";

const CreatePin = ({ isCreatePin, setIsCreatePin, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [validatePin, setValidatePin] = useState(false);
  const userRef = useRef();
  const userRef2 = useRef();

  const handlePin = async () => {
    setIsLoading(true);
    if (!validatePin) {
      if (!pin1) {
        enqueueSnackbar("Pleae enter your desired pin");
        return;
      } else {
        setValidatePin(true);
        setIsLoading(false);
      }
    }

    if (validatePin) {
      if (!pin2) {
        enqueueSnackbar("Pleae re-enter your pin");
        return;
      }
      try {
        const response = await api.setPin({
          pin: pin2,
        });

        const decryptRes = JSON.parse(decryptaValue(response?.data));


          enqueueSnackbar(decryptRes.message, { variant: "success" });
          setIsCreatePin(false);
          refetch();
     
        setIsLoading(false);
      } catch (error) {
        //console.log(error.message);
        enqueueSnackbar(error.message, { variant: "error" });

        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isCreatePin}
      onClose={() => setIsCreatePin(false)}
      size="xl"
      style={{ borderRadius: 12 }}
      motionPreset="slideInBottom"
      className="rounded-[12px]"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          py="4"
          color="#000000"
          className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
        >
          Create Pin
        </ModalHeader>
        <ModalCloseButton size={"sm"} />
        <Divider color="#98A2B3" />
        <ModalBody
          pt={{ base: "20px", md: "24px" }}
          px={{ base: "16px", md: "24px" }}
          pb={{ base: "30px", md: "40px" }}
          className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
        >
          {validatePin ? (
            <button onClick={() => setValidatePin(false)}>
              <ArrowLeft2 size={18} />
            </button>
          ) : (
            ""
          )}
          <p className="text-[#667185] text-md mb-5 w-[90%] text-center">
            {validatePin
              ? "Re-enter your 4-digit pin"
              : "Enter your 4-digit pin"}
            {/* {hideEmail(location.state.email)} */}
          </p>
          <div className="flex justify-center my-6">
            {!validatePin ? (
              <OTPInput
                value={pin1}
                className="border-[#000] "
                onChange={setPin1}
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
            ) : (
              <OTPInput
                //   className=" h-[44px] bg-[#DBDCDDFF]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                value={pin2}
                className="border-[#000] "
                onChange={setPin2}
                autoFocus
                ref={userRef2}
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
            )}
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter gap={"16px"}>
          <button
            onClick={() => setIsCreatePin(false)}
            className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
          >
            Cancel
          </button>
          <button
            onClick={handlePin}
            className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
          >
            {isLoading ? <ClipLoader color={"white"} size={20} /> : <> Send </>}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePin;
