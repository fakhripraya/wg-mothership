import React, { useEffect } from 'react';
import './style.scss';
import { useState } from 'react';
import { ShowBreadcrumbs } from '../../components/Global'
import { smoothScrollTop } from '../../utils/functions/global';
import Button from '../../components/Button';
import { useAxiosPost } from '../../utils/hooks/useAxios';
import { URL_ROOM_CREATE } from '../../variables/global';
import { useNavigate } from 'react-router-dom';

export default function Detail() {

    // HOOKS //
    const postDetailItemReq = useAxiosPost();
    const navigate = useNavigate();

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // FUNCTIONS SPECIFIC //
    function handleHostRDP() {

        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        postDetailItemReq.postData({
            endpoint: process.env.REACT_APP_SIGNALER_SERVICE,
            url: URL_ROOM_CREATE,
            data: {
                user: user,
            }
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, []);

    useEffect(() => {
        function handleRDPNavigation() {
            if (!postDetailItemReq.responseData.roomCode) return;
            navigate(`/rdp/room?roomCode=${postDetailItemReq.responseData.roomCode}`);
        }
        if (postDetailItemReq.responseStatus && postDetailItemReq.responseData) handleRDPNavigation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postDetailItemReq.responseData, postDetailItemReq.responseError, postDetailItemReq.responseStatus, postDetailItemReq.errorContent]);

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
                    <Button onClick={() => handleHostRDP()}>
                        host an RDP
                    </Button>
                </div>
            </div>
        </div>
    )
}
