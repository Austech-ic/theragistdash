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
  I3DRotate,
  Layer,
  Link21,
  LinkCircle,
  Maximize4,
  Message2,
  More,
  Copy,
  SearchNormal1,
  Trash,
  InfoCircle,
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
import html2canvas from "html2canvas";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import {
  decryptaValue,
  formatDate,
  formatTime,
} from "../utils/helperFunctions";
import QRCode from "qrcode.react";
import { NumericFormat } from "react-number-format";
import { Tooltip } from "react-tooltip";
import EmptyWallet from "../components/EmptyWallets";
import TableLoading from "../components/TableLoading";

const PaymentLink = () => {
  const elementToCaptureRef = React.createRef();

  const navigate = useNavigate();
  const [createLink, setIsCreateLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [linkData, setLinkData] = useState("");
  const [shouldSetAmount, setShouldSetAmount] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);
  const [copiedRef, setCopiedRef] = useState(null);
  const [searchquery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [linkDetails, setLinkDetails] = useState("");
  const [editslug, setEditSlug] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    amount: "",
    logo: "",
    expiry: "",
    description: "",
    slug: "",
    type: "",
  });

  function closeGenerate() {
    setIsGenerate(false);
  }

  function HandleEditModalClose() {
    ClearForm()
    setIsEditOpen(false);
  }

  function ToggleEditModal(result) {
    setFormValue({
      name: result.name,
      amount: result.amount,
      // logo: result.logo,
      expiry: formatLinkDate(result.expiry_date),
      description: result.description,
      slug: result.slug,
      type: result.type,
    });
    setEditSlug(result.slug);
    setIsEditOpen(!isEditOpen);
  }

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const closeCreateModal = () => {
    setIsCreate(false);
  };

  function ToggleDeleteModal(result) {
    setIsDeleteModal(!isDeleteModal);
    setLinkDetails(result);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  const toggleCreateModal = () => {
    setIsCreateModal(!isCreateModal);
  };

  const toggleImportModal = () => {
    setIsOpenImportModal(!isOpenImportModal);
  };
  const closeImportModal = () => {
    setIsOpenImportModal(false);
  };

  const toggleDelete = (result) => {
    setIsDeleteOpen(!isDeleteOpen);
    setLinkDetails(result);
  };

  const HandleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };

  const toggleCreateLink = () => {
    setIsCreateLink(!createLink);
  };

  const closeCreateLink = () => {
    setIsCreateLink(false);
  };

  const handleSelectLinkType = () => {
    closeCreateModal();
    toggleCreateLink();
  };
  function formatLinkDate(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");

    // Return in the format YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  const Link = [
    {
      id: 1,
      icon: Link21,
      heading: "Single Charge",
      coming: false,
      note: "Generate a payment link to collect a one-time payment from your customer",
    },
    {
      id: 2,
      icon: I3DRotate,
      heading: "Re-occuring Charge",
      coming: true,
      note: "Generate a payment link to collect a re-occuring  payment from your customer",
    },
  ];

  // Function to copy text to the clipboard
  const handleCopy = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedRef(number); // Set copied ref to show feedback
      setTimeout(() => setCopiedRef(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {
      //console.error("Failed to copy:", err);
    }
  };

  const handleGenerate = (link) => {
    setIsGenerateLoading(true);
    setLinkData(link);
    setTimeout(() => {
      setIsGenerateLoading(false);
      setIsGenerate(true);
    }, 4000);
  };
  const captureAndDownload = () => {
    const element = elementToCaptureRef.current;
    html2canvas(element).then((canvas) => {
      // Convert the canvas to a data URL
      const imageDataURL = canvas.toDataURL("image/png");

      // Create a link to download the image
      const a = document.createElement("a");
      a.href = imageDataURL;
      a.download = "PaymentLink-QRCode.png";
      a.click();
    });
  };

  function ClearForm() {
    setFormValue({
      name: "",
      amount: "",
      logo: "",
      expiry: "",
      description: "",
      type: "",
    });
  }

  const editPaymentLink = async () => {
    setIsLoading(true);
    try {
      const response = await api.editLink(editslug, {
        name: formValue.name,
        description: formValue?.description,
        amount: formValue?.amount,
        currency: "NGN",
        currency_symbol: "₦",
        is_amount_fixed: shouldSetAmount,
        type: formValue?.type,
        expiry_date: formValue?.expiry,
        slug: formValue?.slug,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsEditOpen(false);
      ClearForm();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const createPaymentLink = async () => {
    setIsLoading(true);
    try {
      const response = await api.createLink({
        name: formValue.name,
        description: formValue?.description,
        amount: formValue?.amount,
        currency: "NGN",
        currency_symbol: "₦",
        is_amount_fixed: shouldSetAmount,
        type: linkId === 1 ? "single" : "multiple",
        expiry_date: formValue?.expiry,
        slug: formValue?.slug,
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeCreateLink()
            ClearForm();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  async function getLink() {
    const response = await api.getLink({
      params: {
        // page,
        search: searchquery,
        status: searchStatus,
      },
    });
    return response;
  }

  const results = useQuery(
    ["paymentLinks", searchStatus, searchquery],
    () => getLink(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const PayLinkData = results?.data?.data || [];
  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const url = "https://vantapp.com/pay/";

  function truncateString(input, maxLength) {
    if (input.length <= maxLength) {
      return input; // No need to truncate
    }

    const truncated = input.slice(0, maxLength - 3); // Leave space for "..."
    return `${truncated}...`;
  }

  const handleDelete = async () => {
    setIsDeleteOpen(false);
    setIsLoading(true);
    try {
      const response = await api.deleteLink(linkDetails?.slug);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Payment Link Deleted Successfully", { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeDeleteModal()
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className="border-b border-b-[#E4E7EC] h-full p-[16px] md:p-[20px] flex md:flex-row flex-col md:justify-between md:items-center gap-3">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                PaymentLink
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search Link Name"
                value={searchquery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => toggleCreate()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#26ae5f] leading-[20px]">
                Create Payment Link
              </p>

              <Add variant="Linear" color="#26ae5f" size="16" />
            </button>

            <Modal
              isCentered
              isOpen={isCreate}
              onClose={closeCreateModal}
              size="md"
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
                  <LinkCircle
                    size="42"
                    color="#26ae5f"
                    variant="Broken"
                    className="mx-auto"
                  />
                </ModalHeader>
                <ModalCloseButton size={"sm"} />
                <ModalBody
                  py={{ base: "20px", md: "24px" }}
                  px={{ base: "16px", md: "24px" }}
                  className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                >
                  <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium   ">
                    Select Link Type{" "}
                  </p>
                  <div className="flex  items-center mx-auto gap-3 my-3">
                    {Link &&
                      Link.map((result, index) => (
                        <button
                          onClick={() => setLinkId(1)}
                          className={` ${
                            linkId === result.id
                              ? "border-[#26ae5f] border-[1.5px]"
                              : "border-[#98a2b3] border-[0.2px]"
                          }  rounded-[8px] p-2 max-w-[220px] relative`}
                        >
                          <result.icon
                            size="26"
                            color="#26ae5f"
                            variant="Broken"
                            className="mx-auto mb-3"
                          />
                          {result?.coming && (
                            <div className="px-[5px] absolute top-1 right-1 py-[2px] border rounded-xl w-[75px] ">
                              {" "}
                              <p className="text-[10px] font-normal text-[#667185]">
                                Coming Soon
                              </p>
                            </div>
                          )}

                          <p className="text-[16px] font-semibold text-[#667185] leading-[20px] mb-2">
                            {result.heading}
                          </p>
                          <p className="text-[14px] text-[#667185] leading-[20px]">
                            {result.note}
                          </p>
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={handleSelectLinkType}
                    className=" px-4 mx-auto bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[6px] text-[14px] font-medium text-white"
                  >
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Create Payment Link </>
                    )}
                  </button>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Modal
              isCentered
              isOpen={isOpenImportModal}
              onClose={closeImportModal}
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
                  Export PaymentLink
                </ModalHeader>
                <ModalCloseButton size={"sm"} />
                <Divider color="#98A2B3" />
                <ModalBody
                  pt={{ base: "20px", md: "24px" }}
                  px={{ base: "16px", md: "24px" }}
                  pb={{ base: "30px", md: "40px" }}
                  className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                >
                  <p className="text-[14px] text-[#667185] leading-[20px] mb-[20px] ">
                    Select CSV File
                  </p>

                  <input
                    className="flex mb-[20px] h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                    id="csv"
                    name="csv"
                    type="file"
                  />

                  <div className="flex gap-[8px] items-center">
                    {" "}
                    <p className="text-[14px] underline text-[#667185] leading-[20px]  ">
                      Download Sample PaymentLink CSV File
                    </p>
                    <DocumentDownload
                      color="#4CAF50"
                      variant="Bold"
                      size="20px"
                    />
                  </div>
                </ModalBody>
                <Divider />
                <ModalFooter gap={"16px"}>
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
                    Cancel
                  </button>
                  <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
                    {!isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Upload </>
                    )}
                  </button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
        <div className="p-[10px] md:p-[16px] lg:p-[20px]">
          {" "}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Link Name"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={searchquery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              type="text"
              placeholder="Select Item Type"
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8 mt-5">
          <div class="inline-block min-w-full  sm:px-6 lg:px-8">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5  whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Link Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Amount
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Charge Type
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Link
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Preview
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        QR Code
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Expiry Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Date Created
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {results?.isLoading && <TableLoading cols={10} />}
                    {results?.data && results?.data?.data?.length === 0 && (
                      <EmptyWallet
                        cols={10}
                        action={"Payment Links"}
                        subheading={
                          "Your Payment Links will appear here."
                        }
                        // paymentlinkbutton={true}
                        invoicebutton={true}
                      />
                    )}
                  {PayLinkData &&
                    PayLinkData?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {result?.name}
                        </td>
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium  ">
                          <NumericFormat
                            value={result?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={result?.currency_symbol}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.type}{" "}
                        </td>
                        <td className=" py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <div className="flex items-center gap-1">
                            <p> {truncateString(url + result?.slug, 20)}</p>{" "}
                            <button
                              onClick={() => handleCopy(url + result?.slug)}
                              className="hover:-translate-y-1  transition-transform ease-in-out "
                            >
                              {" "}
                              {copiedRef === url + result?.slug ? (
                                <span className="font-normal leading-[12px] text-[10px]">
                                  Copied!
                                </span>
                              ) : (
                                <Copy
                                  size="13"
                                  color="#667185"
                                  variant="Linear"
                                />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#4682f2] font-medium text-left  ">
                          <a
                            href={url + result?.slug}
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center gap-1 underline"
                          >
                            Pay Link
                            <img
                              src="./assets/link.svg"
                              alt="link out"
                              className="h-[18px]"
                            />
                          </a>
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <button
                            onClick={() => handleGenerate(url + result?.slug)}
                            className="py-1 px-2 border-[0.2px] text-[12px] border-[#98a2b3] rounded-[8px] border-l-[2.5px] border-l-[#26ae5f] hover:bg-slate-100 flex items-center gap-[2px]"
                          >
                            Generate{" "}
                            {(isGenerateLoading  && linkData === url + result?.slug) && (
                              <ClipLoader color={"#26ae5f"} size={12} />
                            )}
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <button
                            className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                              result.status === "inactive"
                                ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                                : "bg-[#EDF7EE] text-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                          >
                            <p>{result.status}</p>
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {formatDate(result?.expiry_date)} (at{" "}
                          {formatTime(result?.expiry_date)})
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {formatDate(result?.created_at)} (at{" "}
                          {formatTime(result?.created_at)})
                        </td>

                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <Menu>
                            <MenuButton bg={"none"} _hover={"none"}>
                              <button
                                //onClick={() => handleTransacModalOpen(result)}
                                className="   rounded-sm flex justify-center items-center  hover:bg-[#CBD5E0]  "
                              >
                                <More
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="24"
                                />{" "}
                              </button>
                            </MenuButton>
                            <MenuList maxW="32" className="">
                              <MenuItem
                                onClick={() => ToggleEditModal(result)}
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                              >
                                <Edit
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  Edit Payment Link
                                </p>
                              </MenuItem>

                              <MenuItem
                                onClick={() => ToggleDeleteModal(result)}
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                              >
                                <Trash
                                  variant="Linear"
                                  color="red"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  Delete Payment Link
                                </p>
                              </MenuItem>
                            </MenuList>
                          </Menu>

                          <Modal
                            isCentered
                            isOpen={isDeleteModal}
                            onClose={closeDeleteModal}
                            size="md"
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
                                <svg
                                  className="mx-auto"
                                  width="56"
                                  height="56"
                                  viewBox="0 0 56 56"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="4"
                                    y="4"
                                    width="48"
                                    height="48"
                                    rx="24"
                                    fill="#FCC5C1"
                                  />
                                  <rect
                                    x="4"
                                    y="4"
                                    width="48"
                                    height="48"
                                    rx="24"
                                    stroke="#FEECEB"
                                    stroke-width="8"
                                  />
                                  <path
                                    d="M28 38C33.5 38 38 33.5 38 28C38 22.5 33.5 18 28 18C22.5 18 18 22.5 18 28C18 33.5 22.5 38 28 38Z"
                                    stroke="#F44336"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M28 24V29"
                                    stroke="#F44336"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M27.9961 32H28.0051"
                                    stroke="#F44336"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </ModalHeader>
                              <ModalCloseButton size={"sm"} />
                              <ModalBody
                                py={{ base: "20px", md: "24px" }}
                                px={{ base: "16px", md: "24px" }}
                                className=" px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
                              >
                                <p className=" text-[16px] md:text-lg text-center  text-[#000] leading-[24px] font-medium  ">
                                  Delete PaymentLink
                                </p>

                                <p className="text-[14px]  text-[#667185] leading-[20px] font-normal text-center mt-2  ">
                                  Are you sure you want to delete this
                                  PaymentLink? This action cannot be undone.
                                </p>
                              </ModalBody>
                              <ModalFooter gap={"16px"}>
                                <button
                                  onClick={closeDeleteModal}
                                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleDelete}
                                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                                >
                                  {isLoading ? (
                                    <ClipLoader color={"white"} size={20} />
                                  ) : (
                                    <> Delete </>
                                  )}
                                </button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isGenerate}
        onClose={closeGenerate}
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
            QR Code Generated
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div
              ref={elementToCaptureRef}
              className=" rounded-lg w-[80%] mx-auto  p-[16px] md:p-[20px] relative bg-[#26ae5f]"
            >
              <img
                src="./assets/hanger.png"
                alt="hanger"
                className="mx-auto mb-3"
              />

              <p className="text-[#fff] text-[16px] md:text-[18px] xl:text-[18px] font-semibold text-center leading-[24px] mt-2 mb-2 ">
                Scan To Pay
              </p>
              <p className="text-[14px]  text-[#fff] text-center  leading-[20px] font-normal  mb-6  ">
                Scan the QR code below and follow the link to pay
              </p>

              <QRCode
                value={linkData}
                imageSettings={{ height: "40%" }}
                className="h-10 mx-auto mb-5"
              />
              {/* <img src="./assets/qr.png" alt="qr" className="mx-auto mb-5" /> */}
              <img
                src="./assets/blob.png"
                alt="blob"
                className="absolute bottom-0 left-[33.33%]"
              />

              <p className="text-[14px]  text-[#fff] text-center  leading-[20px] font-normal  mb-6  ">
                Powered by Vant.{" "}
              </p>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={closeGenerate}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={captureAndDownload}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Download </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <ModalLeft isOpen={isEditOpen} onClose={HandleEditModalClose}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[16px] md:p-[20px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Edit PaymentLink
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={HandleEditModalClose} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <div className="p-[12px] md:p-[20px] xl:p-[24px]">
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Link Name
              </label>
              <div className=" relative  flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[40px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="name"
                  value={formValue.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Description
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[40px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="description"
                  value={formValue.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            {/* <div className="mb-[24px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Company Logo
              </label>
              <div className=" relative  mt-[16px]  flex items-center">
                <input
                  className="flex mb-[20px] h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                  id="csv"
                  name="csv"
                  type="file"
                />
              </div>
            </div> */}

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Amount
              </label>
              <div className=" relative   flex items-center">
                <span className="text-[14px] text-[#667185] leading-[20px] absolute left-[16px] pr-2  border-[#D0D5DD] border-r-[0.2px]">
                  NGN
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[40px] pl-[62px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="amount"
                  value={formValue.amount}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className=" flex items-center gap-2  mb-[18px]">
              <input
                type="checkbox"
                placeholder=""
                className="  text-[#124072] text-[10px] leading-[24px] tracking-[0.3px] bg-white rounded-lg focus:ring-[#124072] focus:border-[#124072] "
                // required
                checked={shouldSetAmount} // Sets checkbox status based on state
                onChange={() => setShouldSetAmount(!shouldSetAmount)}
              />
              <label className=" text-[#718096] text-[14px]">
                I want to collect a fix amount on my page.
              </label>
            </div>
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Expiry Date
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="date"
                  placeholder="Enter Title"
                  className="w-full h-[40px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="expiry"
                  value={formValue.expiry}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <Tooltip id="my-tooltip" />

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px] flex items-center gap-1">
                Slug{" "}
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="If you set your slug to be stationaries, your payment link will look like this https://vantapp.com/pay/stationaries"
                  data-tooltip-place="top"
                >
                  <InfoCircle size="16" color="#667185" variant="Bold" />
                </a>
              </label>
              <div className=" relative   flex items-center">
                <span className="text-[12px] text-[#667185] leading-[20px] absolute left-[16px] pr-2  border-[#D0D5DD] border-r-[0.2px]">
                  https://vantapp.com/pay/
                </span>
                <input
                  type="text"
                  placeholder="stationaries"
                  className="w-full h-[40px] pl-[162px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="slug"
                  value={formValue.slug}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={HandleEditModalClose}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={editPaymentLink}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Edit Link</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLeft>

      {/* Create Modal */}
      <ModalLeft isOpen={createLink} onClose={closeCreateLink}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[16px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[28px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Create PaymentLink
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={closeCreateLink} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <div className="p-[12px] md:p-[20px] xl:p-[24px]">
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Link Name
              </label>
              <div className=" relative  flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="name"
                  value={formValue.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Description
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="description"
                  value={formValue.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            {/* <div className="mb-[24px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Company Logo
              </label>
              <div className=" relative  mt-[16px]  flex items-center">
                <input
                  className="flex mb-[20px] h-9 w-full rounded-md  border-input bg-background  text-sm shadow-sm text-[#667185] border-[0.2px] border-[#98A2B3] transition-colors file:border-0 file:border-r-[0.2px] file:h-9 file:bg-[#F9FAFB] file:text-[#667185] file:border-[#D0D5DD] file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f]  disabled:opacity-50"
                  id="csv"
                  name="csv"
                  type="file"
                />
              </div>
            </div> */}

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                Amount
              </label>
              <div className=" relative   flex items-center">
                <span className="text-[14px] text-[#667185]  absolute left-[16px] pr-2  border-[#D0D5DD] border-r-[0.2px]">
                  NGN
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="amount"
                  value={formValue.amount}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className=" flex items-center gap-2  mb-[18px]">
              <input
                type="checkbox"
                placeholder=""
                className="  text-[#124072] text-[10px] leading-[24px] tracking-[0.3px] bg-white rounded-lg focus:ring-[#124072] focus:border-[#124072] "
                // required
                checked={shouldSetAmount} // Sets checkbox status based on state
                onChange={() => setShouldSetAmount(!shouldSetAmount)}
              />
              <label className=" text-[#718096] text-[14px]">
                I want to collect a fix amount on my page.
              </label>
            </div>
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]">
                Expiry Date
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="date"
                  placeholder="Enter Title"
                  className="w-full h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="expiry"
                  value={formValue.expiry}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[18px]">
            <Tooltip id="my-tooltip" />

            <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px] flex items-center gap-1">
                Slug{" "}
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="If you set your slug to be stationaries, your payment link will look like this https://vantapp.com/pay/stationaries"
                  data-tooltip-place="top"
                >
                  <InfoCircle size="16" color="#667185" variant="Bold" />
                </a>
              </label>
              <div className=" relative   flex items-center">
                <span className="text-[12px] text-[#667185] leading-[20px] absolute left-[16px] pr-2  border-[#D0D5DD] border-r-[0.2px]">
                  https://vantapp.com/pay/
                </span>
                <input
                  type="text"
                  placeholder="stationaries"
                  className="w-full h-[40px] pl-[162px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  required
                  name="slug"
                  value={formValue.slug}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={closeCreateLink}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={createPaymentLink}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Link</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalLeft>
    </div>
  );
};

export default PaymentLink;
