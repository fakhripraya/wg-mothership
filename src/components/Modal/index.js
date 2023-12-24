import "./style.scss";
import React, { Fragment, useEffect } from "react";

export default function Modal(props) {
  let {
    className,
    bgClassName,
    children,
    toggle,
    clicked,
  } = props;
  if (!clicked) clicked = () => null;

  function handleOnClick() {
    clicked();
  }

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div
        onClick={() => handleOnClick()}
        className={
          toggle ? `modal-background ${bgClassName}` : ""
        }
      />
      <div
        style={{
          display: toggle ? "block" : "none",
        }}
        className={"modal-container " + className}>
        {children}
      </div>
    </Fragment>
  );
}
