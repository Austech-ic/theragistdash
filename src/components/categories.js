import React from "react";
import CatCard from "../screens/dashboard/components/CatCard";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[16px] ms:text-[18px] lg:[20px] xl:text-[22px] text-medium text-[#282828]">
          Categories
        </h2>
        <Link
          to="/categories"
          className="text-[14px] ms:text-[16px] lg:[18px]  text-light text-[#282828]"
        >
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
        <CatCard name="Addiction" color="#ECBB5F" total={1200} />
        <CatCard name="Anxiety" color={"#57315A"} total={1200} />
        <CatCard name="Depression" color="#ECACAD" total={1200} />
        <CatCard name="Addiction" color="#FF8989" total={1200} />
      </div>
    </div>
  );
};

export default Categories;
