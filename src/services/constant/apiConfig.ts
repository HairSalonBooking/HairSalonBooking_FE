export const BASE_URL = 'https://oyster-app-pc2gd.ondigitalocean.app/api';

//autth
export const LOGIN_ENDPOINT = `${BASE_URL}/login`;
export const REGISTER_ENDPOINT = `${BASE_URL}/register`;
export const FORGOT_PASSWORD_ENDPOINT = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD_ENDPOINT = `${BASE_URL}/reset-password/:token`;
export const REFRESH_TOKEN_ENDPOINT = `${BASE_URL}/login`;

//user
export const GET_USER_ENDPOINT = `${BASE_URL}/get-all-user`;
export const EDIT_USER_ENDPOINT = `${BASE_URL}/edit-user`;
export const DELETE_USER_ENDPOINT = `${BASE_URL}/delete-user`;
export const GET_USER_BY_ID_ENDPOINT = `${BASE_URL}/get-user-by-id`;


//stylist
export const GET_STYLIST_ENDPOINT = `${BASE_URL}/get-all-stylist`;
export const GET_STYLIST_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-stylist-by-id`;


//service

export const GET_SERVICE_ENDPOINT = `${BASE_URL}/get-all-services`;
export const GET_SERVICE_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-service-by-id`;