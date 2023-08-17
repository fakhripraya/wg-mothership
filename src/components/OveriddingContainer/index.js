import React from "react";
import "./style.scss";

export default function OverridingContainer(props) {
  const { children, toggle, clicked } = props;

  return (
    <div
      onClick={clicked}
      className={
        toggle === true
          ? "overriding-container-view overriding-container main-bg-color"
          : "overriding-container main-bg-color"
      }>
      <div className="overriding-wrapper">{children}</div>
    </div>
  );
}
