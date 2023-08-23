import { USER_UNAUTHORIZED } from "../../variables/errorMessages/global";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  URL_CHECK_AUTH_AND_REFRESH_TOKEN,
  X_SID,
} from "../../variables/global";

export async function checkAuthAndRefresh(
  services,
  cookies
) {
  const login = cookies.get(CLIENT_USER_INFO, {
    path: "/",
  });

  if (!login)
    return {
      message: USER_UNAUTHORIZED,
      responseStatus: 401,
    };

  const result = await services
    .postData({
      headers: {
        [X_SID]: `${login.sid}`,
        [AUTHORIZATION]: `Bearer ${login.credentialToken.accessToken}`,
      },
      endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
      url: URL_CHECK_AUTH_AND_REFRESH_TOKEN,
      data: {
        credentialToken: login.credentialToken,
      },
    })
    .then((res) => {
      cookies.set(CLIENT_USER_INFO, res.responseData, {
        path: "/",
      });
      return { message: "Success", responseStatus: 200 };
    })
    .catch((error) => {
      return {
        message: error.errorContent,
        responseStatus: error.responseStatus,
      };
    });
  return result;
}
