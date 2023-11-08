import React from "react";
import ErrorHandling from "../../ErrorHandling";
import Button from "../../../components/Button";
import { EMPTY_CART } from "../../../variables/errorMessages/transactionCart";
import ShowItems from "./ShowItems";
import {
  IS_OTP_VERIFIED,
  LOGIN,
} from "../../../variables/global";
import {
  formattedNumber,
  handleOpenOverridingHome,
} from "../../../utils/functions/global";
import PageLoading from "../../PageLoading";
import { PAGE_REDIRECTING_MESSAGE } from "../../../variables/errorMessages/dashboard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setItem } from "../../../utils/redux/reducers/cartReducer";
import { cloneDeep } from "lodash-es";

export default function ShowConditionalMemoized(props) {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!IS_OTP_VERIFIED(props.login))
    return (() => {
      // Executing asynchronous call for redirecting to home page
      handleOpenOverridingHome(LOGIN);
      // Placeholder message while redirecting to home page
      return (
        <PageLoading
          loadingMessage={PAGE_REDIRECTING_MESSAGE}
        />
      );
    })();

  if (!props.datas || props.datas.length <= 0) {
    return (
      <ErrorHandling errorMessage={EMPTY_CART}>
        <Button
          className="margin-top-12-18 "
          onClick={() => window.location.replace("/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );
  }

  return (
    <div className="transaction-payment-container">
      <div className="transaction-payment-wrapper">
        <div className="transaction-payment-header">
          <div className="transaction-payment-title">
            <h1 className="transaction-payment-title-text">
              Checkout
            </h1>
          </div>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
        <div className="transaction-payment-deliveryopt-container">
          <h2>Alamat Pengiriman</h2>
          <label
            style={{ marginBottom: "8px" }}
            className="font-bold main-color cursor-pointer">
            {props.login.user.fullName}
          </label>
          <br />
          <label style={{ marginBottom: "8px" }}>
            081280111698
          </label>
          <br />
          <label style={{ marginBottom: "8px" }}>
            jl pelita rt 15 rw 08 Kebayoran Lama, Jakarta
            Selatan, 12240
          </label>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
        <div className="transaction-payment-item-container">
          <div className="transaction-payment-item-wrapper">
            <ShowItems
              login={props.login}
              datas={props.datas}
              setDatas={props.setDatas}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
