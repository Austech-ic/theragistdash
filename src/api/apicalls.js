import {

  CREATEPRODUCT,
  CREATEUSER,
  DASHBOARD,
  DASHBOARDANALYTICS,
  PRODUCT,
  UPDATEPRODUCT,
  UPDATEUSER,
 
} from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//dashboard
export function getDashboardAnalytics(data) {
  return apiGet(DASHBOARDANALYTICS, data);
}

export function getDashboard(data) {
  return apiGet(DASHBOARD, data);
}

export function getProducts(data) {
  return apiGet(PRODUCT, data);
}
export function createProducts(data) {
  return apiPost(CREATEPRODUCT, data);
}

export function deleteProducts(data) {
  return apiDelete(UPDATEPRODUCT+ data);
}

export function updateProducts(id, data) {
  return apiPut(UPDATEPRODUCT+id, data);
}


export function createUser( data) {
  return apiPost(CREATEUSER, data);
}

export function getUser( data) {
  return apiGet(CREATEUSER, data);
} 

export function deleteUser( data) {
  return apiDelete(UPDATEUSER + data);
}

export function updateUser(id, data) {
  return apiPut(UPDATEUSER +id, data);
}