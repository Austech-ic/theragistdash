import React, { useState } from "react";
import {
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


const Notification = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
 
  const [phase, setPhase] = useState(1);

  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
    setPhase(1)
  };
  const openDelete = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };


  return (
   <></>
  );
};

export default Notification;
