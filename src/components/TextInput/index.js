import React from 'react';
import './style.scss';

export default function TextInput(props) {
    return (
        <input className={"input-text " + props.className}></input>
    )
}
