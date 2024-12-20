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
export const DISABLE_USER_ENDPOINT = `${BASE_URL}/change-user-status`;
export const GET_USER_BY_ID_ENDPOINT = `${BASE_URL}/get-user-by-id`;
export const GET_USER_POINT_BY_ID_ENDPOINT = `${BASE_URL}/get-user-points`;

//stylist
export const GET_STYLIST_ENDPOINT = `${BASE_URL}/get-all-stylist`;
export const GET_STYLIST_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-stylist-by-id`;
export const PAID_SALARY_ENDPOINT = `${BASE_URL}/update-paid-on-salaries`;
export const CREATE_SALARY_FOR_STYLIST_ENDPOINT = `${BASE_URL}/calculate-salary`;
export const COMPLETE_BOOKING_BY_STYLIST_ENDPOINT = `${BASE_URL}/complete-service`;
export const VIEW_SALARY_BY_STYLIST_ENDPOINT = `${BASE_URL}/get-salaries-by-stylistId`;
//service

export const GET_SERVICE_ENDPOINT = `${BASE_URL}/get-all-services`;
export const GET_SERVICE_BY_ID_ENDPOINT = `${BASE_URL}/get-detail-service-by-id`;
export const CREATE_SERVICE_ENDPOINT = `${BASE_URL}/create-service`;
export const EDIT_SERVICE_ENDPOINT = `${BASE_URL}/update-service`;
export const DELETE_SERVICE_ENDPOINT = `${BASE_URL}/delete-service`;



//booking
export const GET_BOOKING_ENDPOINT = `${BASE_URL}/get-all-booking`;
export const CUSTOMER_BOOKING_ENDPOINT = `${BASE_URL}/customer-book-appointment`;
export const VERIFY_BOOKING_ENDPOINT = `${BASE_URL}/payment-and-verify-book-appointment`;
export const GET_BOOKING_FOR_STYLIST_ENDPOINT = `${BASE_URL}/get-list-customer-booking-for-stylist`;
// get booking of customer
export const GET_BOOKING_CUSTOMER_ENDPOINT = `${BASE_URL}/get-booking-by-id`;
export const CANCEL_BOOKING_BY_CUSTOMER_ENDPOINT = `${BASE_URL}/cancel-booking-for-customer`;

//staff
export const CREATE_SCHEDULE_ENDPOINT = `${BASE_URL}/create-schedule`;
export const GET_ALL_CODE_ENDPOINT = `${BASE_URL}/get-allcode`;
export const GET_ALL_TIME_BOOKING_ENDPOINT = `${BASE_URL}/get-schedule-stylist-by-date`;
export const CANCEL_BOOKING_BY_STAFF_ENDPOINT = `${BASE_URL}/cancel-booking-for-staff`;

//dashboard
export const TOTAL_USERS_ENDPOINT = `${BASE_URL}/total-users`;
export const TOTAL_REVENUE_ENDPOINT = `${BASE_URL}/revenue`;
export const TOTAL_BOOKINGS_ENDPOINT = `${BASE_URL}/total-bookings`;
export const TOTAL_FEEDBACK_ENDPOINT = `${BASE_URL}/total-feedback`;

//feedback
export const GET_FEEDBACK_SERVICE_ENDPOINT = `${BASE_URL}/get-feedback-by-serviceId`;
export const CREATE_FEEDBACK_ENDPOINT = `${BASE_URL}/create-feedback`;