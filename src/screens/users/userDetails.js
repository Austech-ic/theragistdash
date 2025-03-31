import { ArrowSquareLeft } from "iconsax-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import EmtyTable from "../../components/common/EmtyTable";

const UserDetails = () => {
  const location = useLocation();
  const userData = location.state;

  async function getUserPayment(page) {
    const response = await api.getUserPayment(userData?.id);
    return response;
  }

  const results = useQuery(["getUserPayment"], () => getUserPayment(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const userPaymentData = results?.data?.data || [];
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div>
        <Link to="/user">
          <div className="flex items-center gap-1 mb-4 md:mb-5">
            <ArrowSquareLeft color="#292D32" size={16} />
            <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
              User details
            </p>
          </div>
        </Link>

        <div className="border border-[#E1E1E1] rounded-[6px] p-2 sm:p-4 md:p-5 lg:p-7 xl:p-9">
          <p>User Details</p>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Name <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.username}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Email <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.email}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Phone Number <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.phone_number}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Category <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.category?.map((item) => item)}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Date Joined <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {formatDate(userData?.date_joined)}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Gender <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.gender}
              </div>
            </div>

            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Total Follower(s) <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.total_follower}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Total Following <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.total_following}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Total Post <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.total_post}
              </div>
            </div>
            <div>
              <p classsName="text-sm mb-1 text-[#2e2e2e]">
                Session Attended <sup className="">*</sup>
              </p>
              <div className="border border-[#E1E1E1] min-h-[30px] md:min-h-[38px] w-full rounded-[4px] px-2 py-1 md:py-2 text-[#6F6F6F] text-sm">
                {userData?.session_used}
              </div>
            </div>
          </div>
        </div>

        <button
          className={`pb-2  mt-5 cursor-pointer flex items-center gap-[6px]  text-[#00B0C7] border-b-[2px] border-[#00B0C7]`}
        >
          <p>Payment Details</p>{" "}
        </button>

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
                          ID
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                      >
                        <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                          Date/Time
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                      >
                        <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                          Amount
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                      >
                        <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                          Category
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
                    {userPaymentData && userPaymentData?.length < 1 && (
                      <EmtyTable label={"No Payment Yet"} cols={6} />
                    )}

                    {userPaymentData?.map((item, index) => (
                      <tr className="border-b-[0.8px] border-[#E4E7EC]">
                        <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                          {index + 1}
                        </td>
                        <td className="px-5 py-[16px] text-[14px] whitespace-nowrap ">
                          <p className="font-medium whitespace-nowrap">
                            {item?.username}
                          </p>
                        </td>
                        <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                          {formatDate(item?.date_joined)}
                        </td>
                        <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                          {item?.session_used}
                        </td>
                        <td className="px-5 py-[16px] text-[14px]  text-[#9C9C9C]">
                          {item?.email}
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
                            <p>{item?.status}</p>
                          </div>{" "}
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
    </div>
  );
};

export default UserDetails;
