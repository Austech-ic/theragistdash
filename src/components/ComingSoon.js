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

const ComingSoon = ({closeComingSoon, isComingSoon}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
  return (
   
    <Modal
    isCentered
    isOpen={isComingSoon}
    onClose={closeComingSoon}
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
                      <Lottie options={defaultOptions} height={200} width={200} />

          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <p className=" text-[20px] md:text-[24] text-center  text-[#616060] leading-[24px] font-semibold ">
              Coming Soon!!
            </p>

        
          </ModalBody>

  </ModalContent>
      </Modal>
  )
}

export default ComingSoon