import { PROFILE, SETDEFUALTBUSINESS } from "../utils/AuthConfig";
import { CUSTOMERS, TRANSACTION, GETOVERVIEW } from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//transaction
export function getTransaction(data) {
  return apiGet(TRANSACTION, data);
}

//customers
export function getCustomers(data) {
  return apiGet(CUSTOMERS, data);
}

