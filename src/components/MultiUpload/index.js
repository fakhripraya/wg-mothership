import "./style.scss";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../assets/svg/upload-image.svg";
import { getBase64 } from "../../utils/functions/global";
import { ADD_CATALOGUE_FORM } from "../../variables/global";

export default function MultiUpload(props) {
  let {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    validator: multiFileValidator,
  });

  function multiFileValidator(file) {
    var maxSize = 3000000;
    if (file.size > maxSize)
      return {
        code: "size-too-large",
        message: `Size is larger than ${maxSize} byte`,
      };
    return null;
  }

  React.useEffect(() => {
    async function init() {
      const proceed =
        acceptedFiles.length > 0 ? true : false;
      const temp = [...props.base64s];
      for (var i = 0; acceptedFiles.length > i; i++) {
        if (temp.length >= props.maxLength) break;
        const converted = await getBase64(acceptedFiles[i]);
        temp.push({
          name: acceptedFiles[i].name,
          size: acceptedFiles[i].size,
          base64: converted,
        });
      }
      if (proceed) props.setBase64s(temp);
    }
    init();
  }, [acceptedFiles]);

  const AcceptedFileItems = () => {
    if (!props.base64s) return;
    return props.base64s.map((file, index) => {
      return (
        <li
          className="multi-upload-file-list"
          key={`${file.name} ${index}`}>
          <img
            className="multi-upload-file-img"
            src={file.base64}
            alt={file.name}></img>
          <label className="multi-upload-file-text">
            {file.name} - {file.size} bytes
          </label>
        </li>
      );
    });
  };

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
              alt={`${ADD_CATALOGUE_FORM}-icon-image`}></img>
            <br />
            <label className="multi-upload-custom-typography">
              {props.subLabel}
            </label>
            {props.additionalElement}
          </div>
        </section>
      </div>
      <div className="multi-upload-picture-list">
        <AcceptedFileItems />
      </div>
    </div>
  );
}
