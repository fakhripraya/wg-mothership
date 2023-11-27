import React from "react";
import "./style.scss";

export default function Card(props) {
  return (
    <div
      onClick={props.onClick}
      className={"card-container " + props.className}>
      {props.children}
    </div>
  );
}
