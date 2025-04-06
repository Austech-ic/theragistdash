import { ArrowSquareLeft } from "iconsax-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../utils/helperFunctions";

const AsssessmentResponse = () => {
  const location = useLocation();

  const user = location?.state;

  async function getUserAssessmentHistoryResponse(page) {
    const response = await api.getUserAssessmentHistoryResponse(user?.id);
    return response;
  }

  const results = useQuery(
    ["getUserAssessmentHistoryResponse"],
    () => getUserAssessmentHistoryResponse(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const historyData = results?.data?.data || [];

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div>
        <div className="flex items-center gap-1 mb-4 md:mb-5">
            <Link to="/user-assessment/assessment-details">
          <ArrowSquareLeft color="#292D32" size={16} /></Link>
          <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
            {user?.name} summary/ {formatDate(user?.created_at)}
          </p>
        </div>
      </div>

      <div>
        {historyData?.map((item, index) => (
            <div className="mb-3  lg:mb-4"
            >
                <p className="text-sm font-medium lg:font-semibold"> {index+1}. {item?.question}</p>
                <p className="text-sm font-light">{item?.answer}</p>
            </div>
        ))}

      </div>
    </div>
  );
};

export default AsssessmentResponse;
