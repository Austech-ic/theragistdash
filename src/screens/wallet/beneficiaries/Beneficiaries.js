import {
  Add,
  ArrowDown2,
  Bank,
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
  RecordCircle,
  RowHorizontal,
  SearchNormal1,
  TickCircle,
  Trash,
} from "iconsax-react";
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
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

import ModalLeft from "../../../components/ModalLeft";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import api from "../../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../../../components/TableLoading";

import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import { decryptaValue } from "../../../utils/helperFunctions";
import EmptyTable from "../../../components/EmptyTable";
import EmptyWallet from "../../../components/EmptyWallets";
import moment from "moment";
import { PackageOpen } from "lucide-react";
import { NumericFormat } from "react-number-format";
import InputField from "../../../components/InputField";
import { DocUrl } from "../../../utils/config";
import { motion as m } from "framer-motion";

const Beneficiaries = () => {
  const navigate = useNavigate();
  const [isViewModal, setIsViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [banksVisible, setBanksVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [resultId, setResultId] = useState(null);
  const [image, setImage] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    description: "",
    status: null,
  });
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [toKyc, setToKyc] = useState("");
  const [toBvn, setToBvn] = useState("");
  const [toSession, setToSession] = useState("");
  const [toClient, setToClient] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("logo/")) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  function HandleEditModalClose() {
    setIsEditOpen(false);
    ClearForm();
  }

  function ToggleEditModal(id) {
    setIsEditOpen(!isEditOpen);
    setResultId(id);
    setFormValue({
      name: id?.name,
      price: id?.price,
      description: id?.description,
    });
    setPreview(id?.image ? DocUrl + id?.image : "");
  }

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const closeCreateModal = () => {
    setIsCreate(false);
    ClearForm();
  };

  function ToggleDeleteModal(id) {
    setIsDeleteModal(!isDeleteModal);
    setResultId(id);
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

  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const ClearForm = () => {
    setFormValue({
      name: "",
      lastName: "",
      price: "",
      description: "",
      status: null,
    });
  };

  const UpdateProduct = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", formValue?.price);
    formData.append("name", formValue?.name);
    formData.append("description", formValue?.description);
    try {
      const response = await api.updateProduct(resultId?.id, formData);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsEditOpen(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const DeleteProduct = async () => {
    setIsLoading(true);

    try {
      const response = await api.deleteProduct(resultId);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeDeleteModal(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const createBeneficiary = async () => {
    if (!accountNumber  || !selectedBank || !accountName ) {
        // Show an error message or do something else here
        enqueueSnackbar("Required field is Empty", { variant: "error" });
  
        return;
      }
    setIsLoading(true);

    try {
      const response = await api.createBeneficiaries({
        
            name: accountName,
            account_number: accountNumber,
            bank: selectedBank?.name,
            bank_code: selectedBank?.code
          
      });
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Beneficiary Created Successfully", { variant: "success" });
      results.refetch();
      setIsLoading(false);
      setIsCreate(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  async function getBeneficiary(page) {
    const response = await api.getBeneficiary({
      params: {
        page,
        search,
      },
    });
    return response;
  }

  const results = useQuery(
    ["getBeneficiary", page, search],
    () => getBeneficiary(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );



  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  async function getBanks(page) {
    const response = await api.getBanks({ params: { page } });
    return response;
  }

  const BankQuery = useQuery(["bank"], () => getBanks(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  let Bankss = BankQuery?.data;
  const [filteredData, setFilteredData] = useState(Bankss || []);
  useEffect(() => {
    setFilteredData(BankQuery.data);
  }, [BankQuery.data]);

  const handleSearch = (query) => {
    const filteredbanks = BankQuery.data.filter((bank) =>
      bank.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredbanks);
  };

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setBanksVisible(false);
  };

  const handleChange = (text) => {
    if (accountNumber !== "" && selectedBank == "") {
      // Show an error message or do something else here
      enqueueSnackbar("Please Select a bank", { variant: "error" });

      return;
    }

    if (text.length == 10) {
      // Search from the API here, using the input text as the search query
      // searchAPI(text);

      verifyAccount();
    }
  };

  useEffect(() => {
    handleChange(accountNumber);
  }, [accountNumber]);
  const verifyAccount = async () => {
    if (accountNumber !== "" && !selectedBank) {
      // Show an error message or do something else here
      enqueueSnackbar("Please Select a bank 😞", { variant: "error" });

      return;
    }
    setNameLoading(true);
    try {
      const response = await api.verifyAccountNunmber({
        account_number: accountNumber,
        account_bank: selectedBank?.code,
      });
    
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      //console.log("dddd", decryptRes?.status);
      if (decryptRes.status === "error") {
        // setAccountName(response.data.name)
        setAccountName("");

        enqueueSnackbar(decryptRes.message, { variant: "error" });
      }
      if (decryptRes.status === "success") {
        enqueueSnackbar(decryptRes.message, { variant: "success" });

        setAccountName(decryptRes.data.name);
        setToBvn(decryptRes.data.bvn);
        setToKyc(decryptRes.data.status);
        setToSession(decryptRes.data.account.id);
        setToClient(decryptRes.data.clientId);
      }
      setNameLoading(false);
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      setAccountName("");

      setNameLoading(false);
    }
  };

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className=" h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Beneficiaries
              </p>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by Beneficiary name.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            <button
              onClick={() => toggleCreate()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#26ae5f] leading-[20px]">
                Create Beneficiary
              </p>

              <Add variant="Linear" color="#26ae5f" size="16" />
            </button>

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
                  Export Transactions
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
                      Download Sample Transactions CSV File
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
                      <div className="flex justify-center whitespace-nowrap text-center px-5   gap-[6px] md:gap-[12px] items-center">
                        Account Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center whitespace-nowrap px-5   gap-[6px] md:gap-[12px] items-center">
                        Account Number
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center text-center px-5 whitespace-nowrap  gap-[6px] md:gap-[12px] items-center">
                        Bank Name
                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {results?.isLoading && <TableLoading cols={7} />}
                  {results?.data && results?.data?.data?.length === 0 && (
                    // decryptaValue(results?.data?.data) === 0 &&
                    <EmptyWallet
                      cols={8}
                      action={"Beneficiaries"}
                      subheading={"Your Beneficiaries will appear here."}
                    />
                  )}
                  {/*  {TaskSummaryData &&
                      results?.data?.data?.map((result) => ( */}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {result?.name}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                        {result?.account_number}
                         
                         
                         
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                          {result?.bank}
                        </td>

                      
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {/* <div className="flex items-center justify-between">
        <p className="text-[14px] leading-[16px] tracking-[0.2px] text-[#667185]">
          Showing {results?.data?.meta.from || 0} -{" "}
          {results?.data?.meta.to || 0} of {results?.data?.meta.total} results |
          Page {results?.data?.meta.current_page} of{" "}
          {results?.data?.meta.last_page}
        </p>
        <div>
          <button
            onClick={() => handlePrev(results?.data?.links?.prev)}
            disabled={!results?.data?.links.prev}
            className={`rounded-tl-lg rounded-bl-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.prev
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Prev
          </button>

          <button
            onClick={() => handleNext(results?.data?.links?.next)}
            disabled={!results?.data?.links.next}
            className={`rounded-tr-lg rounded-br-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.next
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Next
          </button>
        </div>
      </div> */}

      <Modal
        isCentered
        isOpen={isDeleteModal}
        onClose={closeDeleteModal}
        size={{ base: "xs", sm: "md", lg: "xl" }}
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
              <rect x="4" y="4" width="48" height="48" rx="24" fill="#FCC5C1" />
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
                stroke="#26ae5f"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28 24V29"
                stroke="#26ae5f"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.9961 32H28.0051"
                stroke="#26ae5f"
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
              Delete Product
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-normal text-center mt-2  ">
              Are you sure you want to delete this Product? This action cannot
              be undone.
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
              onClick={DeleteProduct}
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

      {/* Create Modal */}
      <ModalLeft isOpen={isCreate} onClose={closeCreateModal}>
        <div>
          <div className="border-b border-b-[#E4E7EC] p-[10px] md:p-[14px]  flex justify-between items-center ">
            <div className="flex items-center gap-[16px]">
              <Maximize4 variant="Linear" color="#667185" size="16" />{" "}
              <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
              <div className="flex items-center">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  Create Beneficiary
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={closeCreateModal} className=" ">
                <CloseCircle variant="Linear" color="#667185" size="20" />
              </button>
            </div>
          </div>

          <div className="p-[12px] md:p-[20px] xl:p-[24px]">
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Bank
              </label>
              <button
                onClick={() => setBanksVisible(!banksVisible)}
                className="w-full h-[38px] pl-[10px] pr-[8px] flex-between py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
              >
                <div className="flex-row banks-center">
                  {selectedBank ? (
                    <p className="text-[#272F35] font-normal font-i_normal text-[12px] leading-[15px] tracking-[0.028px] ">
                      {selectedBank?.name}
                    </p>
                  ) : (
                    <p className="text-[#838383] font-normal font-i_normal text-[12px] leading-[15px]  tracking-[0.028px] ">
                      {"Select a Bank"}
                    </p>
                  )}
                </div>
                <ArrowDown2 variant="Linear" color={"#838383"} size={14} />
              </button>
              {banksVisible && (
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
                  className="w-full h-[300px] overflow-y-auto  px-2 py-3 text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                >
                  <div className=" relative  w-full mx-auto mb-2  flex items-center">
                    <SearchNormal1
                      size="14"
                      color="#98A2B3"
                      className="absolute left-[16px]"
                    />

                    <input
                      type="email"
                      placeholder="search bank"
                      className="w-full  h-[36px] pl-[44px] py-[8px] text-[14px] text-[#344054]  bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                      required
                      autoComplete="on"
                      name="email"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                  {filteredData &&
                    filteredData?.map((bank, index) => (
                      <button
                        onClick={() => handleSelectBank(bank)}
                        className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                        style={{
                          borderColor: "rgba(18, 3, 58, 0.10)",
                          borderWidth: 0.2,
                        }}
                      >
                        <div className="flex-item">
                          {bank.logo ? (
                            <img
                              src={bank?.logo}
                              alt=""
                              style={{ height: 24, width: 24 }}
                              className="mr-3 rounded-full"
                            />
                          ) : (
                            <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3 ">
                              <Bank
                                size="14"
                                color="#BAB4B2FF"
                                variant="Bold"
                              />
                            </div>
                          )}
                          <p className="text-[#272F35] flex-1 font- font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                            {bank?.name}
                          </p>
                        </div>

                        {selectedBank?.code === bank?.code ? (
                          <RecordCircle
                            size="16"
                            color="#26ae5f"
                            variant="Bold"
                          />
                        ) : (
                          <RecordCircle
                            size="16"
                            color="#DEDEDE"
                            variant="Bold"
                          />
                        )}
                      </button>
                    ))}
                </m.div>
              )}

              <div className="my-[18px]">
                <label className="text-[14px] text-[#667185]    mb-[8px] ">
                  Account Number
                </label>
                <div className=" relative    flex banks-center">
                  <input
                    type="text"
                    placeholder="0002-XXXX-XX"
                    className="w-full h-[38px] pl-[10px] pr-[8px] py-[8px] text-[14px] text-[#344054]   placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none  focus:border-[#26ae5f] "
                    name="accountNumber"
                    id="full-name"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              {nameLoading && (
                <div className="mt-2 ml-2">
                  {" "}
                  <ClipLoader color={"green"} size={16} />
                </div>
              )}
            </div>

            {accountName && (
              <div className="mb-5 p-[12px] rounded-[8px] bg-[#EDF7EE] text-[#4CAF50] flex-item ">
                <TickCircle color="#4CAF50" variant="Bold" size={16} />
                <p className="text-[#4CAF50] ml-2 font-normal font-i_normal text-[14px] leading-[15px]   tracking-[0.028px] ">
                  {accountName}
                </p>
              </div>
            )}

            <div className="py-[20px] border-t border-b-[#E4E7EC] flex-item  justify-end">
              <div className="flex-item gap-2">
                {" "}
                <button
                  onClick={closeCreateModal}
                  className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={createBeneficiary}
                  className="border-[0.2px]  border-[#98A2B3] w-[140px] bg-[#26ae5f] flex items-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
                >
                  {isLoading ? (
                    <ClipLoader color={"white"} size={20} />
                  ) : (
                    <> Create Beneficiary</>
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

export default Beneficiaries;
