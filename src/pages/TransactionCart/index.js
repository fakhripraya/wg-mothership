import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";
import {
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  KEY_CART,
} from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { trackPromise } from "react-promise-tracker";

export default function TransactionCart() {
  // HOOKS
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );

  // VARIABLES
  let datas = JSON.parse(localStorage.getItem(KEY_CART));
  const credentialService = useAxios();

  async function handleInitialize() {
    const result = await checkAuthAndRefresh(
      credentialService,
      cookies
    );
    if (IS_NOT_AUTHENTICATE(result)) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });

      const newAuth = cookies.get(CLIENT_USER_INFO, {
        path: "/",
      });
      setLogin(newAuth);
    }
  }

  useEffect(() => {
    smoothScrollTop();
    // home page initialization
    // here we will check the user authentication first
    if (IS_OTP_VERIFIED(login))
      trackPromise(handleInitialize());
  }, []);

  return useMemo(
    () => (
      <ShowConditionalMemoized
        datas={datas}
        login={login}
      />
    ),
    [localStorage.getItem(KEY_CART), login]
  );
}
