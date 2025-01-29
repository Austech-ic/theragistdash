import React from "react";
import CreditCard from "../../components/creditcard";
import NewCard from "../../components/NewCard";

const DollarCard = () => {
  return (
    <div className="min-h-screen bg-gray-200  p-8">
      <div className="flex items-center  gap-4">
        <div className="">
          <p className="text-sm text-center text-gray-600 animate-pulse mb-3 transition-transform duration-500 ease-in-out">
            Hover on card to flip
          </p>
          <CreditCard />
        </div>
        <div className="self-end">
          <NewCard />
        </div>
      </div>
    </div>
  );
};

export default DollarCard;
