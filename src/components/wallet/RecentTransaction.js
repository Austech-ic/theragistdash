import {
    Add,
    ArrowDown,
    ArrowUp,
    Book,
    Calendar,
    CloseCircle,
    DocumentDownload,
    DocumentUpload,
    Edit,
    ElementEqual,
    Eye,
    FilterSearch,
    Layer,
    Maximize4,
    Message2,
    More,
    Note1,
    RowHorizontal,
    SearchNormal1,
    Trash,
  } from "iconsax-react";

  import React, { useState } from "react";
  import { ClipLoader } from "react-spinners";
  

  import { enqueueSnackbar } from "notistack";
  import { useQuery } from "@tanstack/react-query";

  
  import "react-datepicker/dist/react-datepicker.css";
  import "react-loading-skeleton/dist/skeleton.css";
  import { NumericFormat } from "react-number-format";
  import moment from "moment";
import api from "../../api";
import EmptyTable from "../EmptyTable";
import TableLoading from "../TableLoading";

const RecentTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState("1");
const [perPage, setPerPage] = useState("10");
    async function getTransaction(page) {
        const response = await api.getTransaction({
          params: {
            page,
            per_page: perPage,
          },
        });
        return response;
      }
    
      const results = useQuery(
        ["transactions", page],
        () => getTransaction(page),
        {
          keepPreviousData: true,
          refetchOnWindowFocus: "always",
        }
      );
    
      const handlePrev = (event) => {
        if (event) {
          setPage(page - 1);
        }
      };
      const handleNext = (event) => {
        if (event) {
          setPage(page + 1);
        }
      };

  return (
    <div>  <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3] mt-[40px]  w-full  mt">
    <div className="p-[16px] md:p-[20px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
      <p className="text-[18px]  leading-[27px] text-[#000]  ">
        Recent Transaction
      </p>
    </div>
    <div className="overflow-x-auto">
        <div class="">
          <div class="inline-block min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                      Transaction Ref
                      
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                      Reason
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Amount
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Type
                      </div>
                    </th>
                   

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                        Date{" "}
                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {results?.isLoading && <TableLoading cols={8} />}
                  {results?.data && results?.data?.data?.legth === 0 && (
                    // decryptaValue(results?.data?.data) === 0 &&
                    <EmptyTable cols={8} />
                  )}
                  {/*  {TaskSummaryData &&
                  results?.data?.data?.map((result) => ( */}


                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                       
                       <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.reference}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.reason}
                        </td>
                    
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <NumericFormat
                            value={result?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            // renderText={(value) => (
                            //   <Text className="text-[#fff]  font-semibold font-i_medium text-[16px] leading-[19px]  tracking-[0.2px]   ">
                            //     {value}
                            //   </Text>
                            // )}
                          />
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <div className="flex-item gap-1">
                            {" "}
                            {result?.type === "debit" ? (
                              <ArrowUp size={14} color="red" />
                            ) : (
                              <ArrowDown size={14} color="green" />
                            )}{" "}
                            {result?.type}
                          </div>
                        </td>
                      
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px]  font-medium text-left  ">
                          <button
                            className={`rounded-[20px] md:rounded-[40px] w-[80px] w- py-[2px] md:py-[4px] mx-auto ${
                              result.status === "failed"
                                ? "bg-[rgb(255,245,230)] text-red-500"
                                : result.status === "pending"
                                ? "bg-[rgb(255,245,230)] text-orange-040"
                                  : result.status === "reversed"
                                ? "bg-yellow-100 text-yellow-500"
                                : "bg-[#EDF7EE] text-[#4CAF50]"
                            }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                          >
                            <p>{result.status}</p>
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {moment(result?.date).format("MMM DD, HH:mm:ss")}
                        </td>

    
                  
                      </tr>
                    ))}
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </div></div>
  )
}

export default RecentTransaction