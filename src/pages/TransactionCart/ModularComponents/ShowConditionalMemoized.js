import React from "react";
import ErrorHandling from "../../ErrorHandling";
import Button from "../../../components/Button";
import { EMPTY_CART } from "../../../variables/errorMessages/transactionCart";
import ShowItems from "./ShowItems";
import {
  IS_OTP_VERIFIED,
  LOGIN,
} from "../../../variables/global";
import { handleOpenOverridingHome } from "../../../utils/functions/global";
import PageLoading from "../../PageLoading";
import { PAGE_REDIRECTING_MESSAGE } from "../../../variables/errorMessages/dashboard";

export default function ShowConditionalMemoized(props) {
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
    <div className="transaction-cart-container">
      <div className="transaction-cart-wrapper">
        <div className="transaction-cart-header">
          <div className="transaction-cart-title">
            <h1>Cart</h1>
          </div>
          <div className="transaction-cart-title justify-content-flex-end">
            <Button className="transaction-cart-title-btn red-bg-color">
              Clear
            </Button>{" "}
            <Button className="transaction-cart-title-btn main-bg-color">
              Checkout
            </Button>{" "}
          </div>
        </div>
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
        <div className="transaction-cart-item-container">
          <div className="transaction-cart-item-wrapper">
            <ShowItems datas={props.datas} />
          </div>
        </div>
      </div>
    </div>
  );
}
