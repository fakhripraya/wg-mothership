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
import { cloneDeep } from "lodash-es";
import { setCartStateAndBroadcast } from "../../../utils/functions/cart";

export default function ShowConditionalMemoized(props) {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // VARIABLES
  let filteredDatas = props.reduxDatas.filter(
    (val) => val.userId === props.login.user.userId
  );

  // FUNCTION SPECIFIC
  function handleDisplayTotal() {
    const temp = cloneDeep(filteredDatas);
    const total = temp.reduce((acc, current) => {
      return (
        acc + Number(current.productPrice * current.buyQty)
      );
    }, 0);
    return total;
  }

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

  if (props.isLoadingPage) {
    return (
      <PageLoading
        noLogo={true}
        loadingMessage={
          "Tunggu bentar ya \n Kita lagi siapin cartnya..."
        }
      />
    );
  }

  if (filteredDatas.length <= 0) {
    return (
      <ErrorHandling errorMessage={EMPTY_CART}>
        <Button
          className="margin-top-12-18 "
          onClick={() => (window.location.href = "/")}>
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
            <h2 className="transaction-cart-title-text">
              Keranjang
            </h2>
          </div>
          <div className="transaction-cart-title justify-content-flex-end">
            <div className="transaction-cart-title-btn-container">
              <Button
                onClick={() => {
                  const temp = cloneDeep(
                    props.reduxDatas
                  ).filter(
                    (val) =>
                      val.userId !== props.login.user.userId
                  );
                  setCartStateAndBroadcast(dispatch, [
                    ...temp,
                  ]);
                }}
                style={{ marginBottom: "8px" }}
                className="transaction-cart-title-btn red-bg-color">
                Clear
              </Button>
              <Button
                onClick={() =>
                  navigate("/transaction/payment")
                }
                style={{ marginBottom: "8px" }}
                className="transaction-cart-title-btn
                main-bg-color">
                {" "}
                Checkout
              </Button>
            </div>
          </div>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
        <br />
        <label
          style={{
            fontSize: "1.25em",
          }}
          className="margin-0 font-bold max-width">
          Total : Rp.
          {formattedNumber(handleDisplayTotal())}
        </label>
        <p
          style={{
            margin: "0px",
            marginTop: "8px",
          }}
          className="align-self-start">
          Sebelum kamu melakukan{" "}
          <span className="font-bold main-color">
            checkout
          </span>
          , pastikan kamu sudah memastikan isi{" "}
          <span className="font-bold main-color">
            keranjang
          </span>{" "}
        </p>
        <div className="transaction-cart-item-container">
          <div className="transaction-cart-item-wrapper">
            <ShowItems
              login={props.login}
              reduxDatas={props.reduxDatas}
              filteredDatas={filteredDatas}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
