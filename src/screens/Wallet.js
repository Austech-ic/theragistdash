import {
    Add,
    Book,
    Calendar,
    CloseCircle,
    DocumentDownload,
    DocumentUpload,
    Edit,
    ElementEqual,
    Eye,
    FilterSearch,
    Layer,
    Maximize4,
    Message2,
    More,
    RowHorizontal,
    SearchNormal1,
    Trash,
  } from "iconsax-react";
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
  import React, { useState } from "react";
  import { ClipLoader } from "react-spinners";
  
  import ModalLeft from "../components/ModalLeft";
  import { Link, useNavigate } from "react-router-dom";
  import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
  import api from "../api";
  import { enqueueSnackbar } from "notistack";
  import { useQuery } from "@tanstack/react-query";

const Wallet = () => {
  return (
    <div>Wallet</div>
  )
}

export default Wallet