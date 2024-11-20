import api from "../api";
import { AES, enc } from "crypto-js";
import CryptoJS from "crypto-js";
import AES256 from "aes-everywhere";
import { enqueueSnackbar } from "notistack";
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
  {
      id:1,
      name: "Food"
  },
  {
      id:2,
      name: "Drinks"
  },
  {
      id:3,
      name: "Transportation"
  },
  {
      id:4,
      name: "Gift"
  },
  {
      id:5,
      name: "Debt"
  },
  {
      id:6,
      name: "Rent"
  },
  {
      id:7,
      name: "Education"
  },
  {
      id:8,
      name: "Shopping"
  },
  {
      id:9,
      name: "Utilities"
  },
  {
      id:10,
      name: "Others"
  },
  {
      id:11,
      name: "Medical Expenses"
  },
  {
      id:12,
      name: "Lifestyle"
  },
  {
      id:13,
      name: "Charitable Donations"
  },
  {
      id:14,
      name: "Investments"
  },
  {
      id:15,
      name: "Business Expenses"
  },
  {
      id:16,
      name: "Fitness"
  },
  {
      id:17,
      name: "Insurance"
  },


]
