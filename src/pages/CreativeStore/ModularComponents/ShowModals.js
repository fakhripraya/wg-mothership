import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowErrorModal = (props) =>
  useMemo(
    () => (
      <div className="creative-store-modal-container dark-bg-color">
        <div className="creative-store-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end creative-store-modal-button red-bg-color">
            <h4 className="creative-store-modal-button-text">
              X
            </h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            There is an{" "}
            <span className="red-color">ERROR</span>
          </h3>
          <div className="breakline" />
          <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
            {props.errorMessage}
          </label>
        </div>
      </div>
    ),
    [props.modalToggle, props.errorMessage]
  );
