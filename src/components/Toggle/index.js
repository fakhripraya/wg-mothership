import React from "react";
import "./style.scss";
export default function Toggle(props) {
  return (
    <label className={`switch ${props.className}`}>
      <input
        onChange={props.onChange}
        checked={props.checked}
        type="checkbox"
      />
      <span className="slider round"></span>
    </label>
  );
}
