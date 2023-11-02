import React from "react";
import "./style.scss";
import WGLogo from "../../assets/svg/LIVEJB_V1_LOGO.svg";

export default function PageLoading(props) {
  return (
    <div
      style={props.containerStyle}
      className={`page-loading-container ${props.className}`}>
      <div
        style={props.wrapperStyle}
        className="page-loading-wrapper">
        {!props.noLogo && (
          <img
            className="spinner-logo-img page-loading-logo-img"
            src={WGLogo}
            alt="WG_LOGO_SPINNER_PAGE_LOADING"
          />
        )}
        <p className="page-loading-text">
          {props.loadingMessage}
        </p>
      </div>
    </div>
  );
}
