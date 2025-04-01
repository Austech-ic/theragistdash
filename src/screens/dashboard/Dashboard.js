import React, { useState } from "react";
import TotalCard from "./components/TotalCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BrifecaseTimer, Profile2User, WalletMinus } from "iconsax-react";
import { Link } from "react-router-dom";
import CatCard from "./components/CatCard";
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
import faker from "faker";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

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

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Day");
  const [year, setYear] = useState()

  async function getDashboard(page) {
    const response = await api.getDashboard({});
    return response;
  }

  const results = useQuery(["dashboard"], () => getDashboard(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const dashboardData = results?.data?.data || [];

  async function getDashboardAnalytics(page) {
    const response = await api.getDashboardAnalytics({
      params : {
        year
      }
    });
    return response;
  }

  const analyticResults = useQuery(["getDashboardAnalytics", year], () =>   getDashboardAnalytics(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const analyticsData = analyticResults?.data?.data || [];
  const labels = analyticsData?.map((item) => item?.month)

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: analyticsData?.map((item) => item?.point),
        backgroundColor: "#00B0C7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Removes grid lines on X-axis
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const pieData = {
    labels: ["female", "Male"],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          dashboardData?.patient_gender?.Female,
          dashboardData?.patient_gender?.Male,
        ],
        backgroundColor: ["#F7A30A", "#00B0C7"],
        borderColor: ["#F7A30A", "#00B0C7"],
        borderWidth: 0.5,
      },
    ],
  };

  const filterchart = [
    {
      label: "Day",
      value: 1,
    },
    {
      label: "Week",
      value: 2,
    },
    {
      label: "Month",
      value: 3,
    },
  ];

  const avCost = "N" + " " + dashboardData?.average_cost?.toFixed(2);
  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div>
          <div className=" flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
            <TotalCard
              icon={Icon}
              iconName={"healthicons:inpatient"}
              total={dashboardData?.total_patients}
              totalLabel={"Total Patients"}
            />
            <TotalCard
              icon={Profile2User}
              iconName={""}
              total={dashboardData?.total_patients}
              totalLabel={"Total Counselor"}
            />
            <TotalCard
              icon={WalletMinus}
              iconName={""}
              total={avCost}
              totalLabel={"Avg. Treat. Cost"}
            />
            <TotalCard
              icon={BrifecaseTimer}
              iconName={""}
              total={dashboardData?.daily_session}
              totalLabel={"Daily Session"}
            />
          </div>
          {/* Categories */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] ms:text-[18px] lg:[20px] xl:text-[22px] text-medium text-[#282828]">
                Categories
              </h2>
              <Link
                to="/categories"
                className="text-[14px] ms:text-[16px] lg:[18px]  text-light text-[#282828]"
              >
                See all
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
              {dashboardData?.categories?.slice(0,4).map((item) => (
                <CatCard
                  name={item?.name}
                  color={"#" + item?.color}
                  total={item?.price}
                />
              ))}
            </div>
          </div>
          <div className="bg-white mt-6 rounded-lg border-[1px] border-[#E1E1E1]  h-[280px] sm:h-[379px] w-full  mt">
            <div className="p-[10px] md:p-[14px] flex-between bg-white rounded-tr-lg rounded-tl-lg    ">
              <p className="font-semibold text-[14px] leading-[14px] whitespace-nowrap  text-[#000]  ">
                User Registration{" "}
              </p>

              <select
                type="text"
                placeholder=""
                className="w-[80px]   bg-[#F9FAFB] border-[#E1E1E1]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#00B0C7] focus:border-[#00B0C7] "
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
            {/* <div className="px-[10px] md:px-[14px] flex gap-2 items-center">
              {filterchart.map((item) => (
                <div
                  onClick={() => setSelectedFilter(item?.label)}
                  className={`rounded-md border-[#E1E1E1] px-2 py-1  ${
                    item?.label === selectedFilter
                      ? "bg-[#00B0C7] text-white"
                      : "bg-[#fff] text-[#282828]"
                  } text-sm`}
                >
                  {item?.label}
                </div>
              ))}
            </div> */}

            <div className="px-[16px] mt-5 h-[210px] md:h-[260px] flex justify-center ">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="rounded-[12px] bg-[#FBFBFB] border border-[#E1E1E1] py-[10px] md:py-[15px]">
            <p className="text-center text-sm  text-[#282828] font-medium ">
              Patients by Division
            </p>
            <div className="border-t border-[#E1E1E1]">
              {dashboardData?.patient_division?.slice(0,7).map((item, index) => (
                <div className="px-3 flex  items-center gap-2 py-2 border-b border-[#E1E1E1] ">
                  <Icon
                    icon="ri:mental-health-line"
                    width="20"
                    height="20"
                    color={"#BCBCBC"}
                  />{" "}
                  <p className="text-[12px] md:text-sm flex-1 text-[#BCBCBC]">
                    {item?.name}
                  </p>{" "}
                  <p className="text-[12px] md:text-sm text-[#282828]">
                    {item?.user_count}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-8 lg:flex-col">
          <div className="rounded-[12px] w-[200px] bg-[#FBFBFB] border border-[#E1E1E1] py-[10px] md:py-[15px]">
            <p className="text-center text-sm  text-[#282828] font-medium ">
              Patients by Gender
            </p>
            <div className="border-t border-[#E1E1E1] py-5">
              <Doughnut data={pieData} />
            </div>
          </div>
          <div className="rounded-[12px] w-[200px] bg-[#FBFBFB] border border-[#E1E1E1] py-[10px] md:py-[15px]">
            <p className="text-center text-sm  text-[#282828] font-medium ">
              Mood Analysis
            </p>
            <div className="border-t border-[#E1E1E1] py-5">
              <div className="mx-auto h-[40px] md:h-[50px] xl:h-[60px] w-[40px] md:w-[50px] flex justify-center xl:w-[60px] rounded-full bg-[#EDEDED] ">
                <p className="text-[24px] md:text-[32px] xl:text-[42px] text-center  ">
                  😁
                </p>
              </div>

              <div className="px-2 mt-4">
                {dashboardData?.mood?.map((item, index) => (
                  <div key={index} className=" items-center gap-1 mb-1">
                    <p className="text-[13px] text-[#2e2e2e]">
                      {item?.emoji_name}
                    </p>
                    <ProgressBar
                      completed={item?.user_count}
                      bgColor={"#F7A30A"}
                      height="6px"
                      isLabelVisible={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
