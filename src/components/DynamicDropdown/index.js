import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function DynamicDropdown(props) {
  const [value, setValue] = useState(
    props.value ? props.value : props.values[0]
  );
  const [toggle, setToggle] = useState(props.toggle);

  function handleOpenFilter(values) {
    if (values.length === 0) return;
    setToggle(!toggle);
  }

  function handleChangeValue(val) {
    if (val === "No Data") return;
    setValue(val);
    props.onChange(val);
    handleOpenFilter(props.values);
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div
      className={"dropdown-container " + props.className}>
      <span
        style={{
          display: props.showTitle === false && "none",
        }}
        className="dropdown-title">
        Sort by :{" "}
      </span>
      <div
        style={props.style}
        className="dropdown-button-container">
        <button
          onClick={() => handleOpenFilter(props.values)}
          className="dropdown-button-wrapper">
          <label className="dropdown-value dropdown-button-label">
            <span className="light-color">
              {props.values.length === 0
                ? "loading..."
                : value}
            </span>
          </label>
          <span
            style={{
              transform:
                toggle === true
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
            }}
            className="dropdown-button-label-after"
          />
        </button>
        <div
          className={
            toggle === false
              ? "filter-dropdown-items-container"
              : "filter-dropdown-items-container filter-dropdown-hide"
          }>
          <ul className="filter-dropdown-items-unordered-list">
            {props.values.map((val, index) => {
              return (
                <li
                  key={`${val}-${index}`}
                  className="filter-dropdown-items-list">
                  <button
                    onClick={() => {
                      handleChangeValue(val);
                    }}
                    className="filter-dropdow-list-button">
                    <span>{val}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
