import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { m } from "framer-motion";
import api from "../../../api"; // Replace with your API import
import { SearchNormal1, Bank, RecordCircle, ArrowDown2 } from "iconsax-react"; // Replace with your icon library

const BankSelectionModal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [banksVisible, setBanksVisible] = useState(false);

  const { data: banks, isLoading } = useQuery(["banks"], () => api.getBanks(), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (banks) {
      const sortedBanks = [...banks].sort((a, b) =>
        a.name === "Access Bank" ? -1 : b.name === "Access Bank" ? 1 : 0
      );
      setFilteredBanks(sortedBanks);
    }
  }, [banks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (banks) {
      const filtered = banks.filter((bank) =>
        bank.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  };

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setBanksVisible(false);
  };

  return (
    <div className="mb-[12px] md:mb-[18px]">
     
      <button
        onClick={() => setBanksVisible(!banksVisible)}
        className="w-full h-[38px] pl-[10px] pr-[8px] flex-between py-[8px] text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:border-[#26ae5f]"
      >
        <div className="flex-row banks-center">
          {selectedBank ? (
            <p className="text-[#272F35] text-[12px]">{selectedBank.name}</p>
          ) : (
            <p className="text-[#838383] text-[12px]">Select a Bank</p>
          )}
        </div>
        <ArrowDown2 size={14} color="#838383" variant="Linear" />
      </button>

      {banksVisible && (
        <m.div
          initial={{ y: 10, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-[300px] overflow-y-auto px-2 py-3 border-[#D0D5DD] border-[0.2px] rounded-[8px]"
        >
          <div className="relative w-full mb-2 flex items-center">
            <SearchNormal1 size="14" color="#98A2B3"
             className="absolute left-[16px] " />
            <input
              type="text"
              placeholder="search bank"
              className="w-full h-[36px] text-[12px] pl-[44px] py-[8px] bg-[#F7F9FC] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {filteredBanks.map((bank, index) => (
            <button
              key={index}
              onClick={() => handleSelectBank(bank)}
              className="w-full px-[10px] py-2 rounded-[10px] flex items-center justify-between mb-2"
              style={{ borderColor: "rgba(18, 3, 58, 0.10)", borderWidth: 0.2 }}
            >
              <div className="flex items-center">
                {bank.logo ? (
                  <img src={bank.logo} alt={bank.name} className="mr-3 rounded-full" style={{ height: 24, width: 24 }} />
                ) : (
                  <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3">
                    <Bank size="14" color="#BAB4B2FF" variant="Bold" />
                  </div>
                )}
                <p className="text-[#272F35] text-[12px]">{bank.name}</p>
              </div>
              {selectedBank?.code === bank.code ? (
                <RecordCircle size="16" color="#26ae5f" variant="Bold" />
              ) : (
                <RecordCircle size="16" color="#DEDEDE" variant="Bold" />
              )}
            </button>
          ))}
        </m.div>
      )}
    </div>
  );
};

export default BankSelectionModal;