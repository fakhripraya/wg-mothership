import React, { useEffect } from 'react';
import { useState } from 'react';
import { ShowBreadcrumbs } from '../../components/Global'

export default function Detail() {

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // INITIAL RENDER
    useEffect(() => {
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, []);

    return (
        <div className="detail-container">
            <div className="detail-wrapper">
                <div className="finder-breadcrumbs">
                    <ShowBreadcrumbs trails={breadcrumbs} />
                </div>
                <div className="finder-title">
                    <h2>THIS IS THE TITLE OF THE FINDER</h2>
                </div>
                <div >

                </div>
            </div>
        </div>
    )
}
