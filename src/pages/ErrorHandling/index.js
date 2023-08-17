import React from "react";
import "./style.scss";

export default function ErrorHandling(props) {
  // the error handling component consist of the primary error message / title
  // and comes with the optional child component
  return (
    <div
      style={props.containerStyle}
      className={`error-handling-container ${props.className}`}>
      <div
        style={props.wrapperStyle}
        className="error-handling-wrapper">
        {props.errorMessage}
        {props.children}
      </div>
    </div>
  );
}
