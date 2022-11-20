import React, { Fragment } from 'react';
import './style.scss';

const BottomSheet = (props) => {
    const { classname, children, toggle, clicked } = props;

    return (
        <Fragment>
            <div onClick={clicked} className={toggle === true ? 'bottom-sheet-background' : ''} />
            <div className={classname + " main-bg-color"} >
                <button className='bottom-sheet-btn-draw' onClick={clicked} />
                {children}
            </div>
        </Fragment>
    );
};

export default BottomSheet;
