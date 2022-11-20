import React from 'react';
import './style.scss';

export default function FloatButton(props) {
    return (
        <div style={props.style} onClick={props.onClick} className={"floatbutton-container " + props.className}>
            {props.children}
        </div>
    )
}
