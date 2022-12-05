import '.style.scss';
import React, { Fragment } from 'react';

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
            <div className="modal-container">
                <div className="modal-wrapper">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}
