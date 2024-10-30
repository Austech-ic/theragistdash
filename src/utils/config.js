//production server
// export const API_BASE_URL = 'http://94.229.79.27:55412/api/v1/accesss';

//live server
export const API_BASE_URL = 'https://dev.vantapp.com/api/partner-business';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const TRANSACTION = getApiUrl('/transactions')
export const WALLETS = getApiUrl('/user-wallets')
export const CUSTOMERS = getApiUrl('/customers')

