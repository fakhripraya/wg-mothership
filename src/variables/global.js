// GLOBAL STRING
export const NO_STRING = "";
export const NO_DATA = "No Data";
export const ADMIN_FEE = 1500;
export const GENERAL_MULTIUPLOAD_LABEL =
  "Geser file dan masukkan file ke box ini atau klik untuk pilih file";
export const GENERAL_MULTIUPLOAD_SUBLABEL = (extensions) =>
  `Mohon hanya upload extension ${extensions} saja`;

// GLOBAL VALIDATION
export const IS_INPUT_OTP_ELIGIBLE = (userInfo) => {
  return (
    userInfo && userInfo.credentialToken && userInfo.sid
  );
};

export const IS_OTP_VERIFIED = (login) => {
  return login && login.user && login.user.OTPVerified;
};

export const IS_NOT_AUTHENTICATE = (result) => {
  return (
    result.responseStatus === 401 ||
    result.responseStatus === 403
  );
};

// ARRAY
export const IMAGE_MIME_TYPE = [
  "image/apng",
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
];

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
export const DASHBOARD_TRANSACTIONS =
  "DASHBOARD_TRANSACTIONS";
export const DASHBOARD_CHATS = "DASHBOARD_CHATS";
export const DASHBOARD_NOTES = "DASHBOARD_NOTES";
export const DASHBOARD_CATALOG = "DASHBOARD_CATALOG";

// RDP FAIL REASON //
export const LOGIN_REQUIRED = "LOGIN_REQUIRED";
export const ROOM_FULL = "ROOM_FULL";
export const ROOM_AVAILABLE = "ROOM_AVAILABLE";
export const ROOM_UNAVAILABLE = "ROOM_UNAVAILABLE";
export const USER_ALREADY_JOIN = "USER_ALREADY_JOIN";
export const RTC_PEER_CONNECTION_FAILED =
  "RTC_PEER_CONNECTION_FAILED";
export const RTC_PEER_UNTRUSTED_CONNECTION =
  "RTC_PEER_UNTRUSTED_CONNECTION";

// RTC CONNECTION STATE //
export const FAILED = "FAILED";

// AXIOS DEFAULTS //
export const AXIOS_DEFAULT_ERROR_CONTENT =
  "Something went wrong,\nPlease try again or contact our support.";

// XHR METHOD //
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

// HEADER NAME
export const X_SID = "x-sid";
export const AUTHORIZATION = "authorization";
export const CONTENT_TYPE = "Content-Type";

// SIGNALER SERVICE ROUTE
export const URL_ROOM_CHECK = "/v1/room/check";
export const URL_ROOM_CREATE = "/v1/room/create";

// OLYMPUS SERVICE ROUTE
export const URL_GET_GOOGLE_URL = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/google/url`;
export const URL_POST_REGISTER = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/signup`;
export const URL_POST_LOGIN = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/login`;
export const URL_POST_FORGOT_PW = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/pw/forgot`;
export const URL_POST_GOOGLE_CALLBACK = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/google/callback`;
export const URL_POST_NEW_PW = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/pw/new`;
export const URL_POST_LOGOUT = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/logout`;
export const URL_POST_OTP = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/verify/otp`;
export const URL_CHECK_AUTH_AND_REFRESH_TOKEN = `/v${process.env.REACT_APP_OLYMPUS_SERVICE_VERSION}/auth/token`;

// ZEUS SERVICE ROUTE
export const URL_POST_ADD_STORE_PRODUCT_CATALOGUE = (
  storeId
) =>
  `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/store/product/add?storeId=${storeId}`;
export const URL_POST_ADD_USER_STORE = (userId) =>
  `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/user/${userId}/stores/add`;
export const URL_GET_DASHBOARD_STORES = (userId) =>
  `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/user/${userId}/stores`;
export const URL_GET_PRODUCT_DETAILS = (productId) =>
  `/v${
    process.env.REACT_APP_ZEUS_SERVICE_VERSION
  }/store/catalogues/product-details${
    productId ? `?productId=${productId}` : ""
  }`;
export const URL_GET_CATALOGUE_DATA = ({
  storeId,
  isWithProducts,
  isProductOnly,
  offset,
  limit,
  itemPage,
  itemPerPage,
}) =>
  `/v${
    process.env.REACT_APP_ZEUS_SERVICE_VERSION
  }/store/catalogues${
    storeId ? `?storeId=${storeId}` : ""
  }${
    isWithProducts
      ? `&isWithProducts=${isWithProducts}`
      : ""
  }${
    isProductOnly ? `&isProductOnly=${isProductOnly}` : ""
  }${offset ? `&offset=${offset}` : ""}${
    limit ? `&limit=${limit}` : ""
  }${itemPage ? `&itemPage=${itemPage}` : ""}${
    itemPerPage ? `&itemPerPage=${itemPerPage}` : ""
  }`;

export const URL_GET_SERVER_INFO = (query) =>
  `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/stores${query}`;
export const URL_POST_GET_USER_BUY_ADDRESSES = (userId) =>
  `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/user/${userId}/saved-address`;

export const URL_GET_PRODUCT_LIST_BY_IDS = `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/products`;
export const URL_GET_CATEGORIES = `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/category`;
export const URL_GET_COURIERS = `/v${process.env.REACT_APP_ZEUS_SERVICE_VERSION}/couriers`;

// USER RDP ROLE
export const HOST = "HOST";
export const PEER = "PEER";

// FORM NAME
export const ADD_CATALOGUE_FORM = "ADD_CATALOGUE_FORM";
export const ADD_STORE_FORM = "ADD_STORE_FORM";
export const SETTING_STORE_FORM = "SETTING_STORE_FORM";

// COOKIES NAME
export const CLIENT_USER_INFO = "CLIENT_USER_INFO";

// UPLOAD FILE EXTENSION MIME TYPE
export const JPEG = "image/jpeg";
export const PNG = "image/png";
export const JPEG_PNG = "image/jpeg, image/png";
export const PDF = "application/pdf";

// FILE TYPES
export const PRODUCT_CATALOGUE_IMAGE =
  "PRODUCT_CATALOGUE_IMAGE";
export const PRODUCT_CATALOGUE_ADDITIONAL_FILES =
  "PRODUCT_CATALOGUE_ADDITIONAL_FILES";

// REDUX ACTIONS
export const KEY_CART = "KEY_CART";
