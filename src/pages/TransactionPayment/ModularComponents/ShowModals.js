import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowAddressModal = (props) => {
  return (
    <div className="transaction-payment-modal-container dark-bg-color">
      <div className="transaction-payment-modal-wrapper">
        <Button
          onClick={props.handleOpenModalAddress}
          className="align-self-end add-product-modal-button red-bg-color">
          <h4 className="add-product-modal-button-text">
            X
          </h4>
        </Button>
        <br />
      </div>
    </div>
  );
};
