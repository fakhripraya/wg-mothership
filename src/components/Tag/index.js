import React from "react";
import "./style.scss";

export default function Tag(props) {
  return (
    <div className="tag-container main-bg-color">
      <h4
        style={props.textStyle}
        className="light-color">
        {props.text}
      </h4>
    </div>
  );
}
