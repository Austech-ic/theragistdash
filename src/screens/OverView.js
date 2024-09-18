import {
  Ghost,
  MenuBoard,
  MobileProgramming,
  Task,
  User,
  UserOctagon,
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

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 2000, max: 20000 })),
      backgroundColor: "#F05800",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: "rgba(243, 121, 51, 1)",
    // },
  ],
};

export const pieData = {
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


const OverView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const result = [{ status: "Success" }];

  return (
    <div className="p-[20px] bg-[#F2F2F2]  ">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full max-w-[270px] mx-auto bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Wallet Balance
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <UserOctagon variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
            ₦ 250,000.00
            </p>
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              View employee
            </p>
          </div>
        </li>
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full mx-auto max-w-[270px] bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Total Users
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <MenuBoard variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              20
            </p>
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              View Users
            </p>
          </div>
        </li>
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full mx-auto max-w-[270px] bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Total Stock
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <Task variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              50
            </p>
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              View stock
            </p>
          </div>
        </li>
        <li className="border-[0.2px] border-[#98a2b3] rounded-[8px] h-[156px] w-full max-w-[270px] mx-auto bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              Total Task
            </p>
            <buttion className="h-[32px] w-[32px] flex justify-center items-center bg-[#F0F2F5] rounded-md">
              <Task variant="Linear" color="#667185" size="16" />
            </buttion>
          </div>
          <div className="px-[20px] py-[13px] border-t-[0.2] border-[#98A2B3] bg-[#F9FAFB] flex-between rounded-br-lg rounded-bl-lg ">
            {" "}
            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[20px] font-bold leading-[24px]  ">
              50
            </p>
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              View tasks
            </p>
          </div>
        </li>
      </ul>
      <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3] mt-[20px] h-[459px] w-full  mt">
        <div className="p-[16px] md:p-[20px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
          <p className="text-[18px]  leading-[27px] text-[#000]  ">
            Transaction Chart
          </p>
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
          <div class="">
            <div class="inline-block min-w-full">
              <div class="overflow-x-auto rounded-lg">
                <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                  <thead className="bg-[#F9FAFB]">
                    <tr className="">
                      <th
                        scope="col"
                        className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                      >
                        <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                          Name
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
                          Channel
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
                    {/* {isLoading && <div>Loading...</div>}
                  {!isLoading && TaskSummaryData.length === 0 && (
                    <tr>
                      <td className="text-center" colspan="6">
                        <img
                          src="./nodata.gif"
                          className="mx-auto mt-6 h-[70px] "
                          alt=""
                        />
                        <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                          No Project
                        </h3>
                      </td>
                    </tr>
                  )}
                  {TaskSummaryData &&
                    TaskSummaryData?.map((result) => ( */}
                    <tr key="_" className="mb-2 hover:bg-light-gray">
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        Ogundele Caleb{" "}
                      </td>
                  
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        #120,000.00
                      </td>
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        Transfer{" "}
                      </td>
                     
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        <button
                          className={`rounded-[20px] md:rounded-[40px] w-[60px] md:w-[74px] py-[2px] md:py-[4px] mx-auto ${
                            result.status === "Pending"
                              ? "bg-[rgb(255,245,230)] text-[#FF9800]"
                              : result.status === "Ongoing"
                              ? "bg-[#F9FAFB] text-[#667185]"
                              : "bg-[#EDF7EE] text-[#4CAF50]"
                          }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px]`}
                        >
                          <p>Success</p>
                        </button>{" "}
                      </td>
                      <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                        Sep 11, 2024 (at 03.00 AM)
                      </td>
                    </tr>
                    {/* ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row gap-[30px]  mt-[24px]">
        <TaskCard />
        <ProjectStatus />
      </div>
      <div className="flex flex-col md:flex-row gap-[30px]  mt-[24px]">
        <AccountBalance />

        <LatestIncome />
      </div> */}
      <div className="overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8 mt-5">
          <div class="inline-block min-w-full  sm:px-6 lg:px-8 overflow-hidden">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                        #
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Username{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Role
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Last Login
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        IP Address
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Country
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Device
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        OS
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {isLoading && <div>Loading...</div>}
                {!isLoading && TaskSummaryData.length === 0 && (
                  <tr>
                    <td className="text-center" colspan="6">
                      <img
                        src="./nodata.gif"
                        className="mx-auto mt-6 h-[70px] "
                        alt=""
                      />
                      <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                        No Project
                      </h3>
                    </td>
                  </tr>
                )}
                {TaskSummaryData &&
                  TaskSummaryData?.map((result) => ( */}
                  <tr key="_" className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      1
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      Ogundele Caleb
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      Staff{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      05-03-2024 12:00 AM{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      ** ** ** ****
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      Nigeria{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      Desktop{" "}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      Windows{" "}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-[30px]  mt-[24px]">
        <CreatedDeal />

        <ModifiedDeal />
      </div> */}
    </div>
  );
};

export default OverView;
