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
export const GET_USER_POINT_BY_ID_ENDPOINT = `${BASE_URL}/get-user-points`;

//stylist
export const GET_STYLIST_ENDPOINT = `${BASE_URL}/get-all-stylist`;
export const GET_STYLIST_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-stylist-by-id`;


//service

export const GET_SERVICE_ENDPOINT = `${BASE_URL}/get-all-services`;
export const GET_SERVICE_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-service-by-id`;
export const CREATE_SERVICE_ENDPOINT = `${BASE_URL}/create-service`;
export const EDIT_SERVICE_ENDPOINT = `${BASE_URL}/update-service`;
export const DELETE_SERVICE_ENDPOINT = `${BASE_URL}/delete-service`;

//allCode

export const GET_ALL_CODE_ENDPOINT = `${BASE_URL}/get-allcode`;
export const GET_ALL_TIME_BOOKING_ENDPOINT = `${BASE_URL}/get-schedule-stylist-by-date`;

//booking
export const GET_BOOKING_ENDPOINT = `${BASE_URL}/get-all-booking`;
export const CUSTOMER_BOOKING_ENDPOINT = `${BASE_URL}/customer-book-appointment`;
export const VERIFY_BOOKING_ENDPOINT = `${BASE_URL}/payment-and-verify-book-appointment`;