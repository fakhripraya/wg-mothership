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
    newFetchedDatas.datas.catalogues.responseData.result.push(
      {
        id: uuidv4(),
        catalogueName: tempCatalogue,
      }
    );
    props.setFetchedDatas(newFetchedDatas);
    props.handleOpenModalAddCatalogue();
  }

  // RENDER
  return (
    <div className="add-product-modal-container dark-bg-color">
      <div className="add-product-modal-wrapper">
        <Button
          onClick={props.handleOpenModalAddCatalogue}
          className="align-self-end add-product-button red-bg-color">
          <h4 className="add-product-button-text">X</h4>
        </Button>
        <br />
        <h3 className="margin-top-0 margin-bottom-12-18">
          Tambah Katalog
        </h3>
        <label className="margin-top-0">
          Belum ada{" "}
          <span className="main-color">katalog</span> yang
          pas buat{" "}
          <span className="main-color">produk</span> di
          tokomu? <br />{" "}
          <span className="main-color">tambahin</span> dulu
          yuk !
        </label>
        <div className="add-product-textinput-box">
          <label className="add-product-input-title margin-0">
            Nama Katalog
          </label>
          <TextInput
            value={tempCatalogue}
            onChange={(e) =>
              setTempCatalogue(e.target.value)
            }
            type="text"
            className="align-self-center add-product-textinput darker-bg-color"
          />
        </div>
        <br />
        <Button
          onClick={() => handleCatalogueSubmit()}
          className="align-self-center add-product-button main-bg-color">
          <h4 className="add-product-button-text">
            Submit
          </h4>
        </Button>
      </div>
    </div>
  );
};

export const ShowUploadModal = (props) => (
  <div className="add-product-modal-container dark-bg-color">
    <div className="add-product-modal-wrapper">
      <Button
        onClick={props.handleOpenModalUpload}
        className="align-self-end add-product-button red-bg-color">
        <h4 className="add-product-button-text">X</h4>
      </Button>
      <br />
      <h3 className="margin-top-0 margin-bottom-12-18">
        Upload <span className="main-color">Foto</span>{" "}
        Untuk Produkmu Disini
      </h3>
      <MultiUpload
        formName={ADD_CATALOGUE_FORM}
        files={props.productPictures}
        setFiles={props.setProductPictures}
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

export const ShowErrorModal = (props) => (
  <div className="add-product-modal-container dark-bg-color">
    <div className="add-product-modal-wrapper">
      <Button
        onClick={props.handleOpenModalError}
        className="align-self-end add-product-modal-button red-bg-color">
        <h4 className="add-product-modal-button-text">X</h4>
      </Button>
      <br />
      <h3 className="margin-top-0 margin-bottom-12-18">
        There is an <span className="red-color">ERROR</span>
      </h3>
      <br />
      <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
        {props.errorMessage}
      </label>
    </div>
  </div>
);

export const ShowSuccessModal = (props) => (
  <div className="add-store-modal-container dark-bg-color">
    <div className="add-store-modal-wrapper">
      <h3 className="margin-top-0 margin-bottom-12-18">
        <span className="main-color">SUKSES</span>
      </h3>
      <br />
      <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
        Sukses menambah display item !
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
