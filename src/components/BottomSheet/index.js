import React, { Fragment, useEffect, useRef } from "react";
import "./style.scss";

const BottomSheet = (props) => {
  const { classname, children, toggle, clicked } = props;
  const ref = useRef();

  function handleOnClick() {
    clicked();
  }

  useEffect(() => {
    if (toggle)
      ref.current.style.transform = "translateY(0%)";
    else ref.current.style.transform = "translateY(100%)";
  }, [toggle]);

  return (
    <Fragment>
      <div
        onClick={() => handleOnClick()}
        className={
          toggle === true ? "bottom-sheet-background" : ""
        }
      />
      <div
        ref={ref}
        className={
          "bottom-sheet main-bg-color " + classname
        }>
        <button
          className="bottom-sheet-btn-draw"
          onClick={() => handleOnClick()}
        />
        {children}
      </div>
    </Fragment>
  );
};

export default BottomSheet;
