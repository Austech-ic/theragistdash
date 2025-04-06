import React, { useState } from "react";
import SearchInput from "../../components/common/SearchInput";

import EmtyTable from "../../components/common/EmtyTable";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helperFunctions";

const UserAssessment = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  async function getUserAssessment(page) {
    const response = await api.getUserAssessment({
      params: {
        search: search,
      },
    });
    return response;
  }

  const results = useQuery(["getUserAssessment"], () => getUserAssessment(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const assessmentData = results?.data?.data || [];


  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex items-center justify-between ">
        <SearchInput
          placeholder={"Search User"}
          onChange={(e) => setSearch(e.target?.value)}
        />
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
                      <div className="flex px-5 whitespace-nowrap  text-center  gap-[6px] md:gap-[12px] items-center">
                        SN{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] text-center border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                        Name{" "}
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] whitespace-nowrap text-center border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                        Assessment Date{" "}
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] text-center py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                        Email
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] text-center border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                        Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData && assessmentData?.length < 1 && (
                    <EmtyTable
                      label={"No User Assessment yet"}
                      cols={6}
                      noButton={true}
                    />
                  )}

                  {assessmentData?.map((item, index) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                        {index + 1}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px] whitespace-nowrap ">
                        <p className="font-medium  whitespace-nowrap">
                          {item?.user?.username}
                        </p>
                      </td>
                      <td className="px-5 py-[16px] text-center whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                        {formatDate(item?.created_at)}
                      </td>

                      <td className="px-5 py-[16px] text-[14px]  text-center text-[#9C9C9C]">
                        {item?.user?.email}{" "}
                      </td>
                      <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                        <div className="flex justify-center items-center gap-1">
                          <Link to="/user-assessment/assessment-details" state={item}>
                            <Eye
                              size="20"
                              variant="Bold"
                              color="#F7A30A"
                              className="cursor-pointer"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
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
