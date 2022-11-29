import React from 'react';
import './style.scss';

export default function Tag(props) {
    return (
        <div className="tag-container main-bg-color">
            <h1 className="light-color">
                {props.text}
            </h1>
        </div>
    )
}