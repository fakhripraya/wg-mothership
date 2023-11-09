import React from "react";
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
import { PAGE_REDIRECTING_MESSAGE } from "../../../variables/errorMessages/dashboard";
import { useDispatch } from "react-redux";

export default function ShowConditionalMemoized(props) {
  // HOOKS
  const dispatch = useDispatch();

  // FUNCTIONS
  function handleSubtotal() {
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
              jl pelita rt 15 rw 08 Kebayoran Lama, Jakarta
              Selatan, 12240
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
              Pilih Alamat
            </Button>
            <Button>Tambah Alamat</Button>
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
        <div className="transaction-payment-pricing-container">
          <div className="transaction-payment-pricing-box dark-bg-color">
            <h3 className="margin-0">Detail Checkout</h3>
            <br />
            <br />
            <label>
              Subtotal : Rp.
              {formattedNumber(handleSubtotal())}
            </label>
            <br />
            <label>
              Biaya Layanan dan Aplikasi : Rp.
              {formattedNumber(ADMIN_FEE)}
            </label>
            <br />
            <h3>
              Total Pembayaran :{" "}
              <span className="main-color">
                Rp.
                {formattedNumber(
                  handleSubtotal() + ADMIN_FEE
                )}
              </span>
            </h3>
            <hr
              style={{ opacity: 0.1 }}
              className="max-width"
            />
            <br />
            <p className="align-self-start margin-0">
              Pastikan kamu sudah membaca{" "}
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
  );
}
