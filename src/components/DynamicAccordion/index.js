import React, { useRef, useState, useEffect } from "react";
import "./style.scss";

// MEMOIZED COMPONENTS //
const ShowItem = (props) => {
  return (
    <button
      key={`dynamic-accordion-${props.value.title}-${props.index}`}
      className="dynamic-accordion-button dynamic-accordion-subtitle-button">
      <h6 className="dynamic-accordion-subtitle light-color">
        {props.value.title}
      </h6>
    </button>
  );
};

const ShowItems = (props) => {
  if (!props.isButton) return props.children;
  return props.data.map((value, index) => {
    return (
      <ShowItem
        value={value}
        index={index}
      />
    );
  });
};

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
          <h2 className="dynamic-accordion-title light-color">
            {props.title}
          </h2>
        </button>
        <div className="dynamic-accordion-title-prefixes">
          <span
            className="dynamic-accordion-button-label-caret"
            ref={caretRef}
          />
          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="dynamic-accordion-button-label-plus"
          />
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
