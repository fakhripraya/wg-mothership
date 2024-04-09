import { useMemo } from "react";
import Button from "../../../components/Button";
import MultiUpload from "../../../components/MultiUpload";
import {
  ADD_CATALOGUE_FORM,
  GENERAL_MULTIUPLOAD_LABEL,
  GENERAL_MULTIUPLOAD_SUBLABEL,
  JPEG_PNG,
} from "../../../variables/global";

export const ShowErrorModal = (props) =>
  useMemo(
    () => (
      <div className="dashboard-catalogue-modal-container dark-bg-color">
        <div className="dashboard-catalogue-modal-wrapper">
          <Button
            onClick={() =>
              props.handleOpenModal(
                props.setModalToggle,
                props.modalToggle
              )
            }
            className="align-self-end dashboard-catalogue-modal-button red-bg-color">
            <h4 className="dashboard-catalogue-modal-button-text">
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.modalToggle, props.errorMessage]
  );

export const ShowDisplayItemImagesModal = (props) =>
  useMemo(
    () => (
      <div className="add-product-modal-container dark-bg-color">
        <div className="add-product-modal-wrapper">
          <Button
            onClick={props.handleOpenModalUpload}
            className="align-self-end add-product-button red-bg-color">
            <h4 className="add-product-button-text">X</h4>
          </Button>
          <div className="breakline" />
          <h3 className="margin-top-0 margin-bottom-12-18">
            Upload Foto Terbaru Produkmu Disini
          </h3>
          <MultiUpload
            formName={ADD_CATALOGUE_FORM}
            files={props.imagesData?.[props.item.id] || []}
            setFiles={(state) =>
              props.handleSetImagesData(
                props.item.id,
                state
              )
            }
            rejected={props.rejectedImagesData}
            setRejected={props.setRejectedImagesData}
            handleRemoveImageUpload={(index) => {
              let temp = [
                ...props.imagesData?.[props.item.id],
              ];

              if (temp.length === 1)
                return alert("Minimal harus ada 1 foto");

              const spliced = temp.splice(index, 1);
              props.handleSetImagesData(
                props.item.id,
                temp
              );
              props.handleRemovedImagesData(
                props.item.id,
                spliced
              );
            }}
            maxLength={5}
            maxSize={5 * 1000 * 1000} //5mb
            extensions={JPEG_PNG}
            label={GENERAL_MULTIUPLOAD_LABEL}
            subLabel={GENERAL_MULTIUPLOAD_SUBLABEL(
              JPEG_PNG
            )}
            additionalElement={
              <span className="red-color">MAX 5 FILE</span>
            }
          />
        </div>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.imagesData,
      props.rejectedImagesData,
      props.modalImagesUploadToggle,
    ]
  );
