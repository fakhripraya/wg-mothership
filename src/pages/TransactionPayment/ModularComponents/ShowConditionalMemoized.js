import React, { Fragment, useState } from "react";
import ErrorHandling from "../../ErrorHandling";
import Button from "../../../components/Button";
import { EMPTY_CART } from "../../../variables/errorMessages/transactionCart";
import ShowItems from "./ShowItems";
import {
  ADMIN_FEE,
  IS_OTP_VERIFIED,
  LOGIN,
} from "../../../variables/global";
import {
  formattedNumber,
  handleOpenOverridingHome,
} from "../../../utils/functions/global";
import PageLoading from "../../PageLoading";
import { LOGIN_PAGE_REDIRECTING_MESSAGE } from "../../../variables/errorMessages/dashboard";
import { useDispatch } from "react-redux";
import { cloneDeep } from "lodash-es";

export default function ShowConditionalMemoized(props) {
  // HOOKS
  const dispatch = useDispatch();

  // STATE
  const [selectedAddress, setSelectedAddress] = useState(0);

  // VARIABLES
  let filteredDatas =
    props.login &&
    props.reduxDatas.filter(
      (val) => val.userId === props.login.user.userId
    );

  // FUNCTIONS
  function handleSubtotal() {
    const temp = cloneDeep(filteredDatas);
    const total = temp.reduce((acc, current) => {
      return (
        acc + Number(current.productPrice * current.buyQty)
      );
    }, 0);
    return total;
  }

  if (!IS_OTP_VERIFIED(props.login)) {
    // Executing asynchronous call for redirecting to home page
    handleOpenOverridingHome(LOGIN);
    // Placeholder message while redirecting to home page
    return (
      <PageLoading
        loadingMessage={LOGIN_PAGE_REDIRECTING_MESSAGE}
      />
    );
  }

  //TODO: We are not putting buying addresses validation here
  // because we will change this into shimmering load later
  if (props.isLoadingPage) {
    return (
      <PageLoading
        noLogo={true}
        loadingMessage={"Loading Checkout..."}
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
    <div className="transaction-payment-container">
      <div className="transaction-payment-wrapper">
        <div className="transaction-payment-detail-container">
          <div className="transaction-payment-header">
            <div className="transaction-payment-title">
              <h2 className="transaction-payment-title-text">
                Checkout
              </h2>
            </div>
          </div>
          <div className="breakline" />
          <hr
            style={{ opacity: 0.1 }}
            className="max-width"
          />
          {props.buyingAddresses?.length !== 0 && (
            <Fragment>
              <div className="transaction-payment-deliveryopt-container">
                <h3>Alamat Pengiriman</h3>
                <p className="font-bold main-color cursor-pointer margin-bottom-8">
                  {
                    props.buyingAddresses[selectedAddress]
                      .addressLabel
                  }
                </p>
                <label>
                  {
                    props.buyingAddresses[selectedAddress]
                      .addressPhoneNumber
                  }
                </label>
                <div className="breakline" />
                <label>
                  {
                    props.buyingAddresses[selectedAddress]
                      .addressDetail
                  }
                </label>
              </div>
              <div className="breakline" />
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
            </Fragment>
          )}
          <div className="breakline" />
          <div className="transaction-payment-deliveryopt-container transaction-payment-deliveryopt-button-container">
            {props.buyingAddresses?.map((val, index) => (
              <Button
                className="transaction-payment-deliveryopt-button"
                onClick={() => setSelectedAddress(index)}
                key={`transaction-payment-buying-address-label-${index}-id${val.id}`}>
                {val.addressLabel}
              </Button>
            ))}
          </div>
          {props.buyingAddresses.length === 0 && (
            <label>
              Wah kamu belum ada alamat tujuan nih,{" "}
              <span
                onClick={props.handleOpenModalAddress}
                className="main-color cursor-pointer">
                tambah alamat
              </span>{" "}
              dulu !
            </label>
          )}
          {props.buyingAddresses.length !== 0 && (
            <Button
              className="transaction-payment-deliveryopt-button-add"
              onClick={props.handleOpenModalAddress}>
              <span className="transaction-payment-plus-button-icon" />
            </Button>
          )}
          <div className="breakline" />
          <hr
            style={{ opacity: 0.1 }}
            className="max-width"
          />
          <div className="transaction-payment-item-container">
            <div className="transaction-payment-item-wrapper">
              <ShowItems
                login={props.login}
                reduxDatas={props.reduxDatas}
                filteredDatas={filteredDatas}
                dispatch={dispatch}
              />
            </div>
          </div>
          <img
            className="home-fullwidth-img"
            src={
              "https://images.tokopedia.net/img/NsjrJu/2020/9/25/b1d2ed1e-ef80-4d7a-869f-a0394f0629be.jpg?ect=4g"
            }
            alt="ads-2"
          />
        </div>
        <div className="transaction-payment-pricing-container">
          <div className="transaction-payment-pricing-box dark-bg-color">
            <h3 className="margin-0">Detail Checkout</h3>
            <div className="breakline" />
            <p className="margin-bottom-8">
              Subtotal : Rp.
              {formattedNumber(handleSubtotal())}
            </p>
            <label>
              Biaya Jasa Aplikasi : Rp.
              {formattedNumber(ADMIN_FEE)}
            </label>
            <div className="breakline" />
            <div className="breakline" />
            <label style={{ fontSize: "1em" }}>
              Total Belanja :{" "}
            </label>
            <div className="breakline" />
            <label style={{ fontSize: "1.25em" }}>
              <span className="main-color  font-bold">
                Rp.
                {formattedNumber(
                  handleSubtotal() + ADMIN_FEE
                )}
              </span>
            </label>
            <hr
              style={{ opacity: 0.1 }}
              className="max-width margin-top-bottom-16"
            />
            <p className="align-self-start">
              Pastikan kamu sudah menanyakan ketersediaan{" "}
              <span className="font-bold main-color cursor-pointer">
                stok produk
              </span>{" "}
              yang ingin kamu beli
            </p>
            <Button onClick={props.handleOpenModalPayment}>
              Lanjut Pembayaran
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
