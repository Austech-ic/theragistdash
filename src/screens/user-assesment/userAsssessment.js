import React, { useState } from "react";
import SearchInput from "../../components/common/SearchInput";

import EmtyTable from "../../components/common/EmtyTable";

const UserAssessment = () => {
  const [isCreate, setIsCreate] = useState(false);

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex items-center justify-between ">
        <SearchInput placeholder={"Search User"} />

        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap ">Filter By</p>{" "}
          <select className="w-full  pl-[6px] py-[10px] text-[14px] text-[#2e2e2e] leading-[20px] bg-[#fff] placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#E1E1E1] border-[1px] rounded-[6px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] ">
            <option value="">Attended Sessions</option>
            <option value="">Categories</option>
            <option value="">Status</option>
          </select>{" "}
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
                        SN{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Name{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Assessment Date{" "}
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Attended session
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Email
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <EmtyTable
                    name="Add User"
                    label={"No User Assessment yet"}
                    cols={6}
                  />

                  <tr className="border-b-[0.8px] border-[#E4E7EC]">
                    <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                      1
                    </td>
                    <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                      <p className="font-medium whitespace-nowrap">SOS User</p>
                      <p className="text-[#9C9C9C] ">ID: 2346570067</p>
                    </td>
                    <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                      31. Dec. 2022
                    </td>

                    <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                      rachealbambam@gmail.com
                    </td>
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

export default UserAssessment;
