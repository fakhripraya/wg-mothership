import React from "react";
import "./style.scss";

export default function Tag(props) {
  return (
    <div className={`tag-container ${props.className}`}>
      <p
        style={props.textStyle}
        className="light-color">
        {props.text}
      </p>
    </div>
  );
}
