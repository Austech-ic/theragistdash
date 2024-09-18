export const API_BASE_URL = 'https://erp-dev.duckdns.org/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint


//=======>>>> MILESTONE
export const GETMILESTONES = getApiUrl('/taskly/projects/milestone/');
export const CREATEMILESTONE = getApiUrl('/taskly/projects/milestone/');
export const GETAMILESTONE = getApiUrl('/taskly/projects/milestone/');
export const UPDATEAMILESTONE = getApiUrl('/taskly/projects/milestone/');
export const DELETEAMILESTONE= getApiUrl('/taskly/projects/milestone/');