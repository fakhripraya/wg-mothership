import React from "react";
import "./style.scss";

export default function Tag(props) {
  return (
    <div className="tag-container main-bg-color">
      <h3
        style={props.textStyle}
        className="light-color">
        {props.text}
      </h3>
    </div>
  );
}
