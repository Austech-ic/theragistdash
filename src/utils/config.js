//production server
// export const API_BASE_URL = 'https://dev.vantapp.com/api/partner-business';

//live server
export const API_BASE_URL = 'https://api.vantapp.com/api/partner-business';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const TRANSACTION = getApiUrl('/transactions')
export const WALLETS = getApiUrl('/user-wallets')
export const CUSTOMERS = getApiUrl('/customers')
export const UPDATECUSTOMERS = getApiUrl('/customers/')
export const INITIATETRANSFER = getApiUrl('/transfer/initiate')
export const INITIATEVANTTAGTRANSFER = getApiUrl('/transfer/initiate-vant')
export const BANKS = getApiUrl('/transfer/banks')
export const VERIFYACCOUNTNUMBER = getApiUrl('/transfer/verify-account')
export const SETPIN = getApiUrl('/business/set-pin')
export const RESETPIN = getApiUrl('/business/reset-pin')
export const SENDOTP = getApiUrl('/business/send-otp')
export const UPDATEKYC = getApiUrl('/kyc/personal-info')
export const BUSINFO = getApiUrl('/kyb/business-info')
export const BVN = getApiUrl('/kyb/bvn')
export const DOCUMENT = getApiUrl('/kyb/upload-documents')
export const GETBUSINESSPROFILE = getApiUrl('/business/profile')
export const TRANSACTIONSUMMARY = getApiUrl('/transaction/summary')
export const TRANSACTIONFULLLENGTH = getApiUrl('/transactions/all')
export const ADDTEAMMEMBER = getApiUrl('/business/add-member')
export const GETTEAMMEMBER = getApiUrl('/business/members')
export const GETTRANSACTIONBARCHART = getApiUrl('/business/transaction-chart')
export const GETOVERVIEW = getApiUrl('/business/summary')
export const UPDATEROLE = getApiUrl('/business/members/')
export const CHECKUSERNAME = 'https://api.vantapp.com/api/verify-username'


