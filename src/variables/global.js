// GLOBAL STRING
export const NO_STRING = "";
export const NO_DATA = "No Data";

// MENU
export const MENU_MOBILE = "MENU_MOBILE";

// NAVBAR MENU KEY
export const DASHBOARD = "DASHBOARD";
export const RENTAL_MARKET = "RENTAL_MARKET";
export const HOME = "HOME";

// NAVBAR MODALS
export const LOGOUT_MODAL = "LOGOUT_MODAL";
export const ERROR_MODAL = "ERROR_MODAL";

// CREDENTIAL PAGES
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";
export const OTP_PAGE = "OTP_PAGE";

// DASHBOARD PAGES
export const DASHBOARD_HOME = "DASHBOARD_HOME";
export const DASHBOARD_TRANSACTIONS = "DASHBOARD_TRANSACTIONS";
export const DASHBOARD_CHATS = "DASHBOARD_CHATS";
export const DASHBOARD_NOTES = "DASHBOARD_NOTES";
export const DASHBOARD_CATALOG = "DASHBOARD_CATALOG";

// RDP FAIL REASON //
export const LOGIN_REQUIRED = "LOGIN_REQUIRED";
export const ROOM_FULL = "ROOM_FULL";
export const ROOM_AVAILABLE = "ROOM_AVAILABLE";
export const ROOM_UNAVAILABLE = "ROOM_UNAVAILABLE";
export const USER_ALREADY_JOIN = "USER_ALREADY_JOIN";
export const RTC_PEER_CONNECTION_FAILED = "RTC_PEER_CONNECTION_FAILED";
export const RTC_PEER_UNTRUSTED_CONNECTION = "RTC_PEER_UNTRUSTED_CONNECTION";

//RTC CONNECTION STATE //
export const FAILED = "FAILED";

//AXIOS DEFAULTS //
export const AXIOS_DEFAULT_ERROR_CONTENT = "Something went wrong,\nPlease try again or contact our support.";

// XHR METHOD //
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

// SIGNALER SERVICE ROUTE
export const URL_ROOM_CHECK = '/v1/room/check';
export const URL_ROOM_CREATE = '/v1/room/create';

// OLYMPUS SERVICE ROUTE
export const URL_GET_GOOGLE_URL = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/google/url`;
export const URL_POST_REGISTER = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/signup`;
export const URL_POST_LOGIN = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/login`;
export const URL_POST_FORGOT_PW = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/pw/forgot`;
export const URL_POST_RECOVERY_TOKEN_CHECK = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/pw/check`;
export const URL_POST_GOOGLE_CALLBACK = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/google/callback`;
export const URL_POST_NEW_PW = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/pw/new`;
export const URL_POST_LOGOUT = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/logout`;
export const URL_POST_OTP = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/verify/otp`;
export const URL_CHECK_AUTH_AND_REFRESH_TOKEN = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/token`;

// ZEUS SERVICE ROUTE
export const URL_POST_ADD_STORE_CATALOGUE = (storeCode) => `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/store/catalogues/add?code=${storeCode}`;
export const URL_POST_ADD_USER_STORE = (userId) => `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/user/${userId}/stores/add`;
export const URL_GET_DASHBOARD_STORES = (userId) => `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/user/${userId}/stores`;
export const URL_GET_ADD_CATALOGUE_DATA = (storeCode) => `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/store/catalogues?code=${storeCode}`;
export const URL_GET_CATEGORIES = `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/category`;
export const URL_GET_COURIERS = `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/couriers`;

// USER RDP ROLE
export const HOST = "HOST";
export const PEER = "PEER";

// FORM NAME
export const ADD_CATALOGUE_FORM = "ADD_CATALOGUE_FORM";

// COOKIES NAME
export const CLIENT_USER_INFO = "CLIENT_USER_INFO";