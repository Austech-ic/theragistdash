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
  const color = "#00B0C7";
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
        data: [30, 70],
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

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex flex-row gap-6 md:gap-8">
        <div>
          <div className=" flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
            <TotalCard
              icon={Icon}
              iconName={"healthicons:inpatient"}
              total={528}
              totalLabel={"Total Patients"}
            />
            <TotalCard
              icon={Profile2User}
              iconName={""}
              total={72}
              totalLabel={"Total Counselor"}
            />
            <TotalCard
              icon={WalletMinus}
              iconName={""}
              total={"N 1200"}
              totalLabel={"Avg. Treat. Cost"}
            />
            <TotalCard
              icon={BrifecaseTimer}
              iconName={""}
              total={53}
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
                to="/"
                className="text-[14px] ms:text-[16px] lg:[18px]  text-light text-[#282828]"
              >
                See all
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px]">
              <CatCard name="Addiction" color="#ECBB5F" total={1200} />
              <CatCard name="Anxiety" color={"#57315A"} total={1200} />
              <CatCard name="Depression" color="#ECACAD" total={1200} />
              <CatCard name="Addiction" color="#FF8989" total={1200} />
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
                // value={filter}
                // onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">2024</option>
                <option value="d">Daily</option>
                <option value="m">Monthly</option>
                <option value="y">Yearly</option>
              </select>
            </div>
            <div className="px-[10px] md:px-[14px] flex gap-2 items-center">
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
            </div>

            <div className="px-[16px] mt-5 h-[210px] md:h-[240px] flex justify-center ">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
        <div className="rounded-[12px] h-40 bg-[#FBFBFB] border border-[#E1E1E1] py-[10px] md:py-[15px]">
          <p className="text-center text-sm  text-[#282828] font-medium ">
            Patients by Division
          </p>
          <div className="border-t border-[#E1E1E1]">
            <div className="px-3 flex items-center gap-2 py-2 border-b border-[#E1E1E1] ">
              <Icon
                icon="ri:mental-health-line"
                width="20"
                height="20"
                color={"#BCBCBC"}
              />{" "}
              <p className="text-[12px] md:text-sm text-[#BCBCBC]">
                Depression
              </p>{" "}
              <p className="text-[12px] md:text-sm text-[#282828]">23</p>
            </div>
          </div>
        </div>
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
            <p className="text-[24px] md:text-[32px] xl:text-[42px] text-center  ">😁</p>
           </div>

           <div className="px-2 mt-4">

           <ProgressBar completed={60} bgColor={"#F7A30A"} height="6px" isLabelVisible={false}/>
           </div>
          </div>
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default Dashboard;
