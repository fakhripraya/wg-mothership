import React from "react";
import ErrorHandling from "../../ErrorHandling";
import Button from "../../../components/Button";
import { EMPTY_CART } from "../../../variables/errorMessages/transactionCart";
import ShowItems from "./ShowItems";

export default function ShowConditionalMemoized(props) {
  if (!props.datas || props.datas.length <= 0)
    return (
      <ErrorHandling errorMessage={EMPTY_CART}>
        <Button
          className="margin-top-12-18 "
          onClick={() => window.location.replace("/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );

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
