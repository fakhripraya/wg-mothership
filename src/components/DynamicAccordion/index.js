import React, { useRef, useState, useEffect } from "react";
import "./style.scss";

// MEMOIZED COMPONENTS //
const ShowItem = (props) => (
  <button
    key={`dynamic-accordion-${props.value.title}-${props.index}`}
    className="dynamic-accordion-button dynamic-accordion-subtitle-button">
    <p className="dynamic-accordion-subtitle light-color">
      {props.value.title}
    </p>
  </button>
);

const ShowItems = (props) =>
  !props.isButton
    ? props.children
    : props.data.map((value, index) => (
        <ShowItem
          value={value}
          index={index}
        />
      ));

function DynamicAccordion(props) {
  const listRef = useRef();
  const caretRef = useRef();
  const [toggle, setToggle] = useState(props.toggle);

  // FUNCTION SPECIFICS //
  function handleAccordionClick() {
    setToggle(!toggle);
  }

  useEffect(() => {
    if (caretRef.current && listRef.current) {
      if (toggle) {
        listRef.current.style.maxHeight = "500px";
        caretRef.current.style.transform = "rotate(0deg)";
      } else {
        listRef.current.style.maxHeight = "0px";
        caretRef.current.style.transform = "rotate(180deg)";
      }
    }
  }, [toggle]);

  return (
    <div
      className={
        "dynamic-accordion-wrapper " + props.className
      }>
      <div
        onClick={() => handleAccordionClick()}
        className="dynamic-accordion-button-wrapper">
        <button className="dynamic-accordion-button">
          <h3 className="dynamic-accordion-title light-color">
            {props.title}
          </h3>
        </button>
        <div className="dynamic-accordion-title-prefixes">
          <span
            className="dynamic-accordion-button-label-caret"
            ref={caretRef}
          />
          {props.prefixes}
        </div>
      </div>
      <div
        ref={listRef}
        className="dynamic-accordion-lists-container">
        <ShowItems
          isButton={props.isButton}
          data={props.data}>
          {props.children}
        </ShowItems>
      </div>
    </div>
  );
}

export default DynamicAccordion;
