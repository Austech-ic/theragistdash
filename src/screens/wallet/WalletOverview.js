import {
  Add,
  ArrowDown,
  ArrowDown2,
  ArrowRight2,
  Bank,
  Chart,
  Copy,
  EmptyWalletTime,
  Eye,
  EyeSlash,
  RecordCircle,
  Send2,
  TransmitSquare,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import { formatDateToText } from "../../utils/helperFunctions";
import { NumericFormat } from "react-number-format";
import {
  Grid,
  Flex,
  Button,
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { ClipLoader } from "react-spinners";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { motion as m } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export const options = {
  responsive: true,
  maintainAspectRatio: true,
  width: "100%",
  plugins: {
    // legend: {
    //   position: 'top',
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

export const pieData = {
  labels: ["Credits", "Debits"],
  datasets: [
    {
      label: "Number of Task",
      data: [5, 8],
      backgroundColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
      borderColor: ["#26ae5f", "rgba(243, 121, 51, 1)"],
      borderWidth: 1,
      borderJoinStyle: "round",
      spacing: 1,
      borderRadius: 2,
    },
  ],
};

const WalletOverdiv = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [isTransferOthers, setIsTransferOthers] = useState(false);
  const [bankName, setBankName] = useState("");
  const [banksVisible, setBanksVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const closeTransferOthers = () => {
    setIsTransferOthers(false);
  };
  const openTransferOthers = () => {
    setIsTransferOthers(true);
  };
  const hideMyBalance = () => {
    setHideBalance(!hideBalance);
  };
  async function getBanks(page) {
    const response = await api.getBanks({ params: { page } });
    return response;
  }

  const BankQuery = useQuery(["bank"], () => getBanks(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  let Bankss = BankQuery?.data
  const [filteredData, setFilteredData] = useState(Bankss|| []) ;
useEffect(()=> {
    setFilteredData(BankQuery.data)
  },[BankQuery.data])


  const handleSearch = (query) => {
    const filteredbanks = BankQuery.data.filter((bank) =>
      bank.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredbanks);
  };
  const [isLoading, setIsLoading] = useState(false);

  const  handleSelectBank = (bank)=>{
    setSelectedBank(bank);
    setBanksVisible(false);
  }
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] mt-5 ">
        <li>
          <div className="rounded-[12px] px-[16px] pt-4 pb-6 bg-[#26ae5f] ">
            <div className="flex-between">
              <div className="flex-bank gap-2">
                <div className="py-[5px] text-[12px] px-[10px] flex cursor-pointer bg-white rounded-[48px] w-[90px]  gap-[8px] banks-center ">
                  <img
                    src="/assets/ng.png"
                    className="h-[13px] w-[13px]"
                    alt="flag ng"
                  />
                  <p>NGN</p>
                  <ArrowDown2 variant="Bold" size={20} />
                </div>
                <button onClick={hideMyBalance}>
                  {hideBalance ? (
                    <Eye color="#fff" variant="Linear" size={14} />
                  ) : (
                    <EyeSlash color="#fff" variant="Linear" size={14} />
                  )}
                </button>
              </div>
              <p className="text-[#fff]  font-medium  text-[12px] leading-[14px]  tracking-[0.2px]   ">
                {formatDateToText(new Date())}
              </p>
            </div>

            <div className="flex-between mt-6">
              <div>
                {/* {userQuery.isLoading || hideBalance ? ( */}
                {hideBalance ? (
                  <p className="text-[#fff]  font-semibold  text-[16px] leading-[19px]  tracking-[0.2px]   ">
                    {"₦"} *****
                  </p>
                ) : (
                  <NumericFormat
                    value={200000}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    renderText={(value) => (
                      <p className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                        {value}
                      </p>
                    )}
                  />
                )}
              </div>
              <button
                // onPress={() => selectedCard.add()}
                className="px-2 py-1 bg-white"
                style={{
                  borderRadius: 40,
                  flexDirection: "row",
                  alignbanks: "center",
                }}
              >
                <p className="text-[#272F35]  font-normal  text-[10px] leading-[14px]  tracking-[0.2px]   ">
                  Add Money
                </p>
              </button>
            </div>
          </div>

          <div className=" bg-[#1B2026] relative   rounded-[12px]  px-[16px] pb-[14px] pt-[24px] -mt-[16px]   ">
            <p className="text-[#fff]  font-medium  text-[12px] leading-[14px]  tracking-[0.2px]  mb-[8px]  ">
              {/* {userQuery?.data?.account_numbers[0]?.bank} */}
              VFD Bank
            </p>
            <div
              style={{
                flexDirection: "row",
                alignbanks: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="text-[#fff]  font-semibold  text-[14px] leading-[17px]  tracking-[0.2px]    ">
                {/* {userQuery?.data?.account_numbers[0]?.account_number} */}
                983645446637
              </p>
              <button
                //   onPress={() =>
                //     copyKeyToClipboard(
                //       userQuery?.data?.account_numbers[0]?.account_number
                //     )
                //   }
                className="absolute top-[12px] right-[16px]"
              >
                <p className="text-[#3B6896] font-semibold font-i_medium text-[10px] leading-[9.68px]  ">
                  {/* {copySuccess ===
                        userQuery?.data?.account_numbers[0]?.account_number ? (
                          "Copied!"
                        ) : (
                          <Copy size={20} variant="Bold" color="#fff" />
                        )} */}
                  <Copy size={20} variant="Bold" color="#fff" />
                </p>
              </button>
            </div>
            <p className="text-[#fff]  font-normal font-i_normal text-[12px] leading-[14px]  tracking-[0.2px] ">
              {/* {userQuery?.data?.account_numbers[0]?.account_name} */}
              Ogundele Caleb
            </p>
          </div>
        </li>

        <li className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] bg-[#fefefe] shadow p-2 md:p-4">
          <button
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                           bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
            <Add color="#4CAF50" size={20} /> <p>Top Up Wallet </p>
          </button>{" "}
          <button
            onClick={openTransferOthers}
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}

          >
            <Send2 color="#4CAF50" size={20} /> <p>Transfer to other banks </p>
          </button>{" "}
          <button
            className={`rounded-[20px] mt-6 flex justify-center banks-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}

          >
            < Send2 color="#4CAF50" size={20} /> <p>Transfer to Vant Tag </p>
          </button>{" "}
        </li>
        <li className="rounded-lg relative overflow-hidden border-[0.8px] bg-[#fefefe]  border-[#E4E7EC] shadow p-2 md:p-4 h-[215px]">
          <Chart
            size="184"
            color="#E4E2DFA0"
            className="absolute bottom-0 -z-10"
          />
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    pointStyle: "rect",
                    usePointStyle: true,
                    // fullSize: false,
                    // pointStyleWidth: 10,
                    font: {
                      size: 10,
                    },
                  },
                },
              },
            }}
          />
        </li>
      </ul>

      <Modal
        isCentered
        isOpen={isTransferOthers}
        onClose={closeTransferOthers}
        size="xl"
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="4"
            color="#000000"
            className="text-[18px] md:text-[20px] text-[#000000] font-medium leading-[24px] md:leading-[24px]"
          >
            Transfer Money
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "30px", md: "40px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] ">
                Account Number
              </label>
              <div className=" relative    flex banks-center">
                <input
                  type="text"
                  placeholder="0002-XXXX-XX"
                  className="w-full h-[48px] pl-[24px] pr-[8px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  name="accountNumber"
                  id="full-name"
                  //   value={formData.date}
                  //   onChange={(e) => handleChange(e)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] ">
                Bank
              </label>
              <button
                onClick={() => setBanksVisible(!banksVisible)}
                className="w-full h-[48px] pl-[24px] pr-[8px] flex-between py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              >
                <div className="flex-row banks-center">
                  {selectedBank ? (
                    <p className="text-[#272F35] font-normal font-i_normal text-[12px] leading-[15px] tracking-[0.028px] ">
                      {selectedBank?.name}
                    </p>
                  ) : (
                    <p className="text-[#838383] font-normal font-i_normal text-[12px] leading-[15px]  tracking-[0.028px] ">
                      {"Select a Bank"}
                    </p>
                  )}
                </div>
                <ArrowDown2 variant="Linear" color={"#838383"} size={14} />
              </button>
              {banksVisible && (
                <m.div
                  initial={{ y: 10, opacity: 0.4 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    // scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="w-full h-[300px] overflow-y-auto  px-2 py-3 text-[14px] text-[#344054] leading-[20px]    border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                >
                  { filteredData && 
                    filteredData?.map((bank, index) => (
                      <button
                        // onPress={() => {
                        //   ToggleBottomdiv(),
                        //     setBank(bank.code),
                        //     setBankName(bank.name),
                        //     setAccountName(""),
                        //     setAccountNumber("");
                        // }}

                        onClick={()=>handleSelectBank(bank)}
                        className="w-full px-[10px] py-2 rounded-[10px] flex items-center flex-row justify-between banks-center mb-2"
                        style={{
                          borderColor: "rgba(18, 3, 58, 0.10)",
                          borderWidth: .2,
                        }}
                      >
                        <div className="flex-item">
                          {bank.logo ? (
                            <img
                              src={bank?.logo}
                              alt=""
                              style={{ height: 24, width: 24 }}
                              className="mr-3 rounded-full"
                            />
                          ) : (
                            <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3 ">
                              <Bank
                                size="14"
                                color="#BAB4B2FF"
                                variant="Bold"
                              />
                            </div>
                          )}
                          <p className="text-[#272F35] flex-1 font- font-i_medium text-[12px] leading-[15.94px]  tracking-[0.2px]  ">
                            {bank?.name}
                          </p>
                        </div>

                        {selectedBank?.code === bank?.code ? (
                          <RecordCircle
                            size="16"
                            color="#26ae5f"
                            variant="Bold"
                          />
                        ) : (
                          <RecordCircle
                            size="16"
                            color="#DEDEDE"
                            variant="Bold"
                          />
                        )}
                      </button>
                    ))}
                </m.div>
              )}
            </div>
            <div className="mb-[18px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] ">
                Transfer Purpose
              </label>
              <div className=" relative  flex banks-center">
                <select
                  type="text"
                  placeholder="Name"
                  className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
                  name="full-name"
                  id="full-name"
                  //value=""
                  //onChange={() => {}}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                >
                  <option value="">Select Purpose</option>
                  <option value="Monthly Payslip">Utilities</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black">
              Cancel
            </button>
            <button className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#26ae5f] flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white">
              {!isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Upload </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WalletOverdiv;
