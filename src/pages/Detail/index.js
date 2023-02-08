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
                <div className="detail-flex-container">
                    <div className="detail-flexbox detail-flexbox-pictures dark-bg-color">
                        <div className="detail-picture-box">
                            <img className="detail-picture" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                        </div>
                        <div className="detail-picture-box-options">
                            <img className="detail-picture-box-options-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-options-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-options-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-options-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                        </div>
                    </div>
                    <div className="detail-flexbox detail-flexbox-details dark-bg-color">
                        <h2 className="detail-title margin-top-bottom-0">THIS IS THE TITLE OF THE DETAIL</h2>
                        <p className="detail-count">Tersewa&nbsp;<span>35+</span>&nbsp;<img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" class="icon-star" alt="" /> 4.9 ( dari 11 rating )</p>
                        <h1 className="detail-pricetag">Rp.88.800</h1>
                        <hr className="max-width" />
                        <div className="detail-tabs">
                            <Button onClick={() => handleHostRDP()}>
                                Details
                            </Button>
                            <Button onClick={() => handleHostRDP()}>
                                Info Toko
                            </Button>
                            <Button onClick={() => handleHostRDP()}>
                                Ketentuan
                            </Button>
                        </div>
                        <hr className="max-width" />
                        <p className="detail-body-text margin-bottom-0">Kondisi: Baru</p>
                        <p className="detail-body-text margin-top-bottom-0">Berat Satuan: 150 g</p>
                        <p className="detail-body-text margin-top-bottom-0">Kategori: Lilin Aroma Terapi</p>
                        <p className="detail-body-text margin-top-0">Etalase: Semua Etalase</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!</p>
                        <hr className="max-width" />
                        <div className="detail-merchant">
                            <img className="detail-merchant-pfp" src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg" alt="Logo candelaacts" />
                            <div className="detail-merchant-profile" >
                                <h4 className="detail-body-text margin-top-bottom-0">Ricky The Seller</h4>
                                <p className="detail-body-text margin-top-0">Online 14 hari lalu</p>
                                <div className="detail-wrap-box">
                                    <p style={{ alignSelf: "center" }} className="margin-top-bottom-0">4.9 <img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" class="icon-star" alt="" /> Star</p>
                                    <Button style={{ marginLeft: "8px", backgroundColor: "red" }} className="margin-top-bottom-0" onClick={() => handleHostRDP()}>
                                        SELLER GESIT !
                                    </Button>
                                </div>
                            </div>
                            <Button className="detail-merchant-follow" onClick={() => handleHostRDP()}>
                                Follow
                            </Button>
                        </div>
                        <hr className="max-width" />
                        <h3 className="detail-title margin-bottom-0">Pemesanan</h3>
                        <p className="detail-body-text">Pesanan akan dikirim dari <span style={{ fontWeight: "bold" }}>Jakarta Utara</span></p>
                        <div className="detail-wrap-box">
                            <Button onClick={() => handleHostRDP()}>
                                Chat
                            </Button>
                            <Button style={{ marginLeft: "8px" }} onClick={() => handleHostRDP()}>
                                Lihat Pilihan kurir
                            </Button>
                        </div>
                        <hr className="max-width" />
                        <p className="detail-body-text">Ada kendala dengan seller ? <a style={{ fontWeight: "bold", cursor: "pointer" }}>Lapor aja !</a></p>
                    </div>
                    <div className="detail-flexbox detail-flexbox-pricing dark-bg-color">

                    </div>
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
