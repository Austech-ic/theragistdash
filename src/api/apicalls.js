import {

  DASHBOARD,
  DASHBOARDANALYTICS,
 
} from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//dashboard
export function getDashboardAnalytics(data) {
  return apiGet(DASHBOARDANALYTICS, data);
}

export function getDashboard(data) {
  return apiGet(DASHBOARD, data);
}
