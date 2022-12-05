import React from 'react';
import './style.scss';

export default function TextInput(props) {
    return (
        <input type={props.type} className={"input-text " + props.className}></input>
    )
}
