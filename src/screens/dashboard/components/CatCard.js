import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Edit, More, Note1, Trash } from "iconsax-react";
import { MoreVertical } from "lucide-react";
import React from "react";

const CatCard = ({ color, name, total, setEdit, setDelete, showOptions }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`h-[100px] text-white   p-[12px]    rounded-[12px] flex flex-col justify-between`}
    >
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-[#ffffff] h-[36px] w-[36px] md:h-[41px] md:w-[41px] flex justify-center items-center">
            <Icon
              icon="ri:mental-health-line"
              width="24"
              height="24"
              color={color}
            />{" "}
          </div>
          <p className=" font-normal text-[16px] md:text-[18px] xl:text-[20px]">
            ₦{total}
          </p>
        </div>
        {showOptions && (
          <Menu>
            <MenuButton bg={"none"} _hover={"none"}>
              <button
                //onClick={() => handleTransacModalOpen(result)}
                className="   rounded-sm flex justify-center items-center  hover:bg-[#CBD5E0]  "
              >
                <MoreVertical size={16} />
              </button>
            </MenuButton>
            <MenuList maxW="32" className="">
              <MenuItem
                onClick={() => setEdit(true)}
                w="full"
                color="#00B0C7"
                mb="10px"
                _hover={"#00B0C7"}
              >
                <Edit
                  variant="Linear"
                  color="#98A2B3"
                  size="16"
                  className="mr-2"
                />{" "}
                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                  Edit
                </p>
              </MenuItem>
              <MenuItem
                onClick={() => setDelete(true)}
                w="full"
                color="#bf0d0d"
                mb="10px"
              >
                <Trash
                  variant="Linear"
                  color="#98A2B3"
                  size="16"
                  className="mr-2"
                />{" "}
                <p className="text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                  Delete
                </p>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>

      <p className=" font-normal text-[16px] md:text-[18px] xl:text-[20px] text-center">
        {name}
      </p>
    </div>
  );
};

export default CatCard;
