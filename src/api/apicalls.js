import { PROFILE, SETDEFUALTBUSINESS } from "../utils/AuthConfig";
import { CUSTOMERS, TRANSACTION, DASHBOARD, DASHBOARDANALYTICS, GETDELETEDCOUNSELLOR, GETSUSPENDEDCOUNSELLOR, GETACTIVECOUNSELLOR } from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";




//dashboard 
export function getDashboardAnalytics(data) {
  return apiGet(DASHBOARDANALYTICS, data);
}

export function getDashboard(data) {
  return apiGet(DASHBOARD, data);
}
//transaction
export function getTransaction(data) {
  return apiGet(TRANSACTION, data);
}

//customers
export function getCustomers(data) {
  return apiGet(CUSTOMERS, data);
}

//counsellor
export function getDeletedCounsellor(data) {
  return apiGet(GETDELETEDCOUNSELLOR, data);
}
export function getSuspendedCounsellor(data) {
  return apiGet(GETSUSPENDEDCOUNSELLOR, data);
}
export function getActiveCounsellor(data) {
  return apiGet(GETACTIVECOUNSELLOR, data);
}





