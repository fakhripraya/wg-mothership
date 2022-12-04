import React from 'react';
import './style.scss';

export default function Checkbox(props) {
  return (
        <label className="checkbox-container">
            <span className="checkbox-title">{props.title}</span>
            <input type="checkbox"/>
            <span className="checkbox-checkmark"></span>
        </label>
  )
}
