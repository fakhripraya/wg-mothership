import { useState } from "react";
import MultiUpload from "../../../components/MultiUpload";
import {
  ADD_CATALOGUE_FORM,
  GENERAL_MULTIUPLOAD_LABEL,
  GENERAL_MULTIUPLOAD_SUBLABEL,
  JPEG_PNG,
  NO_DATA,
  NO_STRING,
} from "../../../variables/global";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

// COMPONENTS SPECIFIC //
export const ShowAddNewCatalogueModal = (props) => {
  // COMPONENT HOOKS
  const [tempCatalogue, setTempCatalogue] =
    useState(NO_STRING);

  // COMPONENT FUNCTIONS
  function handleCatalogueSubmit() {
    if (!tempCatalogue)
      return props.handleAddCatalogueError();

    let newFetchedDatas = { ...props.fetchedDatas };
    let newDropdowns =
      newFetchedDatas.dropdowns.catalogues.filter(
        (val) => val !== NO_DATA
      );
    newDropdowns.push(tempCatalogue);
    newFetchedDatas.dropdowns.catalogues = newDropdowns;
    newFetchedDatas.datas.catalogues.responseData.push({
      id: uuidv4(),
      catalogueName: tempCatalogue,
    });
    props.setFetchedDatas(newFetchedDatas);
    props.handleOpenModalAddCatalogue();
  }

  // RENDER
  return (
    <div className="add-catalogue-modal-container dark-bg-color">
      <div className="add-catalogue-modal-wrapper">
        <Button
          onClick={props.handleOpenModalAddCatalogue}
          className="align-self-end add-catalogue-button red-bg-color">
          <h4 className="add-catalogue-button-text">X</h4>
        </Button>
        <br />
        <h2 className="margin-top-0 margin-bottom-12-18">
          Tambah{" "}
          <span className="main-color">{props.title}</span>
        </h2>
        <h3 className="margin-top-0">
          Belum ada{" "}
          <span className="main-color">katalog</span> yang
          pas buat{" "}
          <span className="main-color">produk</span> di
          tokomu? <br />{" "}
          <span className="main-color">tambahin</span> dulu
          yuk !
        </h3>
        <div className="add-catalogue-textinput-box">
          <label className="add-catalogue-input-title margin-0">
            Nama Katalog
          </label>
          <TextInput
            value={tempCatalogue}
            onChange={(e) =>
              setTempCatalogue(e.target.value)
            }
            type="text"
            className="align-self-center add-catalogue-textinput darker-bg-color"
          />
        </div>
        <br />
        <Button
          onClick={() => handleCatalogueSubmit()}
          className="align-self-center add-catalogue-button main-bg-color">
          <h4 className="add-catalogue-button-text">
            Submit
          </h4>
        </Button>
      </div>
    </div>
  );
};

export const ShowUploadModal = (props) => {
  return (
    <div className="add-catalogue-modal-container dark-bg-color">
      <div className="add-catalogue-modal-wrapper">
        <Button
          onClick={props.handleOpenModalUpload}
          className="align-self-end add-catalogue-button red-bg-color">
          <h4 className="add-catalogue-button-text">X</h4>
        </Button>
        <br />
        <h2 className="margin-top-0 margin-bottom-12-18">
          Upload <span className="main-color">foto</span>{" "}
          untuk produkmu disini
        </h2>
        <MultiUpload
          formName={ADD_CATALOGUE_FORM}
          base64s={props.productPictures}
          setBase64s={props.setProductPictures}
          rejected={props.rejectedProductPictures}
          setRejected={props.setRejectedProductPictures}
          maxLength={5}
          maxSize={5 * 1000 * 1000} //5mb
          extensions={JPEG_PNG}
          label={GENERAL_MULTIUPLOAD_LABEL}
          subLabel={GENERAL_MULTIUPLOAD_SUBLABEL(JPEG_PNG)}
          additionalElement={
            <span className="red-color">MAX 5 FILE</span>
          }
          onDrop={props.handleOpenModalUpload}
        />
      </div>
    </div>
  );
};

export const ShowErrorModal = (props) => {
  return (
    <div className="add-catalogue-modal-container dark-bg-color">
      <div className="add-catalogue-modal-wrapper">
        <Button
          onClick={props.handleOpenModalError}
          className="align-self-end add-catalogue-modal-button red-bg-color">
          <h4 className="add-catalogue-modal-button-text">
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
