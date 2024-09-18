//production server
// export const API_BASE_URL = 'http://94.229.79.27:55412/api/v1';

//live server
export const API_BASE_URL = 'https://erp-dev.duckdns.org/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint


//=======>>>> USER SECTION
export const GETUSERS = getApiUrl('/users');
export const CREATEUSERS = getApiUrl('/users');
export const GETAUSER = getApiUrl('/users/');
export const UPDATEAUSER = getApiUrl('/users/');
export const DELETEAUSER = getApiUrl('/users/');


//=======>>>> PERMISSION SECTION
export const GETPERMISSIONS = getApiUrl('/permissions');
export const CREATEPERMISSIONS = getApiUrl('/permissions');
export const GETAPERMISSIONS = getApiUrl('/permissions/');
export const UPDATEAPERMISSIONS = getApiUrl('/permissions/');
export const DELETEAPERMISSIONS= getApiUrl('/permissions/');


//=======>>>> PROJECT SECTION
export const GETPROJECT = getApiUrl('/taskly/projects');
export const CREATEPROJECT = getApiUrl('/taskly/projects/');
export const GETAPROJECT = getApiUrl('/taskly/projects/');
export const UPDATEAPROJECT = getApiUrl('/taskly/projects/');
export const DELETEAPROJECT= getApiUrl('/taskly/projects/');


//=======>>>> TASK SECTION
export const GETTASK = getApiUrl('/taskly/projects');
export const CREATETASK = getApiUrl('/taskly/projects/'); 
export const GETATASK = getApiUrl('/taskly/projects/');
export const UPDATETASK = getApiUrl('/taskly/projects/');
export const DELETETASK= getApiUrl('/taskly/projects/');

//======>>>>ROLE SECTION
export const GETROLE = getApiUrl('/roles');
export const CREATEROLE = getApiUrl('/roles'); 
export const GETAROLE = getApiUrl('/roles');
export const UPDATEROLE = getApiUrl('/roles');
export const DELETEROLE= getApiUrl('/roles');


//=======>>>> USER SECTION
// export const GETUSER = getApiUrl('/users');
// export const CREATEUSER = getApiUrl('/users'); 
// export const GETAUSER = getApiUrl('/users/');
// export const UPDATEUSER = getApiUrl('/users/');
// export const DELETEUSER= getApiUrl('/users/');




//=========================>>>> INVENTORY SECTION

//=======>>>>  CATEGORY
export const GETCATEGORY = getApiUrl('/inventory/category');
export const CREATECATEGORY = getApiUrl('/inventory/category'); 
export const GETACATEGORY = getApiUrl('/inventory/category/');
export const UPDATECATEGORY = getApiUrl('/inventory/category/');
export const DELETECATEGORY= getApiUrl('/inventory/category/');

