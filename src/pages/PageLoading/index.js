import React from "react";
import "./style.scss";

export default function PageLoading(props) {
  return (
    <div
      style={props.containerStyle}
      className="page-loading-container">
      <div
        style={props.wrapperStyle}
        className="page-loading-wrapper">
        {props.loadingMessage}
      </div>
    </div>
  );
}
