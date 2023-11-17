import Button from "../../../components/Button";
import TextArea from "../../../components/TextArea";
import TextInput from "../../../components/TextInput";
import { formattedNumber } from "../../../utils/functions/global";

export const ShowErrorModal = (props) => {
  return (
    <div className="transaction-cart-modal-container dark-bg-color">
      <div className="transaction-cart-modal-wrapper">
        <Button
          onClick={props.handleOpenModalError}
          className="align-self-end transaction-cart-modal-button red-bg-color">
          <h4 className="transaction-cart-modal-button-text">
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
