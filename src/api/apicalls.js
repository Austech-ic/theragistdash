import {
  DELETEROLE,
  UPDATEROLE,
  GETROLE,
  GETAPERMISSIONS,
  UPDATEAPERMISSIONS,
  CREATEPERMISSIONS,
  DELETEAPERMISSIONS,
  GETPERMISSIONS,
  CREATEUSERS,
  GETUSERS,
  GETAUSER,
  UPDATEAUSER,
  DELETEAUSER,
  GETPROJECT,
  UPDATEAPROJECT,
  CREATEPROJECT,
  GETAPROJECT,
  DELETEAPROJECT,
  GETTASK,
  UPDATETASK,
  CREATETASK,
  GETATASK,
  DELETEATASK,
  CREATEROLE,
  GETCATEGORY,
  CREATECATEGORY,
  UPDATECATEGORY,
  DELETECATEGORY,
  GETACATEGORY,
} from "../utils/config";
import { CREATEMILESTONE, DELETEAMILESTONE, GETAMILESTONE, GETMILESTONES, UPDATEAMILESTONE } from "../utils/projectConfig";
import { apiDelete, apiGet, apiGetCSV, apiPost, apiPut } from "../utils/utils";

//dashboard
export function getRoles(data = null) {
  return apiGet(GETROLE, data);
}
export function getARoles(id, data = null) {
  return apiGet(GETROLE + id, data);
}
export function createRoles(data) {
  return apiPost(CREATEROLE, data);
}
export function updateRoles(id, data) {
  return apiPut(UPDATEROLE + id, data);
}
export function deleteRoles(id, data) {
  return apiDelete(DELETEROLE + id, data);
}

//user
export function getUsers(data = null) {
  return apiGet(GETUSERS, data);
}
export function getUser(id, data = null) {
  return apiGet(GETUSERS + id, data);
}
export function createUser(data) {
  return apiPost(CREATEUSERS, data);
}
export function updateUser(id, data) {
  return apiPut(UPDATEAUSER + id, data);
}
export function deleteUser(id, data) {
  return apiDelete(DELETEAUSER + id, data);
}

//permission
export function getPermissions(data = null) {
  return apiGet(GETPERMISSIONS, data);
}
export function getAPermissions(id, data = null) {
  return apiGet(GETPERMISSIONS + id, data);
}
export function createPermission(data) {
  return apiPost(CREATEPERMISSIONS, data);
}
export function updatePermission(id, data) {
  return apiPut(GETPERMISSIONS + id, data);
}
export function deletePermission(id, data) {
  return apiDelete(GETPERMISSIONS + id, data);
}

//project
export function getProjects(data = null) {
  return apiGet(GETPROJECT, data);
}
export function getAProject(id, data = null) {
  return apiGet(GETPROJECT + id, data);
}
export function createProject(data) {
  return apiPost(CREATEPROJECT, data);
}
export function updateProject(id, data) {
  return apiPut(UPDATEAPROJECT + id, data);
}
export function deleteProject(id) {
  return apiDelete(DELETEAPROJECT + id);
}

//task


// ========>>>> Inventory

// category
export function getCategory(data = null) {
  return apiGet(GETCATEGORY, data);
}
export function getACategory(id, data = null) {
  return apiGet(GETACATEGORY + id, data);
}
export function createCategory(data) {
  return apiPost(CREATECATEGORY, data);
}
export function updateCategory(id, data) {
  return apiPut(UPDATECATEGORY + id, data);
}
export function deleteCategory(id) {
  return apiDelete(DELETECATEGORY + id);
}


// Milestone
export function getMilestones(id, data) {
  return apiGet(GETMILESTONES  + id, data);
}
export function getAMilestone(id, data = null) {
  return apiGet(GETAMILESTONE + id, data);
}
export function updateAMilestone(id, data) {
  return apiPut(UPDATEAMILESTONE + id, data);
}
export function deleteAMilestone(id) {
  return apiDelete(DELETEAMILESTONE + id);
}
export function createMilestone(id, data) {
  return apiPost(CREATEMILESTONE  + id + "/store", data);
}

