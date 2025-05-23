import axios from "axios";

export async function getHeaders() {
  let authData = localStorage.getItem("authData");
  // console.log(authData.data.accessToken, "header");
  if (authData) {
    authData = JSON.parse(authData);
    const token = "Bearer " + authData.token;
    return {
      Authorization: token,
      Accept: "application/json",
      // "Content-Type": "application/json",
    };
  }
  return {};
}

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {}
) {
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();
    headers = {
      ...getTokenHeader,
    };

    if (method === "get" ) {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }
    if (method === "delete" ) {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then((result) => {
        const { data } = result;
        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error) => {
        console.log(error);
        console.log(headers);
        console.log(error && error.response, "the error respne");
        if (error && error.response && error.response.status === 401) {
          // clearauthData();

        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || "Network Error",
            });
          }
          return rej(error.response.data);
        } else {
          return rej({ message: "Network Error", msg: "Network Error" });
        }
        // return rej(error);
      });
  });
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiGetCSV(endPoint, data, headers = {}, requestOptions = { responseType: 'blob' }) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

export function setItem(key, data) {
  data = JSON.stringify(data);
  return localStorage.setItem(key, data);
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    localStorage.getItem(key).then((data) => {
      resolve(data);
    });
  });
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
  return localStorage.clear();
}

export function setUserData(data) {
  data = JSON.stringify(data);
  return localStorage.setItem("authData", data);
}

export function setUserTempData(data) {
  data = JSON.stringify(data);
  return localStorage.setItem("userTempData", data);
}

export async function getauthData() {
  return new Promise((resolve, reject) => {
    localStorage.getItem("authData").then((data) => {
      resolve(data);
    });
  });
}

export async function clearUserData() {
  return localStorage.removeItem("authData");
}
