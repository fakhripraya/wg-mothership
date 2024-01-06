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
  AUTHORIZATION,
  CLIENT_USER_INFO,
  CONTENT_TYPE,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
  LOGIN,
  URL_GET_PRODUCT_LIST,
  URL_POST_GET_USER_BUY_ADDRESSES,
  X_SID,
} from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash-es";
import {
  ShowAddressModal,
  ShowErrorModal,
  ShowPaymentModal,
} from "./ModularComponents/ShowModals";
import Modal from "../../components/Modal";
import { handleCartArray } from "../../utils/functions/cart";
import { trackPromise } from "react-promise-tracker";
import { BUYING_ADDRESS_INITIAL_VALUES } from "../../variables/initial/transactionPayment";
import { useNavigate } from "react-router-dom";
import { authInterceptor } from "../../utils/functions/credentials";

export default function TransactionPayment() {
  // HOOKS
  const axiosService = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [buyingAddresses, setBuyingAddresses] =
    useState(null);
  const [postUserBuyingAddress, setPostUserBuyingAddress] =
    useState(BUYING_ADDRESS_INITIAL_VALUES);
  const [addressModalToggle, setAddressModalToggle] =
    useState(false);
  const [paymentModalToggle, setPaymentModalToggle] =
    useState(false);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES
  const reduxDatas = useSelector((state) => state.cart);
  const defaultConfigs = {
    headers: {
      [AUTHORIZATION]: `Bearer ${
        cookies.get(CLIENT_USER_INFO, {
          path: "/",
        })?.credentialToken?.accessToken
      }`,
      [X_SID]: cookies.get(CLIENT_USER_INFO, {
        path: "/",
      })?.sid,
    },
    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
  };
  const requests = [
    {
      config: {
        ...defaultConfigs,
        url: URL_POST_GET_USER_BUY_ADDRESSES(
          login?.user.userId
        ),
      },
      callbackInterceptors: async () =>
        await authInterceptor(axiosService, cookies),
    },
  ];

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
    await axiosService
      .getAllDataWithOnRequestInterceptors([
        {
          config: {
            endpoint: defaultConfigs.endpoint,
            url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true`,
            params: requestParams,
          },
          callbackInterceptors: async () =>
            await authInterceptor(axiosService, cookies),
        },
        ...requests,
      ])
      .then((res) => {
        // set cart datas
        if (res.responseData[0].responseStatus === 200)
          handleCartArray(
            res.responseData[0].responseData.result,
            temp,
            dispatch
          );

        // set buying addresses
        if (res.responseData[1].responseStatus === 200)
          setBuyingAddresses(
            res.responseData[1].responseData
          );
      })
      .catch((error) => handleAxiosError(error))
      .finally(() => setIsLoadingPage(false));
  }

  async function handleAddAddress() {
    if (!IS_OTP_VERIFIED(login)) return;
    trackPromise(
      axiosService
        .postDataWithOnRequestInterceptors(
          {
            endpoint: defaultConfigs.endpoint,
            url: requests[0].url,
            headers: {
              ...defaultConfigs.headers,
              [CONTENT_TYPE]: "application/json",
            },
            data: postUserBuyingAddress,
          },
          async () =>
            await authInterceptor(axiosService, cookies)
        )
        .then((res) => {
          if (res.responseStatus === 200) {
            let temp = [...buyingAddresses];
            temp.push(res.responseData);
            setBuyingAddresses([...temp]);
            handleOpenModalAddress();
          }
        })
        .catch((error) => handleAxiosError(error))
    );
  }

  function handlePostBuyingAddressTextChange(field, event) {
    const temp = { ...postUserBuyingAddress };
    temp[field] = event.target.value;
    setPostUserBuyingAddress(temp);
  }

  function handleAxiosError(error) {
    if (error.responseStatus === 500) handleError500();
    if (IS_NOT_AUTHENTICATE(error)) {
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
      setLogin(null);
      navigate("/");
      window.handleOpenOverriding(LOGIN);
      return;
    } else
      return handleErrorMessage(
        error,
        setErrorMessage,
        setErrorModalToggle,
        errorModalToggle
      );
  }

  function handleOpenModalAddress() {
    handleOpenModal(
      setAddressModalToggle,
      addressModalToggle
    );
  }

  function handleOpenModalPayment() {
    handleOpenModal(
      setPaymentModalToggle,
      paymentModalToggle
    );
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
        clicked={handleOpenModalAddress}
        toggle={addressModalToggle}>
        <ShowAddressModal
          handleAddAddress={handleAddAddress}
          handlePostBuyingAddressTextChange={
            handlePostBuyingAddressTextChange
          }
          handleOpenModalAddress={handleOpenModalAddress}
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalPayment}
        toggle={paymentModalToggle}>
        <ShowPaymentModal
          handleOpenModalPayment={handleOpenModalPayment}
        />
      </Modal>
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
            isLoadingPage={isLoadingPage}
            login={login}
            reduxDatas={reduxDatas}
            buyingAddresses={buyingAddresses}
            setBuyingAddresses={setBuyingAddresses}
            handleOpenModalAddress={handleOpenModalAddress}
            handleOpenModalPayment={handleOpenModalPayment}
          />
        ),
        [reduxDatas, buyingAddresses, login, isLoadingPage]
      )}
    </Fragment>
  );
}
