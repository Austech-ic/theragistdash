import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import SearchInput from "../../components/common/SearchInput";
import { ArrowSquareLeft, Edit, Eye, ProfileAdd, Trash } from "iconsax-react";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
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
} from "@chakra-ui/react";
import api from "../../api";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import EmtyTable from "../../components/common/EmtyTable";
import InputField from "../../components/InputField";
import { formatDate } from "../../utils/helperFunctions";
import Status from "../../components/common/Status";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const CompanyUsers = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreate, setIsCreate] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isSuspend, setIsSuspend] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [resultId, setResultId] = React.useState("");
  const [listType, setListType] = React.useState("all");
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const location = useLocation();
  const companyId = location?.state?.id;

  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
    ClearForm();
  };
  const openDelete = (id) => {
    setResultId(id);

    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };

  const openSuspend = (id) => {
    setResultId(id);

    setIsSuspend(true);
  };
  const closeSuspend = () => {
    setIsSuspend(false);
  };


  async function getCompanyUser(page) {
    const response = await api.getCompanyUser(companyId, {
      params: {
        search: search,
      },
    });
    return response;
  }

  const results = useQuery(["xxxx", listType, search], () => getCompanyUser(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const companyData = results?.data?.data || [];

  const pieData = {
    labels: ["Avalaible Session", "Used Session"],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          companyData?.patient_gender?.Female,
          companyData?.patient_gender?.Male,
        ],
        backgroundColor: ["#F7A30A", "#00B0C7"],
        borderColor: ["#F7A30A", "#00B0C7"],
        borderWidth: 0.5,
      },
    ],
  };

  const createUser = async () => {
    setIsLoading(true);

    try {
      const response = await api.createCompanyUser({
        username: formValue.name,
        email: formValue.email,
        phone_number: formValue.phone,
        company: companyId,
      });
      enqueueSnackbar(" User Created Successfully", {
        variant: "success",
      });
      results.refetch();
      setIsLoading(false);
   ClearForm();
    } catch (error) {
      enqueueSnackbar(error.details, { variant: "error" });

      setIsLoading(false);
    }
  };
  const deleteUser = async () => {
    setIsLoading(true);

    try {
      const response = await api.deleteUser(resultId);
      enqueueSnackbar(response?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeDelete(false);
      setResultId("");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const suspendUser = async () => {
    setIsLoading(true);

    try {
      const response = await api.suspendUser(resultId);
      enqueueSnackbar(response?.message, { variant: "success" });
      results.refetch();
      setIsLoading(false);
      closeSuspend();
      setResultId("");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  function ClearForm(){
    setFormValue({
      name: "",
      email: "",
      phone: "",
    });
  }
  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div>
        <div className="flex justify-between items-center mb-[20px] md:mb-[25px] xl:mb-[30px]">
          <Link to="/company-management">
            <div className="flex items-center gap-1 mb-4 md:mb-5">
              <ArrowSquareLeft color="#292D32" size={16} />
              <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
                Company User details
              </p>
            </div>
          </Link>
          <button
            onClick={openCreateModal}
            className="rounded-[8px] py-[12px] px-4 flex items-center gap-1 text-white  primary-bg"
          >
            <div className="flex items-center gap-1">
              <ProfileAdd
                variant="Bold"
                color="#fff"
                className="h-[14px] md:h-[16px]"
              />

              <p>Add User</p>
            </div>
            {isLoading && <ClipLoader color={"white"} size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between ">
          <SearchInput
            placeholder={"Search User"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-[12px] mt-5 w-[200px] md:w-[300px] lg:w-[400px] bg-[#FBFBFB] border border-[#E1E1E1] p-[10px] md:p-[15px]">
          <p className=" text-sm  text-[#282828] font-medium ">
            Session Overview{" "}
          </p>
          <div className=" py-5">
            <Doughnut data={pieData} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block  min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        SN{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Name{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Registration Date
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Attended session
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Email
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companyData && companyData?.length < 1 && (
                    <EmtyTable
                      name="Add User"
                      label={"No User Registered yet"}
                      cols={6}
                      action={openCreateModal}
                    />
                  )}

                  {companyData?.map((item, index) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                        {index + 1}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                        <p className="font-medium whitespace-nowrap">
                          {item?.username}
                        </p>
                      </td>
                      <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                        {formatDate(item?.date_joined)}
                      </td>
                      <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                        {item?.session_used}
                      </td>
                      <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                        {item?.email}
                      </td>

                      <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                        {/* <div className="flex gap-1 bg-[#91C561] bg-opacity-15 px-[12px] py-[4px] text-[#008D36] items-center rounded-xl">
                          <svg
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1L4.75 9L1 5.36364"
                              stroke="#008D36"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p>{item?.status}</p>
                        </div>{" "} */}

                        <Status status={item?.status} />
                      </td>
                      <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                        <div className="flex items-center gap-1">
                          <Link to="/user/user-details" state={item}>
                            <Eye
                              size="20"
                              variant="Bold"
                              color="#F7A30A"
                              className="cursor-pointer"
                            />
                          </Link>
                          <Edit
                            onClick={() => openSuspend(item?.id)}
                            size="20"
                            variant=""
                            color="blue"
                            className="cursor-pointer"
                          />
                          <Trash
                            onClick={() => openDelete(item?.id)}
                            size="20"
                            variant="Bold"
                            color="red"
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend User Modal */}
      <Modal
        isCentered
        isOpen={isSuspend}
        onClose={closeSuspend}
        size={{ base: "xs", sm: "md" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
          >
            <p className=" text-[16px] md:text-lg text-center mt-4  text-[#000] leading-[24px] font-medium  ">
              You about to Suspend this User
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to suspend this User? This action will
              restrict their access to the platform till it is undone.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeSuspend();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={suspendUser}
              className=" w-[99px] text-center bg-[#F7A30A] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Suspend </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
      {/* Delete User Modal */}
      <Modal
        isCentered
        isOpen={isDelete}
        onClose={closeDelete}
        size={{ base: "xs", sm: "md" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
          >
            <p className=" text-[16px] md:text-lg text-center mt-4  text-[#000] leading-[24px] font-medium  ">
              You about to Delete this User{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this User? This action will
              Permanently delete the councilor’s profile on the platform.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeDelete();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={deleteUser}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Delete </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isCreate}
        onClose={closeCreate}
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
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={"400"}
          >
            <div className="items-center">Create Company </div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <>
              <div className="mb-[8px] mt-4 md:mt-5">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Username<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    placeholder="Enter name"
                    value={formValue.name}
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Email<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="">
                  <InputField
                    type="email"
                    placeholder="e.g. abc@website.com"
                    value={formValue.email}
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="mb-[8px] ">
                <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                  Phone Number<sup className="text-[#A97400]">*</sup>
                </label>
                <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <select className="w-[20%] h-[38px] pl-[8px] py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] ">
                    <option>+234</option>
                    {/* <option>+234</option>
                    <option>+234</option> */}
                  </select>
                  <InputField
                    type="email"
                    placeholder="00000000000"
                    value={formValue.phone}
                    name="phone"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            </>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            <button
              onClick={() => {
                createUser();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Create User </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompanyUsers;
