import React from "react";
import "./style.scss";

export default function SliderRange(props) {
  return (
    <input
      style={props.style}
      className={`${props.className}`}
      type="range"
      id={props.id}
      min={props.min}
      max={props.max}
      step={props.step}
    />
  );
}
