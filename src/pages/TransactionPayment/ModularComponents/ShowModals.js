import Button from "../../../components/Button";
import TextArea from "../../../components/TextArea";
import TextInput from "../../../components/TextInput";
import { formattedNumber } from "../../../utils/functions/global";

export const ShowErrorModal = (props) => {
  return (
    <div className="transaction-payment-modal-container dark-bg-color">
      <div className="transaction-payment-modal-wrapper">
        <Button
          onClick={props.handleOpenModalError}
          className="align-self-end transaction-payment-modal-button red-bg-color">
          <h4 className="transaction-payment-modal-button-text">
            X
          </h4>
        </Button>
        <br />
        <h3 className="margin-top-0 margin-bottom-12-18">
          There is an{" "}
          <span className="red-color">ERROR</span>
        </h3>
        <br />
        <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
          {props.errorMessage}
        </label>
      </div>
    </div>
  );
};

export const ShowAddressModal = (props) => {
  return (
    <div className="transaction-payment-modal-container dark-bg-color">
      <div className="transaction-payment-modal-wrapper">
        <Button
          onClick={props.handleOpenModalAddress}
          className="align-self-end transaction-payment-modal-button red-bg-color">
          <h4 className="transaction-payment-modal-button-text">
            X
          </h4>
        </Button>
        <br />
        <h3 className="margin-top-0 margin-bottom-12-18">
          Tambah Alamat Tujuan Pengiriman
        </h3>
        <br />
        <div className="transaction-payment-text-container">
          <div className="transaction-payment-text-wrapper">
            <div className="transaction-payment-textinput-box">
              <label className="transaction-payment-input-title">
                Label
              </label>
              <TextInput
                onChange={(e) => {}}
                type="text"
                className="transaction-payment-textinput darker-bg-color"
              />
            </div>
            <br />
            <div className="transaction-payment-textinput-box">
              <label className="transaction-payment-input-title">
                Alamat Lengkap
              </label>
              <TextArea
                onChange={(e) => {}}
                type="text"
                className="transaction-payment-longtext-area darker-bg-color"
              />
            </div>
            <br />
            <div className="transaction-payment-textinput-box">
              <label className="transaction-payment-input-title">
                Catatan
              </label>
              <TextInput
                onChange={(e) => {}}
                type="text"
                className="transaction-payment-textinput darker-bg-color"
              />
            </div>
            <br />
            <div className="transaction-payment-textinput-box">
              <label className="transaction-payment-input-title">
                Penerima
              </label>
              <TextInput
                onChange={(e) => {}}
                type="text"
                className="transaction-payment-textinput darker-bg-color"
              />
            </div>
            <br />
            <div className="transaction-payment-textinput-box">
              <label className="transaction-payment-input-title">
                No HP
              </label>
              <TextInput
                onChange={(e) => {}}
                type="text"
                className="transaction-payment-textinput darker-bg-color"
              />
            </div>
            <br />
            <br />
            <p className="align-self-start margin-0">
              Dengan ini kamu sudah membaca dan menyetujui{" "}
              <span className="font-bold main-color cursor-pointer">
                syarat dan ketentuan
              </span>{" "}
              yang berlaku
            </p>
            <Button className="align-self-start transaction-payment-button main-bg-color">
              <p className="transaction-payment-button-text">
                Submit
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShowPaymentModal = (props) => {
  return (
    <div className="transaction-payment-modal-container dark-bg-color">
      <div className="transaction-payment-modal-wrapper">
        <Button
          onClick={props.handleOpenModalPayment}
          className="align-self-end transaction-payment-modal-button red-bg-color">
          <h4 className="transaction-payment-modal-button-text">
            X
          </h4>
        </Button>
        <br />
        <h3 className="margin-top-0 margin-bottom-12-18">
          Pembayaran
        </h3>
        <div className="transaction-payment-text-container">
          <div className="transaction-payment-text-wrapper">
            <br />
            <label className="font-bold">
              Mau Bayar Pakai Apa ?
            </label>
            <br />
            <hr
              style={{ opacity: 0.1 }}
              className="max-width"
            />
            <br />
            <label className="font-bold">
              Detail Pembayaran
            </label>
            <br />
            <label>Total: Rp.20,000,000</label>
            <label>Biaya Transaksi: Rp.20,000,000</label>
            <hr
              style={{ opacity: 0.1 }}
              className="max-width"
            />
            <br />
            <label style={{ fontSize: "1.25em" }}>
              Grand Total :{" "}
            </label>
            <label style={{ fontSize: "1.5em" }}>
              <span className="main-color font-bold">
                Rp.
                {formattedNumber(40000000)}
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
            <Button className="align-self-start transaction-payment-button main-bg-color">
              <p className="transaction-payment-button-text">
                Submit
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
