import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";
import {
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
} from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { trackPromise } from "react-promise-tracker";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash-es";

export default function TransactionPayment() {
  // HOOKS
  const credentialService = useAxios();
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );
  const [localDatas, setLocalDatas] = useState(null);

  // VARIABLES
  const reduxDatas = useSelector((state) => state.cart);

  // FUNCTION SPECIFIC
  async function handleInitialize() {
    const result = await checkAuthAndRefresh(
      credentialService,
      cookies
    );
    if (IS_NOT_AUTHENTICATE(result)) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
      setLogin(null);
    } else {
      // and then map the cart items by the user id
      var useableData = cloneDeep(reduxDatas);
      const temp = useableData.filter((val) => {
        if (val.userId === login.user.userId) return val;
      });
      setLocalDatas(temp);
    }
  }

  useEffect(() => {
    smoothScrollTop();
    // transaction cart initialization
    // here we will check the user authentication first
    if (IS_OTP_VERIFIED(login))
      trackPromise(handleInitialize());
  }, []);

  return useMemo(
    () => (
      <ShowConditionalMemoized
        login={login}
        reduxDatas={reduxDatas}
        datas={localDatas}
        setDatas={setLocalDatas}
      />
    ),
    [localDatas, login]
  );
}
