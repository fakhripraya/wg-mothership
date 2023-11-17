import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./style.scss";
import {
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  smoothScrollTop,
} from "../../utils/functions/global";
import {
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  URL_GET_PRODUCT_LIST_BY_IDS,
} from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash-es";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import Modal from "../../components/Modal";
import { handleCartArray } from "../../utils/functions/cart";

export default function TransactionPayment() {
  // HOOKS
  const zeusService = useAxios();
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );
  const [localDatas, setLocalDatas] = useState(null);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES
  const reduxDatas = useSelector((state) => state.cart);

  // FUNCTION SPECIFIC
  async function handleInitialize() {
    // clone and filter user own cart datas
    let useableData = cloneDeep(reduxDatas);
    let temp = useableData.filter((val) => {
      if (val.userId === login.user.userId) return val;
    });

    let tempArray = [];
    for (var element of temp) {
      let newObj = {
        id: element["productId"],
      };
      tempArray.push(newObj);
    }

    const requestParams = {
      productIds: tempArray,
    };

    // fetch product with product ids in the cart to check the updated infos
    await zeusService
      .getDataWithOnRequestInterceptors(
        {
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: `${URL_GET_PRODUCT_LIST_BY_IDS}?isWithFiles=true`,
          params: requestParams,
        },
        async () => {
          const result = await checkAuthAndRefresh(
            zeusService,
            cookies
          );
          return result;
        }
      )
      .then((res) => {
        if (res.responseStatus === 200)
          handleCartArray(
            res.responseData,
            temp,
            setLocalDatas
          );
      })
      .catch((error) => {
        if (error.responseStatus === 500) handleError500();
        if (IS_NOT_AUTHENTICATE(error)) {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          setLogin(null);
        } else
          return handleErrorMessage(
            error,
            setErrorMessage,
            setErrorModalToggle,
            errorModalToggle
          );
      });
  }

  function handleOpenModalError() {
    handleOpenModal(setErrorModalToggle, errorModalToggle);
  }

  useEffect(() => {
    smoothScrollTop();
    // transaction cart initialization
    // here we will check the user authentication first
    if (IS_OTP_VERIFIED(login)) handleInitialize();
  }, []);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalError}
        toggle={errorModalToggle}>
        <ShowErrorModal
          errorMessage={errorMessage}
          handleOpenModalError={handleOpenModalError}
        />
      </Modal>
      {useMemo(
        () => (
          <ShowConditionalMemoized
            login={login}
            reduxDatas={reduxDatas}
            datas={localDatas}
            setDatas={setLocalDatas}
          />
        ),
        [localDatas, login]
      )}
    </Fragment>
  );
}
