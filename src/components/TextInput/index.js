import React from 'react';
import './style.scss';

export default function TextInput(props) {
    return (
        <input onChange={props.onChange} maxLength={props.maxLength} type={props.type} className={"input-text " + props.className}></input>
    )
}
