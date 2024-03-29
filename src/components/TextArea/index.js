import React from "react";
import "./style.scss";

export default function TextArea(props) {
  return (
    <textarea
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      value={props.value}
      style={props.style}
      onChange={props.onChange}
      maxLength={props.maxLength}
      type={props.type}
      className={"text-area " + props.className}></textarea>
  );
}
