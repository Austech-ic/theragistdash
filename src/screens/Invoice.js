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

const Invoices = () => {
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
  const [shouldSetAmount, setShouldSetAmount] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);

  function closeGenerate() {
    setIsGenerate(false);
  }

  function HandleEditModalClose() {
    setIsEditOpen(false);
  }

  function ToggleEditModal() {
    setIsEditOpen(!isEditOpen);
  }

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const closeCreateModal = () => {
    setIsCreate(false);
  };

  function ToggleDeleteModal(id) {
    setIsDeleteModal(!isDeleteModal);
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

  const toggleDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };
  const HandleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };
  const result = [{ status: "Success" }];

  const toggleCreateLink = () => {
    setIsCreateLink(!createLink);
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
  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className="border-b border-b-[#E4E7EC] h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Issue Invoice
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => toggleImportModal()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#667185] leading-[20px]">
                Export CSV
              </p>

              <DocumentUpload variant="Linear" color="#667185" size="16" />
            </button>
            <Link to="/createinvoice">
              <button
                //onClick={() => }
                className="flex items-center gap-[8px] "
              >
                <p className="text-[14px] text-[#667185] leading-[20px]">
                  Create Invoice
                </p>

                <Add variant="Linear" color="#667185" size="16" />
              </button>
            </Link>

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
              placeholder="search by invoice number..."
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              required
              
              
            />

            <buttion className="h-[44px] w-[44px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <FilterSearch variant="Linear" color="#4CAF50" size="20" />
            </buttion>
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
                        Invoice Number
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
                        Customer
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  whitespace-nowrap gap-[6px] md:gap-[12px] items-center my-0">
                        Requested
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
                  </tr>
                </thead>
                <tbody>
                  
                  <tr key="_" className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      #124072
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      #120,000.00
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      customer@gmail.com
                    </td>
                    <td className=" py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      <div className="">Sep 11, 2024 (at 03.00 AM)</div>
                    </td>

                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      <button
                        className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                          result.status === "Pending"
                            ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                            : result.status === "Ongoing"
                            ? "bg-[#F9FAFB] text-[#667185]"
                            : "bg-[#EDF7EE] text-[#4CAF50]"
                        }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                      >
                        <p>Active</p>
                      </button>{" "}
                    </td>
                  </tr>
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
              <img src="./assets/qr.png" alt="qr" className="mx-auto mb-5" />
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
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
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
    </div>
  );
};

export default Invoices;
