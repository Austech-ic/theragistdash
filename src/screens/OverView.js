import {
  ArrowDown,
  ArrowUp,
  Book,
  CardSend,

  GridEdit,
  Layer,
  MenuBoard,
  MobileProgramming,
  Note,
  Profile2User,
  ProgrammingArrows,
  Setting,
  ShoppingCart,
  Task,
  User,
  WalletMoney,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
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
import { Bar, Line } from "react-chartjs-2";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import EmptyTable from "../components/EmptyTable";
import TableLoading from "../components/TableLoading";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { formatDateToText } from "../utils/helperFunctions";

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
  const navigation = useNavigate();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("d");
  const [copiedRef, setCopiedRef] = useState(null);

  const [isSwitchWallet, setIsSwitchWallet] = useState(false);

  async function getProfile(page) {
    const response = await api.getProfile({ params: { page } });
    return response;
  }

  const ProfileQuery = useQuery(["profile"], () => getProfile(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const profileData = ProfileQuery?.data || [];

  const toggleWallet = () => {
    setIsSwitchWallet(!isSwitchWallet);
  };
  // const initialSelect = {
  //   name: "NGN Wallet",
  //   Image: "/assets/ng.png",
  //   abb: "NGN",
  //   symbol: "₦",
  //   color: "#26AE5F",
  //   balance: profileData?.default_partner?.wallet_balance,
  // };

  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    if (profileData?.default_partner?.wallet_balance !== undefined) {
      setSelectedCard({
        name: "NGN Wallet",
        Image: "/assets/ng.png",
        abb: "NGN",
        symbol: "₦",
        color: "#26AE5F",
        balance: profileData.default_partner.wallet_balance,
      });
    }
  }, [profileData]);
  const Card = [
    {
      name: "NGN Wallet",
      Image: "/assets/ng.png",
      abb: "NGN",
      symbol: "₦",
      color: "#26AE5F",
      balance: profileData?.default_partner?.wallet_balance,
    },
    {
      name: "USD Wallet",
      abb: "USD",
      Image: "/assets/USbig.png",

      symbol: "$",
      color: "#3B6896",
      balance: profileData?.default_partner?.dollar_wallet_balance,
    },
  ];

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

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   width: "100%",
  //   plugins: {
  //     // legend: {
  //     //   position: 'top',
  //     // },
  //     // title: {
  //     //   display: true,
  //     //   text: 'Chart.js Line Chart',
  //     // },
  //   },
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      // title: {
      //   display: true,
      //   text: "Order Status",
      // },
      legend: {
        display: true,
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

  // Function to copy text to the clipboard
  const handleCopy = async (transactionRef) => {
    try {
      await navigator.clipboard.writeText(transactionRef);
      setCopiedRef(transactionRef); // Set copied ref to show feedback
      setTimeout(() => setCopiedRef(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {
      //console.error("Failed to copy:", err);
    }
  };

  const quickAction = [
    {
      icon: <CardSend size={20} color="#3B6896" />,
      label: "Transfer",
      action: () => {
        navigation("/wallet/overview");
      },
    },
    {
      icon: <ProgrammingArrows size={20} color="#3B6896" />,
      label: "Swap USD",
      action: () => {
        navigation("/usd-wallet");
      },
    },
    {
      icon: <Layer size={20} color="#3B6896" />,
      label: "Bulk Payout",
      action: () => {
        navigation("/bulk-payment");
      },
    },
    {
      icon: <Book size={20} color="#3B6896" />,
      label: "Book Keeping",
      action: () => {
        navigation("/bookkeeping");
      },
    },

    {
      icon: <Note size={20} color="#3B6896" />,
      label: "Payment Link",
      action: () => {
        navigation("/paymentlink");
      },
    },
    {
      icon: <GridEdit size={20} color="#3B6896" />,
      label: "Create Invoice",
      action: () => {
        navigation("/invoice");
      },
    },
    {
      icon: <ShoppingCart size={20} color="#3B6896" />,
      label: "Add Product",
      action: () => {
        navigation("/store");
      },
    },
    {
      icon: <Profile2User size={20} color="#3B6896" />,
      label: "Add Customers",
      action: () => {
        navigation("/customers");
      },
    },

    {
      icon: <Setting size={20} color="#3B6896" />,
      label: "Settings",
      action: () => {
        navigation("/setting/personal-info");
      },
    },
  ];

  return (
    <div className="p-[10px] md:p-[20px] bg-[#F2F2F2]  ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
       
        <li className="border-[0.2px] border-[#98a2b3] shadow  rounded-[8px] h-[140px] md:h-[176px]  w-full mx-auto   bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] font-semibold text-[14px] leading-[14px]  ">
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
              />
            </p>
          </div>
        </li>

        <li className="border-[0.2px] border-[#98a2b3] shadow rounded-[8px] h-[140px] md:h-[176px]  w-full   mx-auto bg-[#ffff] flex flex-col justify-between ">
          <div className="px-[20px] py-[24px]  flex-between">
            {" "}
            <p className="text-[#000] font-semibold text-[14px] leading-[14px]  ">
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
              <p className="text-[#667185] text-[14px] md:text-[14px]  font-normal leading-[24px] ">
                View Team
              </p>
            </Link>
          </div>
        </li>
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 mt-[20px]">
        <div className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] bg-[#fefefeec] shadow p-2 md:p-3 ">
          <p className="text-[#000]   font-semibold text-[14px] leading-[14px] text-center  tracking-[0.2px] ">
            Quick Action
          </p>
          <div className=" mt-7 grid grid-cols-3 gap-2 gap-y-3">
            {quickAction?.map((card) => (
              <div
                className="cursor-pointer px-1 py-2 hover:bg-gray-100 rounded-lg shadow"
                onClick={card.action}
              >
                <div className="flex flex-col items-center gap-2  ">
                  {card.icon}
                  <p className="text-[12px] whitespace-nowrap">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3]  h-[280px] md:h-[359px] w-full  mt">
          <div className="p-[10px] md:p-[14px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
            <p className="font-semibold text-[14px] leading-[14px] whitespace-nowrap  text-[#000]  ">
              Transaction Chart
            </p>

            <select
              type="text"
              placeholder=""
              className="w-[120px] md:w-[240px]  bg-[#F9FAFB]  px-2 py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] focus:border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#26ae5f] focus:border-[#26ae5f] "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select Frequency</option>
              <option value="d">Daily</option>
              <option value="m">Monthly</option>
              <option value="y">Yearly</option>
            </select>
          </div>
          <div className="px-[16px] mt-5 h-[260px] md:h-[250px] flex justify-center ">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border-[0.2px] border-[#98a2b3] mt-[20px]  w-full  mt">
        <div className="p-[10px] md:p-[14px] flex-between bg-white rounded-tr-lg rounded-tl-lg  border-b-[0.8px]  border-[#D0D5DD]">
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
