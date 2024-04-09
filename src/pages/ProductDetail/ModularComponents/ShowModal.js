import { useMemo } from "react";
import Button from "../../../components/Button";

export const ShowCourierModal = (props) => {
  return useMemo(
    () => (
      <div className="detail-modal-container dark-bg-color">
        <div className="detail-modal-wrapper">
          <Button
            onClick={() => props.handleOpenModal()}
            className="align-self-end detail-modal-button red-bg-color">
            <h4 className="detail-modal-button-text">X</h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Pilihan{" "}
            <span className="main-color">Kurir</span> yang
            tersedia
          </h3>
          <div className="breakline" />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.modalToggle,
      props.errorMessage,
      props.productData,
    ]
  );
};
