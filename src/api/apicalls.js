import { PROFILE, SETDEFUALTBUSINESS } from "../utils/AuthConfig";
import {
  BANKS,
  BUSINFO,
  BVN,
  CUSTOMERS,
 DOCUMENT,
 GETBUSINESSPROFILE,
 INITIATETRANSFER,
 RESETPIN,
 SENDOTP,
 SETPIN,
 TRANSACTION,
 UPDATECUSTOMERS,
 UPDATEKYC,
 VERIFYACCOUNTNUMBER,
 WALLETS,
 TRANSACTIONFULLLENGTH,
 TRANSACTIONSUMMARY,
 ADDTEAMMEMBER,GETTEAMMEMBER, GETTRANSACTIONBARCHART
} from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//transaction
export function getTransaction(data) {
  return apiGet(TRANSACTION, data);
}

export function getTransactionSummary(data) {
  return apiGet(TRANSACTIONSUMMARY, data);
}
export function getTransactionChart(data) {

  return apiGet(GETTRANSACTIONBARCHART, data);
}

export function getTransactionFullLength(data) {
  return apiGet(TRANSACTIONFULLLENGTH, data);
}

//profile

export function getProfile(data) {
  return apiGet(PROFILE, data);
}

//customer wallet

export function getWallet(data) {
  return apiGet(WALLETS, data);
}


//customers
export function getCustomers(data) {
  return apiGet(CUSTOMERS, data);
}
export function createCustomers(data) {
  return apiPost(CUSTOMERS, data);
}

export function updateCustomers(data) {
  return apiPut(UPDATECUSTOMERS + data);
}
export function deleteCustomers(data) {
  return apiDelete(UPDATECUSTOMERS + data);
}

export function setDefaultPartner(data) {
  return apiPost(SETDEFUALTBUSINESS, data);
}

export function createTeamMember(data) {
  return apiPost(ADDTEAMMEMBER, data);
}

export function getTeamMember(data) {
  return apiGet(GETTEAMMEMBER, data);
}



//transfer
export function initiateTransfer(data) {
  return apiPost(INITIATETRANSFER, data);
}

export function verifyAccountNunmber(data) {
  return apiPost(VERIFYACCOUNTNUMBER, data);
}

export function getBanks(data) {
  return apiGet(BANKS, data);
}

export function setPin(data) {
  return apiPost(SETPIN, data);
}

export function resetPin(data) {
  return apiPost(RESETPIN, data);
}
export function sendOtp(data) {
  return apiPost(SENDOTP, data);
}



//kyc
export function getKyc(data) {
  return apiGet(UPDATEKYC, data);
}

export function editKyc(data) {
  return apiPut(UPDATEKYC, data);
}
export function editBusInfo(data) {
  return apiPut(BUSINFO, data);
}
export function getBusInfo(data) {
  return apiGet(BUSINFO, data);
}

export function editBvn(data) {
  return apiPost(BVN, data);
}
export function getBvn(data) {
  return apiGet(BVN, data);
}
export function getBusProfile(data) {
  return apiGet(GETBUSINESSPROFILE, data);
}

export function uploadDoc(data) {
  return apiPost(DOCUMENT, data,  { 'Content-Type': 'multipart/form-data' });
}



