import { Icon } from "@iconify/react/dist/iconify.js";
import { Play } from "iconsax-react";
import { SmilePlus } from "lucide-react";
import React, { useState } from "react";
import EmtyTable from "../../components/common/EmtyTable";

const Space = () => {
  const [listType, setListType] = useState("All");

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex items-center gap-5">
        <div className="rounded-[12px] w-full md:max-w-[200px] flex items-center gap-[6px] bg-[#FBFBFB] max-h-[94.5px] border border-[#E1E1E1] py-[23px]  px-[12px] md:px-[16px]">
          <div className="rounded-full bg-[#E6F7F9] h-[36px] w-[36px] md:h-[36px] md:w-[36px] flex justify-center items-center">
            <Play color="#00B0C7" variant="Bold" />
          </div>

          <div className="flex flex-col ">
            <p className="text-[#282828] font-medium text-[14px] md:text-[16px]">
              12{" "}
            </p>
            <p className="text-[#263238] font-light text-[14px] md:text-[15px] whitespace-nowrap">
              Daily Space{" "}
            </p>
          </div>
        </div>

        <div className="rounded-[12px] flex items-center gap-[6px] bg-[#FBFBFB] max-h-[94.5px] border border-[#E1E1E1] py-[23px]  px-[12px] md:px-[16px]">
          <div className="rounded-full bg-[#E6F7F9] h-[36px] w-[36px] md:h-[36px] md:w-[36px] flex justify-center items-center">
            <SmilePlus color="#00B0C7" />
          </div>

          <div className="flex flex-col ">
            <p className="text-[#282828] font-medium text-[14px] md:text-[16px]">
              12{" "}
            </p>
            <p className="text-[#263238] font-light text-[14px] md:text-[15px] whitespace-nowrap">
              Avg. Attendance{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-6">
        <ul className="flex gap-3 md:gap-4 lg-gap-5">
          <li
            onClick={() => setListType("All")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "All"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Live space</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center  text-xs  rounded-full ${
                listType === "All"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>112</p>
            </div>
          </li>
          <li
            onClick={() => setListType("Suspended")}
            className={`pb-2 cursor-pointer flex items-center gap-[6px]  ${
              listType === "Suspended"
                ? "text-[#00B0C7] border-b-[2px] border-[#00B0C7]"
                : "text-[#6F6F6F]"
            }`}
          >
            <p>Past space</p>{" "}
            <div
              className={`h-[24px] w-[24px] flex items-center justify-center text-xs  rounded-full ${
                listType === "Suspended"
                  ? "text-[#00B0C7] bg-[#E6F7F9]"
                  : "text-[#6F6F6F] bg-[#eaeaea]"
              }`}
            >
              <p>80</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block  min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        1
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Space description{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Date
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Creator
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <EmtyTable
                    name="Add "
                    label={"No Live Space"}
                    cols={6}
                  />

                  <tr className="border-b-[0.8px] border-[#E4E7EC]">
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      1
                    </td>
                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                      Corem ipsum dolor sit amet, consectetur{" "}
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      31. Dec. 2022
                    </td>

                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      Dr. Femi osheyim{" "}
                    </td>

                    <td className="px-5 py-[16px] text-[14px]  text-[#212121]">
                      <div className="flex gap-1 bg-[#91C561] bg-opacity-15 px-[12px] py-[4px] text-[#008D36] items-center rounded-xl">
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1L4.75 9L1 5.36364"
                            stroke="#008D36"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p>Active</p>
                      </div>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block  min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        1
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Space description{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Duration
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Creator
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Participants
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <EmtyTable
                    name="Add "
                    label={"No Live Space"}
                    cols={6}
                  />

                  <tr className="border-b-[0.8px] border-[#E4E7EC]">
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      1
                    </td>
                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                      Corem ipsum dolor sit amet, consectetur{" "}
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      31. Dec. 2022
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      30 minutes
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      Dr. Femi osheyim{" "}
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
120                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
