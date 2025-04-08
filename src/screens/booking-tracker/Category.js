import React, { useState } from "react";
import CatCard from "../dashboard/components/CatCard";
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
import { color } from "../../utils/Data";
import InputField from "../../components/InputField";
import { ClipLoader } from "react-spinners";
import AddButton from "../../components/common/AddButton";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { createCategory } from "../../api/apicalls";
import axios from "axios";

const Category = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [id, setId] = useState(null);
  const [pickedColor, setPickedColor] = useState(null)
  const [formValue, setFormValue] = useState({
    name: "",
    amount: "",
    color: "",
  });
  async function getCategories(page) {
    const response = await api.getCategories({});
    return response;
  }

  const categoryResults = useQuery(["getCategories"], () => getCategories(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const categoriesData = categoryResults?.data?.data || [];

  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
  };

  const openEdit = (item) => {
    setId(item?.id);
    setFormValue({
      name: item?.name,
      amount: item?.price,
      color: item?.color,
    })
    setIsEdit(true);
  };
  const closeEdit = () => {
    setId("");
    setIsEdit(false);
  };

  const openDelete = (id) => {
    setId(id);
    setIsDelete(true);
  };

  const closeDelete = () => {
    setId("");
    setIsDelete(false);
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const updateCatgory = async () => {
    setIsLoading(true);
    try {
      const response = await api.updateCategory(id, {
        name: formValue?.name,
        price: formValue?.amount,
        color: formValue?.color,
      });
      enqueueSnackbar("Category Created Successfully", { variant: "success" });
      categoryResults.refetch();
      setIsLoading(false);
      closeEdit();
      ClearForm();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  let authData = localStorage.getItem("authData");
  authData = JSON.parse(authData);
  const token = "Bearer " + authData.token;


  const deleteCategory = async () => {
    setIsLoading(true);
    const url = `https://octopus-app-spiq3.ondigitalocean.app/dashboard/api/v1/category/${id}/`;
  
    try {
      const response = await api.deleteCategory(id);
  
      enqueueSnackbar("Category Deleted Successfully", { variant: "success" });
      categoryResults.refetch();
      setIsLoading(false);
      closeDelete();
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error?.detail || "Something went wrong", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };
  

  const createACatgory = async () => {
    setIsLoading(true);
    try {
      const response = await api.createCategory({
        name: formValue?.name,
        price: formValue?.amount,
        color: formValue?.color,
      });
      enqueueSnackbar("Category Updated Successfully", { variant: "success" });
      categoryResults.refetch();
      setIsLoading(false);
      setIsCreate(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  function ClearForm() {
    setFormValue({
      name: "",
      amount: "",
      color: "",
    });
  }

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton
          action={() => openCreateModal()}
          name="Create Category"
          noIcon={true}
        />
      </div>{" "}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] ms:text-[18px] lg:[20px] xl:text-[22px] text-medium text-[#282828]">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
          {categoriesData &&
            categoriesData?.map((item) => (
              <CatCard
                name={item?.name}
                color={"#" + item?.color}
                total={item?.price}
                showOptions={true}
                setDelete={() => openDelete(item?.id)}
                setEdit={() => openEdit(item)}
              />
            ))}
        </div>
      </div>{" "}
      <Modal
        isCentered
        isOpen={isEdit}
        onClose={closeEdit}
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
            <div className="items-center">Edit Category</div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[8px]">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Category Name<sup className="text-[#A97400]">*</sup>
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
                Amount<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="">
                <InputField
                  type="text"
                  placeholder=""
                  value={formValue.amount}
                  name="amount"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[8px] ">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Select Color<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="flex items-center gap-2">
                {color?.map((item) => (
                  <div
                    onClick={() =>
                      setFormValue({
                        ...formValue,
                        color: item?.color.substring(1),
                      })
                    }
                    style={{ backgroundColor: item?.color }}
                    className={` ${formValue?.color === item?.color.substring(1) ? "border-2 border-[#2e2e2e]" : "" } h-[24px] lg:h-[32px] w-[24px] cursor-pointer lg:w-[32px] rounded-full `}
                  ></div>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button
              onClick={updateCatgory}
              className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Update Category </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
      {/* Delete Counselor Modal */}
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
              You about to Delete this Category{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this category? This action will
              Permanently delete this category on the platform.
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
              onClick={deleteCategory}
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
            <div className="items-center">Create Category</div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[8px]">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Category Name<sup className="text-[#A97400]">*</sup>
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
                Amount<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="">
                <InputField
                  type="text"
                  placeholder=""
                  value={formValue.amount}
                  name="amount"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mb-[8px] ">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Select Color<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="flex items-center gap-2">
                {color?.map((item) => (
                  <div
                    onClick={() =>
                      setFormValue({
                        ...formValue,
                        color: item?.color.substring(1),
                      })
                    }
                    style={{ backgroundColor: item?.color }}
                    className={` ${formValue?.color === item?.color.substring(1) ? "border-2 border-[#2e2e2e]" : "" } h-[24px] lg:h-[32px] w-[24px] cursor-pointer lg:w-[32px] rounded-full `}
                  ></div>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button
              onClick={createACatgory}
              className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Create Category </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Category;
