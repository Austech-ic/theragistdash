//production server
// export const API_BASE_URL = 'https://dev.vantapp.com/api/partner-business';

//live server
export const API_BASE_URL = 'https://api.vantapp.com/api/partner-business';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('/login')
export const SIGNUP = getApiUrl('/signup')
export const FORGOTPASSWORD = getApiUrl('/recoverpass')
export const RESETPASSWORD = getApiUrl('/resetpassword')
export const REQUESTOTP = getApiUrl('/sendverification')
export const VALIDATEOTP = getApiUrl('/verify-email')
export const RESENDOTP = getApiUrl('/resend-otp')
export const CHANGEPASSWORD = getApiUrl('/changepassword')
export const PROFILE = getApiUrl('/profile')
export const SETDEFUALTBUSINESS = getApiUrl('/set-default-partner')
