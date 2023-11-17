import Button from "../../../components/Button";

export const ShowErrorModal = (props) => {
  return (
    <div className="add-store-modal-container dark-bg-color">
      <div className="add-store-modal-wrapper">
        <Button
          onClick={props.handleOpenModal}
          className="align-self-end add-store-modal-button red-bg-color">
          <h4 className="add-store-modal-button-text">X</h4>
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

export const ShowSuccessModal = (props) => {
  return (
    <div className="add-store-modal-container dark-bg-color">
      <div className="add-store-modal-wrapper">
        <h3 className="margin-top-0 margin-bottom-12-18">
          <span className="main-color">SUKSES</span>
        </h3>
        <br />
        <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
          Wah selamat, kamu berhasil membuat lapak tokomu !
        </label>
        <br />
        <div
          style={{ padding: "0px", width: "30%" }}
          className="align-self-center add-store-modal-button">
          <Button onClick={props.handleGoBackDashboard}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};
