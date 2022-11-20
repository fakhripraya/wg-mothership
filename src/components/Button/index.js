import React from 'react';
import './style.scss';

export default function Button(props) {
    return (
        <div style={props.style} onClick={props.onClick} className={"button-container main-bg-color " + props.className}>
            {props.children}
        </div>
    )
}
