import React from "react";
import Modal from "../Modal";
import { usePromiseTracker } from "react-promise-tracker";
import WGLogo from "../../assets/images/baru2.png";
import "./style.scss";

export default function Spinner() {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <Modal
        bgClassName="dark-bg-color"
        className="spinner-container"
        toggle={true}>
        <div className="spinner-wrapper">
          <img
            className="spinner-logo-img"
            src={WGLogo}
            alt="WG_LOGO"></img>
        </div>
      </Modal>
    )
  );
}
