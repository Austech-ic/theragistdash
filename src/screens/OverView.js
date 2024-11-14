import {
  ArrowDown,
  ArrowUp,
  Folder2,
  Ghost,
  MenuBoard,
  MobileProgramming,
  Task,
  User,
  WalletMoney,
} from "iconsax-react";
import React, { useState } from "react";
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
  BarElement,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import faker from "faker";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import EmptyTable from "../components/EmptyTable";
import TableLoading from "../components/TableLoading";
import moment from "moment";
import { Link } from "react-router-dom";
// import { TaskAnalytics } from "../components/Data";
// import {
//   ProjectStatus,
//   TaskCard,
// } from "../components/project/ProjectAnalytics";
// import {
//   AccountBalance,
//   LatestIncome,
// } from "../components/finance/FinanceAnalytics";
// import { CreatedDeal, ModifiedDeal } from "../components/crm/CrmAnalyttics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const OverView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const result = [{ status: "Success" }];
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("d");

  async function getTransaction(page) {
    const response = await api.getTransaction({
      params: {
        page,

        //from: startdate,
        //until: enddate,
        //is_credit: type,
      },
    });
    return response;
  }

  const TransactionQuery = useQuery(
    ["transactions", page],
    () => getTransaction(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const transData = TransactionQuery?.data?.data.slice(0, 5) || [];

  async function getTransactionChart(page) {
    const response = await api.getTransactionChart({
      params: {
        filter,

        //from: startdate,
        //until: enddate,
        //is_credit: type,
      },
    });
    return response;
  }

  const ChartQuery = useQuery(
    ["chart", page, filter],
    () => getTransactionChart(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const chartsData = ChartQuery?.data?.data || [];

  const options = {
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

  const data = {
    labels: chartsData?.map((item) => item.date),
    datasets: [
      {
        label: "Credit",
        data: chartsData?.map((item) => item.total_credit),
        backgroundColor: "#26ae5f",
      },
      {
        label: "Debit",
        data: chartsData?.map((item) => item.total_debit),
        backgroundColor: "rgba(243, 121, 51, 1)",
      },
    ],
  };

  const pieData = {
    labels: ["On Hold", "In Progress", "Finished"],
    datasets: [
      {
        label: "Number of Task",
        data: [5, 8, 12],
        backgroundColor: [
          "rgba(255, 173, 51, 1)",
          "rgba(243, 121, 51, 1)",
          "rgba(112, 191, 115, 1)",
        ],
        borderColor: [
          "rgba(255, 173, 51, 1)",
          "rgba(243, 121, 51, 1)",
          "rgba(112, 191, 115, 1)",
        ],
        borderWidth: 1,
        borderJoinStyle: "round",
        spacing: 3,
        borderRadius: 8,
      },
    ],
  };

  async function getOverview(page) {
    const response = await api.getOverview({
      params: {
        //from: startdate,
        //until: enddate,
        //is_credit: type,
      },
    });
    return response;
  }

  const SummaryQuery = useQuery(["summ", page], () => getOverview(page), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const summaryData = SummaryQuery?.data?.data || [];

  return (
    <div className="p-[20px] bg-[#F2F2F2]  ">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full max-w-[270px] mx-auto bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Wallet Balance
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <WalletMoney variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              <NumericFormat
                value={result?.balance_after}
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
            </p>
          </div>
        </li>
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full mx-auto max-w-[270px] bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Todays Collection
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <MenuBoard variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              <NumericFormat
                value={summaryData?.todays_collection}
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
            </p>
          </div>
        </li>
        {/* <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full mx-auto max-w-[270px] bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Dispute
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <Task variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              ₦ 250,000.00
            </p>
          </div>
        </li> */}
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full max-w-[270px] mx-auto bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Total Team Members
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <Task variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              {summaryData?.total_users}
            </p>
            <Link to="/setting/my-team">
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              View Team
            </p>
            </Link>
          </div>
        </li>
      </ul>
      <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3] mt-[20px] h-[459px] w-full  mt">
        <div className="p-[16px] md:p-[20px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
          <p className="text-[18px]  leading-[27px] text-[#000]  ">
            Transaction Chart
          </p>

          <select
              type="text"
              placeholder=""
              className="w-[240px] h-[44px] bg-[#F9FAFB]  px-2 py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
           
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
           >
              <option value="">Select Frequency</option>
              <option value="d">Daily</option>
              <option value="m">Monthly</option>
              <option value="y">Yearly</option>
            </select>
        </div>
        <div className="px-[16px] mt-5 h-[350px] flex justify-center ">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3] mt-[20px] h-[459px] w-full  mt">
        <div className="p-[16px] md:p-[20px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
          <p className="text-[18px]  leading-[27px] text-[#000]  ">
            Recent Transaction
          </p>
        </div>
        <div className="overflow-x-auto">
          <div class="sm:-mx-6 lg:-mx-8 mt-5">
            <div class="inline-block min-w-full  sm:px-6 lg:px-8">
              <div class="overflow-x-auto rounded-lg">
                <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                  <thead className="bg-[#F9FAFB]">
                    <tr className="">
                      <th
                        scope="col"
                        className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                      >
                        <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
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
                    {TransactionQuery?.isLoading && <TableLoading cols={8} />}
                    {TransactionQuery?.data && transData === 0 && (
                      // decryptaValue(results?.data?.data) === 0 &&
                      <EmptyTable cols={8} />
                    )}
                    {/*  {TaskSummaryData &&
                  results?.data?.data?.map((result) => ( */}

                    {TransactionQuery?.data &&
                      transData?.map((result) => (
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

                          <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                            <button
                              className={`rounded-[20px] md:rounded-[40px] w-[80px] w- py-[2px] md:py-[4px] mx-auto ${
                                result.status === "failed"
                                ? "bg-[rgb(255,245,230)] text-red-500"
                                : result.status === "pending"
                                ? "bg-[rgb(255,245,230)] text-orange-400"
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

export default OverView;
