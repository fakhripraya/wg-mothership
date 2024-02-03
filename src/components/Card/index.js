import React from "react";
import "./style.scss";

export default function Card(props) {
  return (
    <div
      onKeyUp={props.onKeyUp}
      onClick={props.onClick}
      className={"card-container " + props.className}>
      {props.children}
    </div>
  );
}
