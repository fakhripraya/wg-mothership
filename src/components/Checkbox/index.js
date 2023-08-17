import React from "react";
import "./style.scss";

export default function Checkbox(props) {
  return (
    <label
      className={"checkbox-container " + props.className}>
      <span className="checkbox-title">{props.title}</span>
      <input
        onChange={props.onChange}
        checked={props.checked}
        type="checkbox"
      />
      <span className="checkbox-checkmark"></span>
    </label>
  );
}
