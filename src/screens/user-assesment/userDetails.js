import { ArrowSquareLeft, Eye } from "iconsax-react";
import React from "react";
import EmtyTable from "../../components/common/EmtyTable";
import Details from "../../components/common/Details";
import { Link } from "react-router-dom";

const UserAsssessmentDetails = () => {
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div>
        <div className="flex items-center gap-1 mb-4 md:mb-5">
          <ArrowSquareLeft color="#292D32" size={16} />
          <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
            User details
          </p>
        </div>

        <div className="border border-[#E1E1E1] rounded-[6px] p-2 sm:p-4 md:p-5 lg:p-7 xl:p-9">
          <p>User Details</p>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
            <Details title={"Name"} details="Kemzy" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] text-[#2e2e2e]">
            Assessment History
          </p>

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
                          <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <EmtyTable
                        label={"No User Assessment History"}
                        cols={3}
                        noButton={true}
                      />

                      <tr className="border-b-[0.8px] border-[#E4E7EC]">
                        <td className="px-5 py-[16px] text-[14px]   text-[#2e2e2e]">
                          Assessment K10
                        </td>

                        <td className="px-5 py-[16px] whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                          31. Dec. 2022
                        </td>

                        <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                          <div className="flex items-center gap-1">
                            <Link to="/user-assessment/assessment-response">
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAsssessmentDetails;
