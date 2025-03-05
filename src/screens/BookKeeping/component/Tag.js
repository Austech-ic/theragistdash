import { Add, Edit, Menu, Trash } from "iconsax-react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
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
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import InputField from "../../../components/InputField";
import {
  decryptaValue,
  truncateSentence,
} from "../../../utils/helperFunctions";

const Tag = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
  });

  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const editTag = (item) => {
    setIsEditModal(true);
    setEditId(item.id);
    setFormValue({
      name: item?.name,
    });
  };
  const closeEditModal = () => {
    setDeleteId("");
    setIsEditModal(false);
    clearForm();
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const toggleCreateModal = () => {
    setIsCreateModal(!isCreateModal);
  };

  const closeCreateModal = () => {
    setIsCreateModal(false);
  };

  const getTagQuery = useQuery(["Tag"], () => getTag(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  async function getTag() {
    try {
      const response = await api.getTags();

      return response;
    } catch (error) {
      return error;
    }
  }
  async function createTags() {
    setIsLoading(true);
    try {
      const response = await api.createTags({
        name: formValue.name,
      });

      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Category Created Successfully", { variant: "success" });
      setIsCreateModal(false);
      clearForm();
      getTagQuery.refetch();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  }

  async function updateTag() {
    setIsLoading(true);
    try {
      const response = await api.updateTag(editId, {
        name: formValue.name,
      });

      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar("Tag Updated Successfully", { variant: "success" });
      setIsEditModal(false);
      clearForm();
      getTagQuery.refetch();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  }

  async function deleteTag(id) {
    setDeleteId(id);
    setIsLoading(true);
    try {
      const response = await api.deleteTag(id);
      const decryptRes = JSON.parse(decryptaValue(response?.data));
      enqueueSnackbar(decryptRes?.message, { variant: "success" });
      getTagQuery.refetch();
      //refetch()
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  }

  const clearForm = () => {
    setFormValue({
      name: "",
    });
  };
  return (
    <div className="">
      <div className="rounded-lg overflow-hidden ">
        <div className="flex-between bg-white p-3">
          <div className="">
            <p className=" text-[14px] md:text-base  text-[#000] font-medium text-left ">
              Items
            </p>
          </div>
          <button
            onClick={toggleCreateModal}
             className="px-2 py-1 text-[13px] text-gray-500 flex justify-center items-center bg-[#F0F2F5] hover:bg-opacity-75 rounded-md"
                   >
                    Add Tag <Add variant="Linear" color="#26ae5f" size="16" />
                   </button>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
            <thead className="bg-light-gray">
              <tr className="">
                <th
                  scope="col"
                  className=" px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] text-[#98A2B3]  font-medium tracking-[0.2%]"
                >
                  <div className="flex  items-center">
                    <Menu variant="Bold" color="#667185" size="16" />
                  </div>
                </th>
                <th
                  scope="col"
                  className=" px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] text-[#98A2B3]  font-medium tracking-[0.2%]"
                >
                  Tag
                </th>

                <th
                  scope="col"
                  className=" px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[15px] text-[#98A2B3]  font-medium tracking-[0.2%]"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <div>Loading...</div>}
              {!isLoading && getTagQuery?.data?.data?.length === 0 && (
                <tr>
                  <td className="text-center" colspan="3">
                    <img
                        src="/file.png"
                        className="mx-auto mt-6 h-[70px] "
                      alt=""
                    />
                    <h3 className="text-[24px]   text-[#1A202C] font-bold mb-[6px]">
                      No Tag Yet
                    </h3>
                  </td>
                </tr>
              )}
            
              {getTagQuery?.data?.data &&
                getTagQuery?.data?.data?.map((result) => (
                  <tr key={result.name} className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[10px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      <Menu variant="Linear" color="#667185" size="16" />
                    </td>

                    <td className="whitespace-nowrap text-center py-[10px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium  ">
                      {result.name}
                    </td>

                    <td className="whitespace-nowrap py-[16px] bg-white flex items-center gap-2  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium justify-center  ">
                      <button onClick={() => editTag(result)}>
                        <Edit color="orange" size="16" />
                      </button>

                      <button onClick={() => deleteTag(result.id)}>
                        {" "}
                        {isLoading && deleteId === result.id ? (
                          <ClipLoader color={"red"} size={16} />
                        ) : (
                          <Trash variant="Bold" color="red" size="16" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isEditModal}
        onClose={closeEditModal}
        size={{ sm: "md", lg: "xl" }}
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
            Edit Tag{" "}
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Name{" "}
              </label>
              <div className="">
                <InputField
                  placeholder=""
                  name="name"
                  required={true}
                  value={formValue.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={closeEditModal}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={() => updateTag()}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Update</>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isCreateModal}
        onClose={closeCreateModal}
        size={{ sm: "md", lg: "xl" }}
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
            Create New Tag{" "}
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185]    mb-[8px] ">
                Name{" "}
              </label>
              <div className="">
                <InputField
                  placeholder=""
                  name="name"
                  required={true}
                  value={formValue.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={closeCreateModal}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[8px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={() => createTags()}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[8px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Create</>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tag;
