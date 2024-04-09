import Button from "../../../components/Button";

export const ShowErrorModal = (props) => {
  return (
    <div className="dashboard-modal-container dark-bg-color">
      <div className="dashboard-modal-wrapper">
        <Button
          onClick={props.handleOpenModalError}
          className="align-self-end dashboard-modal-button red-bg-color">
          <h4 className="dashboard-modal-button-text">X</h4>
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
  );
};
