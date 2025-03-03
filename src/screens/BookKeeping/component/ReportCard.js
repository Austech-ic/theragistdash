import React from "react";
import { NumericFormat } from "react-number-format";
import Trend from "react-trend";

const ReportCard = ({currency, total_income, total_expense, net_balance}) => {
  function checkNumber(value) {
    if (value > 0) {
      return "Positive";
    } else if (value < 0) {
      return "Negative";
    } else {
      return "Zero";
    }
  }

  return (
    <div className="border rounded-xl p-2 shadow bg-gray-50 ">
      <div className="flex justify-between gap-3 items-center text-sm">
        <p className=" font-semibold ">Currency:</p>{" "}
        <p>{currency}</p>
      </div>
      <div className="flex justify-between gap-3 items-center text-sm">
        <p className=" font-semibold ">Total Income:</p>{" "}
        <p>
          {" "}
          <NumericFormat
            value={total_income}
            displayType={"text"}
            thousandSeparator={true}
            prefix={currency}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>
      </div>
      <div className="flex justify-between gap-3 items-center text-sm">
        <p className=" font-semibold ">Total Expense:</p>{" "}
        <p>
          <NumericFormat
            value={total_expense}
            displayType={"text"}
            thousandSeparator={true}
            prefix={currency}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>
      </div>
      <div className="flex justify-between gap-3 items-center mb-2 text-sm">
        <p className=" font-semibold ">Net Balance:</p>{" "}
        <p className={`${checkNumber(net_balance) === "Positive"
            ? "text-green-500"
            : checkNumber(net_balance) === "Negative"
            ? "text-red-500"
            : "text-yellow-400"}`}>
          <NumericFormat
            value={net_balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={currency}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>
      </div>

      <Trend
        smooth
        autoDraw
        autoDrawDuration={3000}
        autoDrawEasing="ease-out"
        data={[0, 0, net_balance]}
        stroke={
          checkNumber(net_balance) === "Positive"
            ? "green"
            : checkNumber(net_balance) === "Negative"
            ? "red"
            : "yellow"
        }
        radius={5}
        strokeWidth={1}
        strokeLinecap={"butt"}
        width={250}
        height={30}
      />
    </div>
  );
};

export default ReportCard;
