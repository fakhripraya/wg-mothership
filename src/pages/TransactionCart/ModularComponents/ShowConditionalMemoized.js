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

  // FUNCTION SPECIFIC
  function handleDisplayTotal() {
    const total = props.datas.reduce((acc, current) => {
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

  if (!props.datas) {
    return (
      <PageLoading
        loadingMessage={
          "Tunggu bentar ya \n Kita lagi siapin cartnya..."
        }
      />
    );
  }

  if (props.datas.length <= 0) {
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
            <h1 className="transaction-cart-title-text">
              Keranjang
            </h1>
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
                  dispatch(setItem(temp));
                  props.setDatas([]);
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
              <h3 className="text-align-end margin-0">
                Total: Rp.
                {formattedNumber(handleDisplayTotal())}
              </h3>
            </div>
          </div>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
        <br />
        <p className="align-self-start margin-0">
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
