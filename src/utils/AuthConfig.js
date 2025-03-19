//dev server
// export const API_BASE_URL = 'https://dev.vantapp.com/api/partner-business/auth';


//dev staging
export const API_BASE_URL = 'https://vant.ddnsgeek.com/api/partner-business/auth';
//live server
//export const API_BASE_URL = 'https://api.vantapp.com/api/partner-business/auth';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('/login')
export const SIGNUP = getApiUrl('/signup')
export const FORGOTPASSWORD = getApiUrl('/password/forget')
export const RESETPASSWORD = getApiUrl('/password/reset')
export const REQUESTOTP = getApiUrl('/sendverification')
export const VALIDATEOTP = getApiUrl('/verify-email')
export const RESENDOTP = getApiUrl('/resend-otp')
export const CHANGEPASSWORD = getApiUrl('/changepassword')
export const PROFILE = getApiUrl('/profile')
export const SETDEFUALTBUSINESS = getApiUrl('/set-default-partner')
