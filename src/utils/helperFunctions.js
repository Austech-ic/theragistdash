import api from "../api";
import { AES, enc } from "crypto-js";
import CryptoJS from "crypto-js";
import AES256 from "aes-everywhere";

// or
// import AES256 from 'aes-everywhere';

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

  userData = JSON.parse(userData);
  let decryptuserData = decryptaValue(userData);
  decryptuserData = JSON.parse(decryptuserData);

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
    console.log("users===>", response);

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
