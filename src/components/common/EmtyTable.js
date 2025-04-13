import { DocumentSketch } from "iconsax-react";
import React from "react";
import AddButton from "./AddButton";

const EmtyTable = ({ name, label, action, cols, noButton }) => {
  return (
    <tr className="mt-6">
      <td className="mt-6" colspan={cols}>
        {" "}
        <div className=" rounded-lg my-6 w-[90%] md:w-[70%] lg:w-[60%] h-[220px] md:h-[260px] xl:h-[310px] mx-auto border border-stroke flex flex-col items-center justify-center gap-4 md:gap-5 ">
          <div className="rounded-full  mx-auto bg-[#E8E8E8] h-[50px] md:h-[60px] lg:h-[70px] xl:h-[100px] w-[50px] md:w-[60px] lg:w-[70px] xl:w-[100px] flex items-center justify-center ">
            <DocumentSketch
              color="#fff"
              variant="Bold"
              className="h-[20px] md:h-[30px] xl:h-[[40px]"
            />
          </div>
          <p className="text-center">{label}</p>
          {!noButton && <AddButton name={name} action={action} />}
        </div>
      </td>
    </tr>
  );
};

export default EmtyTable;
