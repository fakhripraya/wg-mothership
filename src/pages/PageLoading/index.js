import React from "react";
import "./style.scss";
import WGLogo from "../../assets/images/baru2.png";

export default function PageLoading(props) {
  return (
    <div
      style={props.containerStyle}
      className={`page-loading-container ${props.className}`}>
      <div
        style={props.wrapperStyle}
        className="page-loading-wrapper">
        <img
          className="spinner-logo-img"
          src={WGLogo}
          alt="WG_LOGO_SPINNER_PAGE_LOADING"></img>
        <p className="page-loading-text">
          {props.loadingMessage}
        </p>
      </div>
    </div>
  );
}
