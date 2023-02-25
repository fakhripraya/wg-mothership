import './style.scss';
import React, { Fragment, useRef, useEffect } from 'react';

export default function Modal(props) {

    const { classname, children, toggle, clicked } = props;
    const ref = useRef();

    function handleOnClick() {
        clicked();
    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <div onClick={() => handleOnClick()} className={toggle === true ? 'modal-background' : ''} />
            <div style={{ display: toggle === true ? 'block' : 'none' }} className="modal-container dark-bg-color">
                {children}
            </div>
        </Fragment>
    )
}
