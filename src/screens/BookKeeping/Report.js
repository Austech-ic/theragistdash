import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../../api";
import ReportCard from "./component/ReportCard";
import TableLoading from "../../components/TableLoading";
import DatePicker from "react-datepicker";
import LoadingSkeleton from "./component/ReportLoading";
import EmptyReport from "./component/EmptyReport";

const BookKeepingReport = () => {
  const [startdate, setStartdate] = useState("");
  const [enddate, setEndDate] = useState("");
  const getTagQuery = useQuery(
    ["getBalanceSheet", startdate, enddate],
    () => getBalanceSheet(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function getBalanceSheet() {
    try {
      const response = await api.getBalanceSheet({
        params: { end_date: enddate, start_date: startdate },
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  const reportData = getTagQuery?.data?.balance_sheet || [];
  return (
    <div className="p-[20px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#ffff] ">
        <div className="border-b border-b-[#E4E7EC] h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                Book Keeping Report{" "}
              </p>
            </div>
            <div className="h-[24px] md:h-[28px] w-[1px] bg-[#D0D5DD]" />
          </div>
        </div>
        <div className="p-[10px] md:p-[16px] lg:p-[20px]">
          {" "}
          <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar">
            <DatePicker
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="Start Date"
              selected={startdate}
              onChange={(date) => setStartdate(date)}
            />
            <DatePicker
              className="w-[200px] h-[36px] bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              placeholderText="End Date"
              selected={enddate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
      </div>
      {getTagQuery?.isLoading && <LoadingSkeleton />}
      {!getTagQuery?.isLoading &&  reportData?.length <1  && <EmptyReport />}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-6">
        {!getTagQuery?.isLoading && reportData?.map((item, index) => (
          <ReportCard
            key={index}
            currency={item.currency}
            total_income={item.total_income}
            total_expense={item.total_expense}
            net_balance={item.net_balance}
          />
        ))}
      </ul>
    </div>
  );
};

export default BookKeepingReport;
