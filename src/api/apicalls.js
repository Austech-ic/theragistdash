import { PROFILE, SETDEFUALTBUSINESS } from "../utils/AuthConfig";
import {
  BANKS,
  BUSINFO,
  BVN,
  CUSTOMERS,
 DOCUMENT,
 INITIATETRANSFER,
 RESETPIN,
 SENDOTP,
 SETPIN,
 TRANSACTION,
 UPDATECUSTOMERS,
 UPDATEKYC,
 VERIFYACCOUNTNUMBER,
 WALLETS
} from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//dashboard
export function getTransaction(data) {
  return apiGet(TRANSACTION, data);
}

export function getProfile(data) {
  return apiGet(PROFILE, data);
}

export function getWallet(data) {
  return apiGet(WALLETS, data);
}

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

export function uploadDoc(data) {
  return apiPost(DOCUMENT, data,  { 'Content-Type': 'multipart/form-data' });
}



//task


// ========>>>> Inventory

// category
// export function getCategory(data = null) {
//   return apiGet(GETCATEGORY, data);
// }
// export function getACategory(id, data = null) {
//   return apiGet(GETACATEGORY + id, data);
// }
// export function createCategory(data) {
//   return apiPost(CREATECATEGORY, data);
// }
// export function updateCategory(id, data) {
//   return apiPut(UPDATECATEGORY + id, data);
// }
// export function deleteCategory(id) {
//   return apiDelete(DELETECATEGORY + id);
// }


// // Milestone
// export function getMilestones(id, data) {
//   return apiGet(GETMILESTONES  + id, data);
// }
// export function getAMilestone(id, data = null) {
//   return apiGet(GETAMILESTONE + id, data);
// }
// export function updateAMilestone(id, data) {
//   return apiPut(UPDATEAMILESTONE + id, data);
// }
// export function deleteAMilestone(id) {
//   return apiDelete(DELETEAMILESTONE + id);
// }
// export function createMilestone(id, data) {
//   return apiPost(CREATEMILESTONE  + id + "/store", data);
// }

