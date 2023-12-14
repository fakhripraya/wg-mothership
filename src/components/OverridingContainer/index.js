import React from "react";
import "./style.scss";
import { Fragment } from "react";

export default function OverridingContainer(props) {
  const { children, toggle, clicked } = props;

  return (
    <Fragment>
      <div
        className={
          toggle === true
            ? "overriding-blurry-view overriding-blurry "
            : "overriding-blurry"
        }
      />
      <div
        onClick={clicked}
        className={
          toggle === true
            ? "overriding-container-view overriding-container "
            : "overriding-container"
        }>
        <div className="overriding-wrapper">{children}</div>
      </div>
    </Fragment>
  );
}
