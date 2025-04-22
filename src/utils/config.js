//dev server
//dev staging
export const API_BASE_URL = 'https://dagi-production-2ae3.up.railway.app/api';
export const IMAGE_BASE_URL = 'https://dagi-production-2ae3.up.railway.app';

//live server


export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;


export const DASHBOARD = getApiUrl("/dashboard");
export const DASHBOARDANALYTICS = getApiUrl("/dashboard/analytics");
export const PRODUCT = getApiUrl("/products");
export const CREATEPRODUCT = getApiUrl("/products/create-product");
export const UPDATEPRODUCT = getApiUrl("/products/");
export const CREATEUSER = getApiUrl("/users");
export const UPDATEUSER = getApiUrl("/users/");

