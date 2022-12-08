import React, { useEffect } from 'react';
import './style.scss';
import { useState } from 'react';
import { ShowBreadcrumbs } from '../../components/Global'
import { smoothScrollTop } from '../../utils/functions/global';

export default function Detail() {

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, []);

    return (
        <div className="detail-container">
            <div className="detail-wrapper">
                <div className="detail-breadcrumbs">
                    <ShowBreadcrumbs trails={breadcrumbs} />
                </div>
                <div className="detail-title">
                    <h2>THIS IS THE TITLE OF THE DETAIL</h2>
                </div>
                <div >

                </div>
            </div>
        </div>
    )
}
