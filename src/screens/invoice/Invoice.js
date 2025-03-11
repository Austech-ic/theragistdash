import {
  Add,
  DocumentDownload,
  DocumentUpload,
  Eye,
  FilterSearch,
  More,
  SearchNormal1,
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
import React, { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";

import { Link, useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import EmptyWallet from "../../components/EmptyWallets";
import { formatDate, formatTime } from "../../utils/helperFunctions";
import TableLoading from "../../components/TableLoading";
import { NumericFormat } from "react-number-format";
import { UserContext } from "../../utils/UserProvider";

const Invoices = () => {
  const { profile } = useContext(UserContext);

  const navigate = useNavigate();
  const [createLink, setIsCreateLink] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState("");
  const [searchquery, setSearchQuery] = useState("");




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

  

  async function getInvoice() {
    const response = await api.getInvoice({
      params: {
        // // page,
        search: searchquery,
        status: searchStatus,
      },
    });
    return response;
  }

  const results = useQuery(["invoice",  searchStatus, searchquery], () => getInvoice(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const InvoiceData = results?.data?.data || [];
  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
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
                value={searchquery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] ">
            {/* <button
              onClick={() => toggleImportModal()}
              className="flex items-center gap-[8px] "
            >
              <p className="text-[14px] text-[#667185] leading-[20px]">
                Export CSV
              </p>

              <DocumentUpload variant="Linear" color="#667185" size="16" />
            </button> */}
              <button
                onClick={() => navigate("/createinvoice", {
                  state: { invoiceNo: InvoiceData[0]?.invoice_no },
                })}
                className="flex items-center gap-[8px] "
              >
                <p className="text-[14px] text-[#26ae5f] leading-[20px]">
                  Create Invoice
                </p>

                <Add variant="Linear" color="#26ae5f" size="16" />
              </button>
          </div>
        </div>
        <div className="p-[10px] md:p-[16px] lg:p-[20px]">
          {" "}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="search by invoice number..."
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-1 py-[6px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
            
              value={searchquery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

<select
              type="text"
              placeholder="Select Item Type"
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-1 py-[6px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
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
                      Invoice No.
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Amount
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Requested
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.isLoading && <TableLoading cols={8} />}
                  {results?.data && results?.data?.data?.length === 0 && (
                    <EmptyWallet
                      cols={8}
                      action={"Invoice"}
                      subheading={"Your invoices will appear here."}
                      // invoicebutton={true}
                      paymentlinkbutton={true}
                    />
                  )}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          {result?.invoice_no}
                        </td>
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          <NumericFormat
                            value={result?.total_amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={result?.currency_symbol}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          {result?.customer?.email}
                        </td>
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          {formatDate(result?.created_at)} (at{" "}
                          {formatTime(result?.created_at)}){" "}
                        </td>

                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          <button
                            className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                              result.status === "pending"
                                ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                                : result.status === "Ongoing"
                                ? "bg-[#F9FAFB] text-[#667185]"
                                : "bg-[#EDF7EE] text-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                          >
                            <p>{result.status}</p>
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap text-center py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                          <Menu>
                            <MenuButton bg={"none"} _hover={"none"}>
                              <button
                                //onClick={() => handleTransacModalOpen(result)}
                                className="   rounded-sm flex justify-center items-center  hover:bg-[#CBD5E0]  "
                              >
                                <More
                                  variant="Lionear"
                                  color="#98A2B3"
                                  size="18"
                                />{" "}
                              </button>
                            </MenuButton>
                            <MenuList maxW="32" className="">
                              <MenuItem
                                onClick={() =>
                                  navigate("/saved-invoice", {
                                    state: {
                                      invoiceData: result,
                                      profile: profile,
                                    },
                                  })
                                }
                                w="full"
                                color="#98A2B3"
                                mb="10px"
                              >
                                <Eye
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  View Invoice
                                </p>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
