import MultiUpload from "../../../components/MultiUpload";
import Button from "../../../components/Button";
import {
  ADD_STORE_FORM,
  JPEG_PNG,
} from "../../../variables/global";

const ShowUploadModal = (props) => {
  return (
    <div className="add-catalogue-modal-container dark-bg-color">
      <div className="add-catalogue-modal-wrapper">
        <Button
          onClick={props.handleOpenModal}
          className="align-self-end add-catalogue-button red-bg-color">
          <h4 className="add-catalogue-button-text">X</h4>
        </Button>
        <br />
        <h2 className="margin-top-0 margin-bottom-12-18">
          Upload <span className="main-color">foto</span>{" "}
          untuk profile picture toko kamu disini
        </h2>
        <MultiUpload
          formName={ADD_STORE_FORM}
          base64s={props.base64s}
          setBase64s={props.setBase64s}
          maxLength={1}
          extensions={JPEG_PNG}
          label="Geser file dan masukkan file ke box ini atau klik untuk pilih file"
          subLabel="Mohon hanya upload extension .jpeg atau .png saja"
        />
      </div>
    </div>
  );
};

export default ShowUploadModal;
