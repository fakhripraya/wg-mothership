import "./style.scss";
import React, { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../assets/svg/upload-image.svg";
import {
  formattedNumber,
  getBase64,
  isImageType,
} from "../../utils/functions/global";
import FileIcon from "../../assets/svg/file.svg";
import Button from "../Button";

// TODO: current flow is using base64,
// analyze whether or not blob is able to be implemented with this flow
export const defaultHandleRemoveImageUpload = (
  base64s,
  setBase64s,
  index
) => {
  // Use splice to remove the item at the specified index
  let temp = [...base64s];
  temp.splice(index, 1);
  setBase64s(temp);
};

export const AcceptedFileItems = (props) =>
  props.base64s?.length > 0 && (
    <Fragment>
      <h3>File Diterima</h3>
      {props.base64s.map((file, index) => (
        <div
          key={`multi-upload-file-${props.uniqueKey}-${index}`}
          className="multi-upload-file-list-container">
          <li
            className="multi-upload-file-list"
            key={`${file.name} ${index}`}>
            <img
              className="multi-upload-file-img"
              src={
                isImageType(file.type)
                  ? file.base64
                  : FileIcon
              }
              alt={file.name}
            />
            <label className="multi-upload-file-text">
              {file.name} - ({formattedNumber(file.size)}{" "}
              bytes)
            </label>
          </li>
          <Button
            onClick={() => {
              if (props.handleRemoveImageUpload)
                props.handleRemoveImageUpload(index);
              else
                defaultHandleRemoveImageUpload(
                  props.base64s,
                  props.setBase64s,
                  index
                );
            }}
            className="justify-flex-end multi-upload-button red-bg-color">
            <h4 className="multi-upload-button-text">X</h4>
          </Button>
        </div>
      ))}
    </Fragment>
  );

export const FileRejectionItems = (props) =>
  props.rejected.length > 0 && (
    <Fragment>
      <h3>File Ditolak</h3>
      {props.rejected.map(({ file, errors }, index) => (
        <li
          className="multi-upload-file-list"
          key={`${file.name} ${index}`}>
          <img
            className="multi-upload-file-img"
            src={
              isImageType(file.type)
                ? file.base64
                : FileIcon
            }
            alt={file.name}
          />
          <label className="multi-upload-file-text">
            {index + 1}. {file.name} -{" "}
            {formattedNumber(file.size)} bytes
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          </label>
        </li>
      ))}
    </Fragment>
  );

export default function MultiUpload(props) {
  let { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    onDropAccepted,
    onDropRejected,
    validator: multiFileValidator,
  });

  async function onDropRejected(rejectedFiles) {
    const fileRejections = rejectedFiles;
    const proceed =
      fileRejections.length > 0 ? true : false;
    const temp = [];
    for (var i = 0; fileRejections.length > i; i++) {
      const converted = await getBase64(
        fileRejections[i].file
      );
      temp.push({
        file: {
          name: fileRejections[i].file.name,
          type: fileRejections[i].file.type,
          size: fileRejections[i].file.size,
          base64: converted,
        },
        errors: fileRejections[i].errors,
      });
    }
    if (proceed) props.setRejected([...temp]);
  }

  async function onDropAccepted(acceptedFiles) {
    const proceed = acceptedFiles.length > 0 ? true : false;
    const temp = [...props.base64s];
    for (var i = 0; acceptedFiles.length > i; i++) {
      if (temp.length >= props.maxLength) break;
      const converted = await getBase64(acceptedFiles[i]);
      temp.push({
        name: acceptedFiles[i].name,
        type: acceptedFiles[i].type,
        size: acceptedFiles[i].size,
        base64: converted,
      });
    }
    if (proceed) props.setBase64s(temp);
  }

  function multiFileValidator(file) {
    if (
      (file.type.length === 0) |
      !props.extensions.includes(file.type)
    )
      return {
        code: "invalid-extension",
        message: `Tipe file: ${file.type} tidak dapat diterima`,
      };
    if (file.size > props.maxSize)
      return {
        code: "size-too-large",
        message: `Size lebih besar dari pada ${formattedNumber(
          props.maxSize
        )} byte`,
      };
    return null;
  }

  return (
    <div className="multi-upload-picture-box darker-bg-color">
      <div className="multi-upload-picture-field">
        <section className="multi-upload-dropzone-container">
          <div
            {...getRootProps({
              className: "multi-upload-dropzone-box",
            })}>
            <input {...getInputProps()} />
            <label className="multi-upload-custom-typography">
              {props.label}
            </label>
            <br />
            <img
              className="multi-upload-icon-img"
              src={
                props.customIcon
                  ? props.customIcon
                  : UploadIcon
              }
              alt={`${props.formName}-icon-image`}></img>
            <br />
            <label className="multi-upload-custom-typography">
              {props.subLabel}
            </label>
            {props.additionalElement}
          </div>
        </section>
      </div>
      <div className="multi-upload-picture-list">
        <AcceptedFileItems
          base64s={props.base64s}
          setBase64s={props.setBase64s}
          handleRemoveImageUpload={
            props.handleRemoveImageUpload
          }
        />
      </div>
      <div className="multi-upload-picture-list">
        <FileRejectionItems rejected={props.rejected} />
      </div>
    </div>
  );
}
