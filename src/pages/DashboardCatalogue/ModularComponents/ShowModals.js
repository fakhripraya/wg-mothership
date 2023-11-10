import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowErrorModal = (props) => {
  return useMemo(() => {
    return (
      <div className="add-product-modal-container dark-bg-color">
        <div className="add-product-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end add-product-modal-button red-bg-color">
            <h4 className="add-product-modal-button-text">
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modalToggle, props.errorMessage]);
};
