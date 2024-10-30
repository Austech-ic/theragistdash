import {
    Add,
  ArrowDown,
  ArrowDown2,
  ArrowRight2,
  Chart,
  Copy,
  EmptyWalletTime,
  Eye,
  EyeSlash,
  TransmitSquare,
} from "iconsax-react";
import React, { useState } from "react";
import { formatDateToText } from "../../utils/helperFunctions";
import { NumericFormat } from "react-number-format";
import { Box } from "@chakra-ui/react";
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
      backgroundColor: [
        "#26ae5f",
        "rgba(243, 121, 51, 1)",
      ],
      borderColor: [
        "#26ae5f",
        "rgba(243, 121, 51, 1)",
      ],
      borderWidth: 1,
      borderJoinStyle: "round",
      spacing: 1,
      borderRadius: 2,
    },
  ],
};

const WalletOverdiv = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const hideMyBalance = () => {
    setHideBalance(!hideBalance);
  };
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] mt-5 ">
        <li>
          <div className="rounded-[12px] px-[16px] pt-4 pb-6 bg-[#26ae5f] ">
            <div className="flex-between">
              <div className="flex-item gap-2">
                <div className="py-[5px] text-[12px] px-[10px] flex cursor-pointer bg-white rounded-[48px] w-[90px]  gap-[8px] items-center ">
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
                  alignItems: "center",
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
                alignItems: "center",
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

        <li className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] shadow p-2 md:p-4">
          
          
          <button
            className={`rounded-[20px] mt-6 flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                           bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
         <Add color="#fff" size={20}/>   <p>Top Up Wallet </p>  
          </button>{" "}


          <button
            className={`rounded-[20px] mt-6 flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                           bg-[#EDF7EE] text-[#dd944f] border-[#dd944f] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
         <Add color="#fff" size={20}/>   <p>Transfer to other banks </p>  
          </button>{" "}
          <button
            className={`rounded-[20px] mt-6 flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px]
                           bg-[#EDF7EE] text-[#dd944f] border-[#dd7a4f] text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
          >
         <Add color="#fff" size={20}/>   <p>Transfer to Vant Tag </p>  
          </button>{" "}
        </li>
        <li className="rounded-lg relative overflow-hidden border-[0.8px] border-[#E4E7EC] shadow p-2 md:p-4 h-[200px]">
         
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
    </div>
  );
};

export default WalletOverdiv;
