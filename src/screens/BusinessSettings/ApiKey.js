import React, { useState , useEffect} from "react";
import { motion as m } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { decryptaValue, encryptaValue } from "../../utils/helperFunctions";



const ApiKey = () => {
  const [publicCopySuccess, setPublicCopySuccess] = useState("");
  const [secretCopySuccess, setSecretCopySuccess] = useState("");
  const [publicKey, setPublicKey] = useState("PBLK_23632RXXXXXXXXXX_1298");
  const [secretKey, setSecretKey] = useState("");
  const [keyloading, setKeyLoading] = useState(false);
  
  const profileData = useOutletContext();

  useEffect(() => {
     //If there's no profile data, set selectedInfo to 1
    if (profileData) {
       setPublicKey(profileData?.api_token)
    }
    const stringedValue = JSON.parse(profileData?.api_token);

//    console.log("decrypting the api key=====>>>", decryptaValue('U2FsdGVkX19eJSpPaYvAOpYRegX386fJRgcTvazL7w16Via3BrZcofJPif+5Vdic3nzu65JfOspeoTIKjqygyfbPdJGWrBMgxzD25ffabQ50gG+fwL0y+CDi6KRZfR2tqiEyKgLnVYs1ao/R7Ot9Gw=='))
    
  }, [profileData]);


  const copyPublicKeyToClipboard = (text) => {
    navigator.clipboard.writeText(decryptaValue(text));
    setPublicCopySuccess(decryptaValue(text));
    setTimeout(() => {
      setPublicCopySuccess("");
    }, 3000);
  };

  return (
    <div className="p-4 md:p-6">
      {" "}
      <div className="border-[0.2px] overflow-hidden flex-1 border-[#98a2b3] relative rounded-[8px] bg-[#fff]    p-[16px] md:p-[20px] ">
        <m.div
          initial={{ x: 30, opacity: 0.4 }}
          animate={{
            // x: selectedInfo === 1 ? 0 : 100,
            x: 0,
            opacity: 1,
            // scale: 1,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          <div className="mb-[16px] md:mb-[20px]">
            <label className="text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] text-[#373636] mb-[8px]">
              Use API keys to securely authenticate requests between your
              application and Vant, ensuring that only authorized access is
              granted. These keys allow your app to communicate with Vant while
              protecting sensitive data and functionalities.
            </label>
          </div>

          <div className="mb-[16px] md:mb-[20px] w-full md:w-[70%] xl:w-[50%]">
            <label
              htmlFor=""
              className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
            >
              Public key
            </label>
            <div class="relative mb-4 flex w-full  ">
              <input
                type="text"
                value={publicKey}
                className="w-full  h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px] bg-[#F7F9FC] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-l-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                placeholder="Public Key"
                aria-describedby="basic-addon2"
                disabled
              />
              <button
                class="flex items-center   bg-[#26ae5f] text-[#fafafa] text-[12px]    rounded-r border border-l-0 border-solid border-[#D0D5DD]  px-3 py-[0.40rem] text-center text-base  leading-[1.6]  dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                id="basic-addon2"
                onClick={() => copyPublicKeyToClipboard(publicKey)}
              >
                <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[white] font-medium text-left whitespace-nowrap">
                  {publicCopySuccess === decryptaValue(publicKey)
                    ? "Copied!"
                    : "Click to copy"}
                </p>
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default ApiKey;
