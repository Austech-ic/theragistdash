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

const Category = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);


  const openCreateModal = () => {
    setIsCreate(true);
  };
  const closeCreate = () => {
    setIsCreate(false);
  };

  const openEdit = () => {
    setIsEdit(true);
  };
  const closeEdit = () => {
    setIsEdit(false);
  };

  const openDelete = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
<div className="flex justify-end mb-[20px] md:mb-[25px] xl:mb-[30px]">
        <AddButton action={() => openCreateModal()} name="Create Category" noIcon={true} />
      </div>      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] ms:text-[18px] lg:[20px] xl:text-[22px] text-medium text-[#282828]">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
          <CatCard
            name="Addiction"
            color="#ECBB5F"
            total={1200}
            showOptions={true}
            setDelete={setIsDelete}
            setEdit={setIsEdit}
          />
          <CatCard
            name="Anxiety"
            color={"#57315A"}
            total={1200}
            showOptions={true}
            setDelete={setIsDelete}
            setEdit={setIsEdit}
          />
          <CatCard name="Depression" color="#ECACAD" total={1200}     showOptions={true}
            setDelete={setIsDelete}
            setEdit={setIsEdit}/>
          <CatCard name="Addiction" color="#FF8989" total={1200}    showOptions={true}
            setDelete={setIsDelete}
            setEdit={setIsEdit} />
          <CatCard name="Addiction" color="#FF8989" total={1200}    showOptions={true}
            setDelete={setIsDelete}
            setEdit={setIsEdit} />
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
                  // value={formValue.name}
                  // name="name"
                  // onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="mb-[8px] ">
              <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                Amount<sup className="text-[#A97400]">*</sup>
              </label>
              <div className="">
                <InputField
                  type="email"
                  placeholder="e.g. abc@website.com"
                  // value={formValue.name}
                  // name="name"
                  // onChange={(e) => handleInputChange(e)}
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
                    style={{ backgroundColor: item?.color }}
                    className="h-[24px] lg:h-[32px] w-[24px] lg:w-[32px] rounded-full "
                  ></div>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Create Category </>
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
              Permanently delete this category  on the platform.
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
              // onClick={closeCancel}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              Delete
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
                  <div className="items-center">
                   
                    Create Category
                  </div>
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
                            // value={formValue.name}
                            // name="name"
                            // onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-[8px] ">
                        <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                          Amount<sup className="text-[#A97400]">*</sup>
                        </label>
                        <div className="">
                          <InputField
                            type="email"
                            placeholder="e.g. abc@website.com"
                            // value={formValue.name}
                            // name="name"
                            // onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
      
      
                      <div className="mb-[8px] ">
                        <label className="text-[14px] md:text-base text-[#1C1C1C] font-medium   mb-[8px] md:mb-[16px]">
                          Select Color<sup className="text-[#A97400]">*</sup>
                        </label>
                        <div className="flex items-center gap-2">
                          {color?.map((item) => (<div style={{backgroundColor: item?.color}} className="h-[24px] lg:h-[32px] w-[24px] lg:w-[32px] rounded-full "></div>))}
                          </div>
                          </div>
                     
                </ModalBody>
                <div className="flex justify-center py-3 ">
                  {}
                  <button
                   
                    className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                  >
                    { isLoading ? (
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
