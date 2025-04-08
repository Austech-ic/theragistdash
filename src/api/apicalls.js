import { PROFILE, SETDEFUALTBUSINESS } from "../utils/AuthConfig";
import {
  CUSTOMERS,
  TRANSACTION,
  DASHBOARD,
  DASHBOARDANALYTICS,
  GETDELETEDCOUNSELLOR,
  GETSUSPENDEDCOUNSELLOR,
  GETACTIVECOUNSELLOR,
  GETCOMPANIES,
  UPDATEDELETE,
  UPDATESUSPEND,
  GETTRACKING,
  GETCATEGORIES,
  GETUSERS,
  GETGROUPS,
  GETUSERASSESSMENT,
  GETAUSERASSESSMENTHISTORYRESPONSE,
  UPDATECATEGORY,
  POST,
  GETPOST,
  GETPOSTCOUNT,
  GETARTICLE,
  ARTICLE,
  GETARTICLECOUNT,
  CREATECOUNSELLOR,
  DELETEGROUP,
  GETACOMPANYUSER,
  COMPANYUSERADD,
  ACTIVATEUSER,
} from "../utils/config";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//dashboard
export function getDashboardAnalytics(data) {
  return apiGet(DASHBOARDANALYTICS, data);
}

export function getDashboard(data) {
  return apiGet(DASHBOARD, data);
}
//transaction
export function getTransaction(data) {
  return apiGet(TRANSACTION, data);
}

//customers
export function getCustomers(data) {
  return apiGet(CUSTOMERS, data);
}

//counsellor
export function getDeletedCounsellor(data) {
  return apiGet(GETDELETEDCOUNSELLOR, data);
}
export function getSuspendedCounsellor(data) {
  return apiGet(GETSUSPENDEDCOUNSELLOR, data);
}
export function getActiveCounsellor(data) {
  return apiGet(GETACTIVECOUNSELLOR, data);
}
export function createCounsellor(data) {
  return apiPost(CREATECOUNSELLOR, data,  { 'Content-Type': 'multipart/form-data' });
}

//company
export function getCompany(data) {
  return apiGet(GETCOMPANIES, data);
}

export function getCompanyUser(data) {
  return apiGet(GETACOMPANYUSER + data + "/users/");
}

export function createCompany(data) {
  return apiPost(GETCOMPANIES, data, { 'Content-Type': 'multipart/form-data' });
}
export function createCompanyUser(data) {
  return apiPost(COMPANYUSERADD, data);
}

export function deleteComapany(data) {
  return apiPut(UPDATEDELETE + data + "/company/");
}


export function suspendComapany(data) {
  return apiPut(UPDATESUSPEND + data + "/company/");
}



//booking track
export function getBookTrack(data) {
  return apiGet(GETTRACKING, data);
}



// users 
export function getUsers(data) {
  return apiGet(GETUSERS, data);
}

export function getUserPayment(data) {
  return apiGet(GETUSERS + data + "/payment-details/");
}

export function suspendUser(data) {
  return apiPut(UPDATESUSPEND + data + "/user/");
}
export function deleteUser(data) {
  return apiPut(UPDATEDELETE + data + "/user/");
}


//group
export function getGroups(data) {
  return apiGet(GETGROUPS, data);
}

export function getGroup(data) {
  return apiGet(GETGROUPS + data + "/");
}

export function deleteGroup(data) {
  return apiDelete(DELETEGROUP + data + "/");

}


//user assessment
export function getUserAssessment(data) {
  return apiGet(GETUSERASSESSMENT, data);
}
export function getUserAssessmentHistory(data) {
  return apiGet(GETUSERASSESSMENT + data + "/history/");
}

export function getUserAssessmentHistoryResponse(data) {
  return apiGet(GETAUSERASSESSMENTHISTORYRESPONSE + data + "/response/");
}


//category
export function getCategories(data) {
  return apiGet(GETCATEGORIES, data);
}



export function updateCategory(id,data) {
  return apiPut(UPDATECATEGORY + id + "/", data);
}

export function createCategory(data) {
  return apiPost(UPDATECATEGORY, data);
}

export function deleteCategory(data) {
  return apiDelete(UPDATECATEGORY + data + "/");
}


//post
export function createPost(data) {
  return apiPost(POST, data, { 'Content-Type': 'multipart/form-data' });
}

export function getPost(data) {
  return apiGet(GETPOST, data);
}
export function getPostCount(data) {
  return apiGet(GETPOSTCOUNT, data);
}

export function updatePost(id,data) {
  return apiPut(POST + id, data);
}

export function deletePost(id) {
  return apiDelete(POST + id);
}

//article

export function createArticle(data) {
  return apiPost(ARTICLE, data, { 'Content-Type': 'multipart/form-data' });
}
export function getArticle(data) {
  return apiGet(GETARTICLE, data);
}
export function getArticleCount(data) {
  return apiGet(GETARTICLECOUNT, data);
}

export function updateArticle(id,data) {
  return apiPut(ARTICLE + id, data);
}

export function deleteArticle(id,data) {
  return apiDelete(ARTICLE + id, data);
}


//activate user
export function activateUser(data) {
  return apiPut(ACTIVATEUSER + data + "/user/");
}
