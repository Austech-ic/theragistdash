

import { FORGOTPASSWORD, LOGIN, REQUESTOTP,VALIDATEOTP, RESETPASSWORD,CHANGEPASSWORD, SIGNUP, RESENDOTP } from "../utils/AuthConfig";
import { apiPost, clearUserData, setUserData } from "../utils/utils";


// export function login(data) {
//     return apiPost(LOGIN, data)

// }

export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            // if (res.data.emailVerified) {
            setUserData(res);
            return
            // }
            // resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function signIn(data) {
    return apiPost(LOGIN, data)
}
export function signUp(data) {
    return apiPost(SIGNUP, data)
}

export function forgotPassword(data) {
    return apiPost(FORGOTPASSWORD, data)
}
export function changePassword(data) {
    return apiPost(CHANGEPASSWORD, data)
}

export function resetPassword(data) {
    return apiPost(RESETPASSWORD, data)
}
export function requestOtp(data) {
    return apiPost(REQUESTOTP, data)
}
export function resendOtp(data) {
    return apiPost(RESENDOTP, data)
}


export function validateOtp(data) {
    return apiPost(VALIDATEOTP, data)
}
 



// export function signUp(data) {
//     // return apiPost(SIGNUP, data)
//     return new Promise((resolve, reject) => {
//         return apiPost(SIGNUP, data).then((res) => {
//             setUserTempData(res).then(() => {
//                 resolve(res)
//                 // saveUserData(res)
//             });
            
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }

export function logout() {

    clearUserData()
}



// export function forgotPassword(data) {
//     return apiPost(FORGOTPASSWORD, data)
// }
