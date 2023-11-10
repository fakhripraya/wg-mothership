import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowCourierModal = (props) => {
  return useMemo(
    () => (
      <div className="add-product-modal-container dark-bg-color">
        <div className="add-product-modal-wrapper">
          <Button
            onClick={() => props.handleOpenModal()}
            className="align-self-end add-product-modal-button red-bg-color">
            <h4 className="add-product-modal-button-text">
              X
            </h4>
          </Button>
          <br />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Pilihan{" "}
            <span className="main-color">Kurir</span> yang
            tersedia
          </h3>
          <br />
          {props.productData &&
            JSON.parse(
              props.productData.availableCourierList
            ).map((val, index) => {
              return (
                <label
                  key={`${val}-${index}`}
                  className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                  {`${index + 1}. ${val}`}
                </label>
              );
            })}
        </div>
      </div>
    ),
    [
      props.modalToggle,
      props.errorMessage,
      props.productData,
    ]
  );
};
