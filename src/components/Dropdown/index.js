import React, { useState } from 'react';
import "./styles.scss";

export default function Dropdown(props) {
    const [value, setValue] = useState(props.values[0]);
    const [toggle, setToggle] = useState(props.toggle);

    function handleOpenFilter() {
        setToggle(!toggle);
    }

    function handleChangeValue(val) {
        setValue(val);
        handleOpenFilter();
    }

    return <div
        className="dropdown-container">
        <span style={{ display: props.showTitle === false && "none" }} className="dropdown-title">Sort by : </span>
        <div style={props.style} className="dropdown-button-container">
            <button onClick={() => handleOpenFilter()} className="dropdown-button-wrapper">
                <label className="dropdown-value dropdown-button-label">
                    <span className="light-color">{value}</span>
                </label>
                <span className="dropdown-button-label-after" ></span>
            </button>
            <div className={
                toggle === false ?
                    "filter-dropdown-items-container" :
                    "filter-dropdown-items-container filter-dropdown-hide"
            }>
                <ul className="filter-dropdown-items-unordered-list">
                    {props.values.map((val, index) => {
                        return <li key={`${val}-${index}`} className="filter-dropdown-items-list">
                            <button onClick={() => { handleChangeValue(val) }} className="filter-dropdow-list-button">
                                <span>{val}</span>
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}
