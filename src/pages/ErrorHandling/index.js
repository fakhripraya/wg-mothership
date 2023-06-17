import React from 'react';
import './style.scss';

export default function ErrorHandling(props) {
    return <div style={props.containerStyle} className="error-handling-container">
        <div style={props.wrapperStyle} className="error-handling-wrapper">
            {props.errorMessage}
            {props.children}
        </div>
    </div>
}
