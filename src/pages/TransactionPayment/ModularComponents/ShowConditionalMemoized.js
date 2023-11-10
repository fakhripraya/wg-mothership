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
  handleOpenModal,
  handleOpenOverridingHome,
} from "../../../utils/functions/global";
import PageLoading from "../../PageLoading";
import { PAGE_REDIRECTING_MESSAGE } from "../../../variables/errorMessages/dashboard";
import { useDispatch } from "react-redux";
import Modal from "../../../components/Modal";
import { ShowAddressModal } from "./ShowModals";

export default function ShowConditionalMemoized(props) {
  // HOOKS
  const dispatch = useDispatch();

  // STATE
  const [addressModalToggle, setAddressModalToggle] =
    useState(false);

  // FUNCTIONS
  function handleSubtotal() {
    const total = props.datas.reduce((acc, current) => {
      return (
        acc + Number(current.productPrice * current.buyQty)
      );
    }, 0);
    return total;
  }

  function handleOpenModalAddress() {
    handleOpenModal(
      setAddressModalToggle,
      addressModalToggle
    );
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
        noLogo={true}
        loadingMessage={"Loading Checkout..."}
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
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalAddress}
        toggle={addressModalToggle}>
        <ShowAddressModal
          handleOpenModalAddress={handleOpenModalAddress}
        />
      </Modal>
      <div className="transaction-payment-container">
        <div className="transaction-payment-wrapper">
          <div className="transaction-payment-detail-container">
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
              <h3>Alamat Pengiriman</h3>
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
                jl pelita rt 15 rw 08 Kebayoran Lama,
                Jakarta Selatan, 12240
              </label>
            </div>
            <br />
            <hr
              style={{ opacity: 0.1 }}
              className="max-width"
            />
            <br />
            <div className="transaction-payment-deliveryopt-container transaction-payment-deliveryopt-button-container">
              <Button style={{ marginRight: "8px" }}>
                Rumah Fakhri
              </Button>
              <Button style={{ marginRight: "8px" }}>
                Rumah Veallen
              </Button>
              <Button onClick={handleOpenModalAddress}>
                <span className="transaction-payment-plus-button-icon" />
              </Button>
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
            <img
              className="home-fullwidth-img"
              src={
                "https://images.tokopedia.net/img/NsjrJu/2020/9/25/b1d2ed1e-ef80-4d7a-869f-a0394f0629be.jpg?ect=4g"
              }
              alt="ads-2"></img>
          </div>
          <div className="transaction-payment-pricing-container">
            <div className="transaction-payment-pricing-box dark-bg-color">
              <h3 className="margin-0">Detail Checkout</h3>
              <br />
              <label>
                Subtotal : Rp.
                {formattedNumber(handleSubtotal())}
              </label>
              <br />
              <label>
                Biaya Jasa Aplikasi : Rp.
                {formattedNumber(ADMIN_FEE)}
              </label>
              <br />
              <br />
              <br />
              <label style={{ fontSize: "1.25em" }}>
                Total Pembayaran :{" "}
              </label>
              <br />
              <label style={{ fontSize: "1.25em" }}>
                <span className="main-color">
                  Rp.
                  {formattedNumber(
                    handleSubtotal() + ADMIN_FEE
                  )}
                </span>
              </label>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <br />
              <p className="align-self-start margin-0">
                Dengan ini kamu sudah membaca dan menyetujui{" "}
                <span className="font-bold main-color cursor-pointer">
                  syarat dan ketentuan
                </span>{" "}
                yang berlaku
              </p>
              <br />
              <Button>Lanjut Pembayaran</Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
