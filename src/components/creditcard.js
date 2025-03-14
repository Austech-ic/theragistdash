import React from 'react';

const CreditCard = ({cardDetails }) => {
  function formatCardNumber(number) {
    if(!number) {
      return null;
    }
    return number.replace(/\d{4}(?=.)/g, "$& ");
  }
  function formatExpiry() {
    if(!cardDetails?.expiry_month || !cardDetails?.expiry_year) {
      return null;
    }
    return `${cardDetails?.expiry_month}/${cardDetails?.expiry_year.toString().slice(-2)}`;
  }
  return (
    <div className="w-full  max-w-96 sm:w-96 h-56 relative  group">
      {/* Card Container with flip animation */}
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-r from-[#3B6896] to-[#26ae5f] rounded-xl p-6 text-white shadow-xl">
          {/* Chip */}
          <div className=" flex items-center justify-between rounded-md mb-8">
          
          <img   src='/assets/chip.png' alt='chip'  className='w-12 h-8'/>
          <img   src='/assets/mastercd.png' alt='chip'  className='w-12 h-8'/>
          </div>
          
          {/* Card Number */}
          <div className="space-y-2 mb-6">
            <div className="text-2xl robot tracking-wider font-medium">
            {formatCardNumber(cardDetails?.card_number) !== null ? formatCardNumber(cardDetails?.card_number) : "XXXX XXXX XXXX XXXX"}
            </div>
          </div>
          
          {/* Card Holder & Expiry */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs opacity-75 mb-1">Card Holder</div>
              <div className="tracking-wider">{cardDetails?.name ? cardDetails?.name : "XXXXXXX XXXXXX"}</div>
            </div>
            <div>
              <div className="text-xs opacity-75 mb-1">Expires</div>
              <div className="tracking-wider">{cardDetails?.expiry !== null ? cardDetails?.expiry: "XX/XX" }</div>
            </div>
          </div>
          
       
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-xl">
          {/* Black strip */}
          <div className="w-full h-12 bg-black mt-8"></div>
          
          {/* CVV */}
          <div className="px-6 mt-8">
            <div className="flex justify-end items-center">
              <div className="bg-white h-10 w-full relative">
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black font-mono">
                  {cardDetails?.cvv ? cardDetails?.cvv : "XXX"}
                </div>
              </div>
            </div>
            <div className="text-white text-xs mt-2 text-right opacity-75">
              CVV
            </div>
          </div>
          
          {/* Additional info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-white text-xs opacity-50 text-center">
              This card is property of Your Bank Name. Misuse is criminal offense.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;