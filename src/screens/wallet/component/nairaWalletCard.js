import React from 'react'
import {
  EyeSlash,
  Eye,
  ArrowDown2,
  Copy,
} from "iconsax-react";
import { NumericFormat } from "react-number-format";
import AccountDetails from './accountDetails';



const NairaWalletCard = ({
  selectedCard,
  Card,
  hideBalance,
  toggleWallet,
  hideMyBalance,
  isSwitchWallet,
  setSelectedCard,
  formatDateToText,
  handleCopy,
  copiedRef,
  profileData,
  reduceHeight
}) => {
  return (
    <li className="">
    <div className={`rounded-[12px] px-[16px] ${reduceHeight? " pt-3 pb-6" : "pt-4 pb-6"} `} style={{ backgroundColor: selectedCard?.color }}>
      {/* Card Header */}
      <div>
        <div className="flex-between">
        <div className="flex-item gap-2">
                  <div>
                    <div
                      onClick={toggleWallet}
                      className="py-[5px] text-[12px] px-[10px] flex items-center cursor-pointer bg-white rounded-[48px] w-[90px]  gap-[8px] banks-center "
                    >
                      <img
                        src={selectedCard?.Image}
                        className="h-[13px] w-[13px]"
                        alt="flag ng"
                      />

                      <p>{selectedCard?.abb}</p>
                      <ArrowDown2 variant="Bold" size={20} />
                    </div>
                  </div>

                  <button onClick={hideMyBalance}>
                    {hideBalance ? (
                      <Eye color="#fff" variant="Linear" size={14} />
                    ) : (
                      <EyeSlash color="#fff" variant="Linear" size={14} />
                    )}
                  </button>
                </div>
          <p className="text-white text-[12px]">{formatDateToText(new Date())}</p>
        </div>

        {isSwitchWallet && (
          <div className="mt-1">
          {Card &&
            Card.filter((item) => item?.abb !== selectedCard?.abb).map(
              (item, index) => (
                <div
                  onClick={() => setSelectedCard(item)}
                  className="py-[4px] text-[10px] px-[10px] flex items-center cursor-pointer bg-gray-100 rounded-[48px] w-[90px]  justify-between banks-center "
                >
                  <img
                    src={item?.Image}
                    className="h-[13px] w-[13px]"
                    alt="flag ng"
                  />

                  <p>{item?.abb}</p>
                </div>
              )
            )}
        </div>
        )}
      </div>

      {/* Card Balance */}

      <div className={`flex-between ${reduceHeight ? " mt-4" : " mt-6"}`}>
        {hideBalance ? (
           <p className="text-[#fff]  font-semibold  text-[16px] leading-[19px]  tracking-[0.2px]   ">
            ₦ *****</p>
        ) : (
          <NumericFormat
            value={selectedCard?.balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={selectedCard?.symbol}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value) => <p className="text-white text-[16px]">{value}</p>}
          />
        )}
        <button className="px-2 py-1 bg-white rounded-[40px]">
          <p className="text-[#272F35] text-[10px]">Vant</p>
        </button>
      </div>
    </div>

    {/* Account Information */}
     <AccountDetails
        profileData={profileData}
        selectedCard={selectedCard}
        handleCopy={handleCopy}
        copiedRef={copiedRef}
        reduceHeight={reduceHeight}
      />
  </li>
);
};


export default NairaWalletCard
