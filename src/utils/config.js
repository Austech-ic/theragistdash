//dev server
//dev staging
export const API_BASE_URL = 'https://octopus-app-spiq3.ondigitalocean.app/dashboard/api/v1';

//live server


export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;


export const DASHBOARD = getApiUrl("/dashboard/");
export const DASHBOARDANALYTICS = getApiUrl("/dashboard/analytics/");

