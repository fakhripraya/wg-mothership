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
  URL_GET_PRODUCT_LIST,
} from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash-es";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import Modal from "../../components/Modal";
import { handleCartArray } from "../../utils/functions/cart";

export default function TransactionCart() {
  // HOOKS
  const zeusService = useAxios();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES
  const reduxDatas = useSelector((state) => state.cart);

  // FUNCTION SPECIFIC
  async function handleInitialize() {
    // clone and filter user own cart datas
    let temp = cloneDeep(reduxDatas);
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
      .getData(
        {
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true`,
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
          handleCartArray(res.responseData, temp, dispatch);
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
      })
      .finally(() => setIsLoadingPage(false));
  }

  function handleOpenModalError() {
    handleOpenModal(setErrorModalToggle, errorModalToggle);
  }

  useEffect(() => {
    smoothScrollTop();
    // transaction cart initialization
    // here we will check the user authentication first
    if (IS_OTP_VERIFIED(login)) handleInitialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            isLoadingPage={isLoadingPage}
            reduxDatas={reduxDatas}
          />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reduxDatas, login, isLoadingPage]
      )}
    </Fragment>
  );
}
