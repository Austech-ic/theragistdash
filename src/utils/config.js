//dev server
//dev staging
export const API_BASE_URL = 'https://octopus-app-spiq3.ondigitalocean.app/dashboard/api/v1';

//live server


export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;


export const DASHBOARD = getApiUrl("/dashboard/");
export const DASHBOARDANALYTICS = getApiUrl("/dashboard/analytics/");


// group
export const GETGROUPS = getApiUrl("/group/management/");
export const GETAGROUP = getApiUrl("/group/management/"); //id
export const DELETEGROUP = getApiUrl("/group/management/"); //id


//podcast 
export const GETPODCASTS = getApiUrl("/podcast/management");
export const GETAPODCAST = getApiUrl("/podcast/management/"); //id
export const UPLOADPODCAST = getApiUrl("/podcast/management/"); //id


//album
export const GETALBUMS = getApiUrl("/albums/");
export const GETABLUM = getApiUrl("/album/"); //id
export const UPLOADALBUM = getApiUrl("/album/"); //id

// booking tracking
export const GETTRACKING = getApiUrl("/booking/tracking/");
export const GETATrackING = getApiUrl("/booking-tracking/"); //id

//category
export const GETCATEGORIES = "https://octopus-app-spiq3.ondigitalocean.app/client/api/v1/counselling/category/"
export const GETACATEGORY = getApiUrl("/category/"); //id
export const UPDATECATEGORY = getApiUrl("/category/"); //id

//company
export const GETCOMPANIES = getApiUrl("/company_management/");
export const GETACOMPANYUSER = getApiUrl("/company/"); //id
export const UPDATECOMPANY = getApiUrl("/company/"); //id
export const COMPANYUSERADD = getApiUrl("/company/user/add/"); 

//counsellor
export const GETDELETEDCOUNSELLOR = getApiUrl("/counsellor_management/deleted");
export const GETSUSPENDEDCOUNSELLOR = getApiUrl("/counsellor_management/suspended");
export const GETACTIVECOUNSELLOR = getApiUrl("/counsellor_management/active/");
export const CREATECOUNSELLOR = getApiUrl("/counsellor_management/");


//
export const TRANSACTION = getApiUrl("/dashboard/");
export const CUSTOMERS = getApiUrl("/dashboard/");


//
export const UPDATEDELETE = getApiUrl("/delete/");//id
export const UPDATESUSPEND = getApiUrl("/suspend/");//id



//user
export const GETUSERS = getApiUrl("/user/management/");

//user assessment
export const GETUSERASSESSMENT = getApiUrl("/user/assessment/");
export const GETAUSERASSESSMENTHISTORYRESPONSE = getApiUrl("/user/assessment/history/"); //id

//post
export const POST = "https://octopus-app-spiq3.ondigitalocean.app/client/api/v1/social/post/"
export const GETPOST = getApiUrl("/feed/management/posts/");
export const GETPOSTCOUNT = getApiUrl("/feed/management/posts/counts/");


//article
export const ARTICLE = "https://octopus-app-spiq3.ondigitalocean.app/client/api/v1/social/article/"
export const GETARTICLE = getApiUrl("/feed/management/articles/");
export const GETARTICLECOUNT = getApiUrl("/feed/management/article/count/");

//
export const ACTIVATEUSER = getApiUrl("/activate/");
export const PROFILE = "https://octopus-app-spiq3.ondigitalocean.app/auth/api/v1/client/user/profile/"
export const NOTIFICATION = "https://octopus-app-spiq3.ondigitalocean.app/client/api/v1/notifications/"



