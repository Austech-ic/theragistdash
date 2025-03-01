import api from "../api";
import { AES, enc } from "crypto-js";
import CryptoJS from "crypto-js";
import AES256 from "aes-everywhere";
import Moment from "moment";
import { useNavigate } from "react-router-dom";



// decryption
export const decryptaValue = (value) => {
  const secretKey = "1234567890abcdef";

  const dencrypted = AES256.decrypt(value, secretKey);

  return dencrypted;
}; // decryption
export const encryptaValue = (value) => {
  const secretKey = "1234567890abcdef";
  const stringedValue = JSON.stringify(value);

  const dencrypted = AES256.encrypt(stringedValue, secretKey);

  return dencrypted;
};

export const DecryptUserData = () => {
  let userData = localStorage.getItem("authData");
//console.log("userData from top Bar", userData)
  userData = JSON.parse(userData);
  let decryptuserData = decryptaValue(userData);
  decryptuserData = JSON.parse(decryptuserData);
  //console.log("deuserData from top Bar", decryptuserData)

  return decryptuserData;
};

export const encryptValue = (value) => {
  const secretKey = "1234567890abcdef";

  const encrypted = CryptoJS.AES.encrypt(
    value,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(secretKey), // using secretKey as IV here (you can use a different IV)
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
  return encrypted;
};

export const decryptValue = (encryptedValue) => {
  const secretKey = "1234567890abcdef";
  // const base64Value = btoa(encryptedValue);
  const decrypted = CryptoJS.AES.decrypt(
    encryptedValue,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(secretKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const getRoles = async () => {
  try {
    const response = await api.getRoles({
      params: {},
    });
    return response;
  } catch (e) {}
};

export async function getUsers() {
  try {
    const response = await api.getUsers();
    //console.log("users===>", response);

    return response;
  } catch (error) {
    return error;
  }
}

export function formatTime(date) {
  const datetime = Moment(date);
  const formattedTime = datetime.format("hh.mm A");
  return formattedTime;
}

export function formatDate(datetimeStr) {
  const date = Moment(datetimeStr);
  const formattedDate = date.format("MMM DD, YYYY");

  return formattedDate;
}

export const getExchangeRate = (currency, rates) => {
  for (const item of rates) {
    if (item?.name == currency) {
      return item;
    }
    if (item?.name == currency) {
      return item;
    }
  }
}

export function getFormattedCurrentDay(format = "full") {
  const date = new Date();
  const options = {
    full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    short: { weekday: "short", month: "short", day: "numeric" },
    weekday: { weekday: "long" },
    compact: { weekday: "short" },
  };

  return date.toLocaleDateString("en-US", options[format]);
}
export function truncateSentence(sentence, maxLength) {
  if(!sentence) return " "
  if (sentence.length > maxLength) {
    return sentence.slice(0, maxLength) + "...";
  }
  return sentence; 
}

export function formatDateToText (date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  function getDayWithOrdinal(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  return `${getDayWithOrdinal(day)} ${month}, ${year}`;
}

export const Categories = [
  { id: 1, name: "Salary Payment" },
  { id: 2, name: "Vendor Payment" },
  { id: 3, name: "Utility Bill Settlement" },
  { id: 4, name: "Office Rent Payment" },
  { id: 5, name: "Loan Repayment" },
  { id: 6, name: "Equipment Purchase" },
  { id: 7, name: "Subscription Services" },
  { id: 8, name: "Tax Remittance" },
  { id: 9, name: "Legal Fees Payment" },
  { id: 10, name: "Insurance Premiums" },
  { id: 11, name: "Customer-Focused Transfers" },
  { id: 12, name: "Refund Processing" },
  { id: 13, name: "Cashback Payouts" },
  { id: 14, name: "Loyalty Rewards Payout" },
  { id: 15, name: "Customer Credit Top-Up" },
  { id: 16, name: "Payout to Contractors" },
  { id: 17, name: "Inter-Branch Fund Transfer" },
  { id: 18, name: "Petty Cash Replenishment" },
  { id: 19, name: "Staff Expense Reimbursement" },
  { id: 20, name: "Travel and Accommodation Payments" },
  { id: 21, name: "Training and Workshop Fees" },
  { id: 22, name: "IT Services and Maintenance Fees" },
  { id: 23, name: "Marketing and Advertising Spend" },
  { id: 24, name: "Inventory Procurement" },
  { id: 25, name: "Event Management Fees" },
  { id: 26, name: "Security Services Payment" },
  { id: 27, name: "Project Funding Disbursement" },
  { id: 28, name: "Research and Development Costs" },
  { id: 29, name: "Construction and Renovation Payments" },
  { id: 30, name: "Partnership/Joint Venture Payments" },
  { id: 31, name: "Investment in Subsidiaries" },
  { id: 31, name: "Others" },

]

export  function formatDatewithYear(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("dddd, Do MMMM, YYYY");
    return formattedDate;
  }

  export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }