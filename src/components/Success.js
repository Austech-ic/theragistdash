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
import Lottie from "react-lottie";
import animationData from "../assets/comingSoon.json";
import { TickCircle } from "iconsax-react";

const Success = ({isSuccess, closeIsSuccess}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
  return (
   
    <Modal
    isCentered
    isOpen={isSuccess}
    onClose={closeIsSuccess}
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
            className="text-[18px]   font-medium leading-[24px] md:leading-[24px]"
          >
 <div className="flex justify-center mb-4">
          <TickCircle size="50" className="text-green-500" />
        </div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
          

        {/* Title */}
        <h2 className="text-xl text-center font-semibold text-gray-800">Transaction Successful</h2>

        {/* Description */}
        <p className="text-sm text-center text-gray-600 mt-2">
          Your transaction was completed successfully.
        </p>

        {/* Action Button */}
        <button
          onClick={closeIsSuccess}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Close
        </button>

        
          </ModalBody>

  </ModalContent>
      </Modal>
  )
}

export default Success