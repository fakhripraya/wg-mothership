import React, { useEffect } from 'react';
import './style.scss';
import { useState } from 'react';
import { ShowBreadcrumbs } from '../../components/Global'
import { smoothScrollTop } from '../../utils/functions/global';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import MinusIcon from '../../assets/svg/square-minus-solid.svg';
import PlusIcon from '../../assets/svg/square-plus-solid-green.svg';
import Accordion from '../../components/Accordion';
import { filterData } from '../../variables/dummy/detail';
import TextArea from '../../components/TextArea';

export default function Detail() {

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // COMPONENTS SPECIFIC //
    const ShowAccordions = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion key={`${props.uniqueKey}-accordion-${index}`} toggle={false} isButton={true} title={item.title} data={item.data} />
        })
    }

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
                <div className="detail-flex-container">
                    <div className="detail-flexbox detail-flexbox-pictures ">
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
                    <div className="detail-flexbox detail-flexbox-details ">
                        <h2 className="detail-title margin-top-bottom-0">lilin aromaterapi lemongrass/ sereh wangi - soy wax pengusir nyamuk</h2>
                        <br />
                        <p className="detail-count">Tersewa&nbsp;<span>35+</span></p>
                        <p className="detail-count"><img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" /> 4.9 ( dari 11 rating )</p>
                        <h1 className="detail-pricetag">Rp.88.800</h1>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <div className="detail-tabs">
                            <Button>
                                Details
                            </Button>
                            <Button>
                                Ketentuan
                            </Button>
                        </div>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <p className="detail-body-text margin-bottom-0">Kondisi: Baru</p>
                        <p className="detail-body-text margin-top-bottom-0">Berat Satuan: 150 g</p>
                        <p className="detail-body-text margin-top-bottom-0">Kategori: Lilin Aroma Terapi</p>
                        <p className="detail-body-text margin-top-0">Etalase: Semua Etalase</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!</p>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <div className="detail-merchant">
                            <img className="detail-pfp" src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg" alt="Logo candelaacts" />
                            <div className="detail-merchant-status" >
                                <h4 className="detail-body-text margin-top-bottom-0">Ricky The Seller</h4>
                                <p className="detail-body-text margin-top-0">Online 14 hari lalu</p>
                                <div className="detail-wrap-box">
                                    <p style={{ alignSelf: "center" }} className="margin-top-bottom-0">4.9 <img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" /> Star</p>
                                    <Button style={{ marginLeft: "8px", backgroundColor: "red" }} className="margin-top-bottom-0">
                                        SELLER GESIT !
                                    </Button>
                                </div>
                            </div>
                            <Button className="detail-merchant-follow">
                                Follow
                            </Button>
                        </div>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <h3 className="detail-title margin-bottom-0">Pemesanan</h3>
                        <p className="detail-body-text">Pesanan akan dikirim dari <span style={{ fontWeight: "bold" }}>Jakarta Utara</span></p>
                        <div className="detail-wrap-box">
                            <Button>
                                Chat
                            </Button>
                            <Button style={{ marginLeft: "8px" }}>
                                Lihat Pilihan kurir
                            </Button>
                        </div>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <p className="detail-body-text">Ada kendala dengan seller ? <a className="main-color" style={{ fontWeight: "bold", cursor: "pointer" }}>Lapor aja !</a></p>
                    </div>
                    <div className="detail-flexbox detail-flexbox-pricing">
                        <h1 className="detail-title margin-top-bottom-0">Pesan</h1>
                        <br />
                        <h3 className="detail-title margin-top-bottom-0">Jumlah Pembelian</h3>
                        <div style={{ marginBottom: "8px" }} className="detail-flexbox-pricing-rowbox">
                            <TextInput className="detail-flexbox-pricing-count-area"></TextInput>
                            <img className="detail-flexbox-pricing-count-button" src={PlusIcon} alt={"plus-icon"} />
                            <img className="detail-flexbox-pricing-count-button" src={MinusIcon} alt={"minus-icon"} />
                        </div>
                        <br />
                        <h3 className="detail-title margin-top-bottom-0">Masukan Catatan Bila Ada</h3>
                        <TextArea className="detail-flexbox-pricing-longtext-area"></TextArea>
                        <div className="detail-flexbox-pricing-rowbox">
                            <h2 className="detail-title margin-top-0">Subtotal</h2>
                            <h2 className="detail-title margin-top-0">Rp.88.000</h2>
                        </div>
                        <Button className="main-bg-color">
                            Masukkan Keranjang
                        </Button>
                        <br />
                        <Button className="main-bg-color">
                            Langsung Pesan
                        </Button>
                        <br />
                        <div className="detail-flexbox-pricing-other">
                            <Button style={{ marginRight: "8px" }} className="detail-button-outlined darker-bg-color full-width">
                                Chat
                            </Button>
                            <Button className="detail-button-outlined darker-bg-color full-width">
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="detail-flex-container">
                    <div className="detail-flexbox detail-flexbox-filter ">
                        <h1 className="detail-title margin-top-bottom-0">Review Barang</h1>
                        <div className="detail-review-rating">
                            <img style={{ height: "36px", width: "36px", marginRight: "8px" }} aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" />
                            <p style={{ fontSize: "72px" }} >4.9 </p>
                            <p style={{ fontSize: "72px" }} >/</p>
                            <p style={{ fontSize: "36px" }} >5.0</p>
                        </div>
                        <p className="detail-body-text margin-top-0">100% peminjam merasa puas</p>
                        <p className="detail-body-text margin-top-0">11 rating • 9 ulasan</p>
                        <br />
                        <ShowAccordions uniqueKey="filter-rating" datas={filterData} />
                    </div>
                    <div className="detail-flexbox detail-flexbox-review ">
                        <h1 className="detail-title margin-top-0">Foto Review Dari Peminjam</h1>
                        <div className="detail-picture-box-review">
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                            <img className="detail-picture-box-review-item" src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g" />
                        </div>
                        <hr style={{ opacity: 0.1 }} className="max-width" />
                        <h1 className="detail-title margin-bottom-0">Review Dari Peminjam</h1>
                        <p className="detail-body-text margin-top-0">Menampilkan 9 ulasan dari 9</p>
                        <div className="detail-comment">
                            <img className="detail-pfp" src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg" alt="Logo candelaacts" />
                            <div className="detail-comment-status" >
                                <h4 className="detail-body-text margin-top-bottom-0">Ricky The Seller</h4>
                                <p className="detail-body-text margin-top-0">Online 14 hari lalu</p>
                                <div className="detail-wrap-box">
                                    <p style={{ alignSelf: "center" }} className="margin-top-bottom-0">4.9 <img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" /> Star</p>
                                </div>
                            </div>
                        </div>
                        <p className="detail-comment-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!</p>
                        <br />
                        <div className="detail-comment">
                            <img className="detail-pfp" src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg" alt="Logo candelaacts" />
                            <div className="detail-comment-status" >
                                <h4 className="detail-body-text margin-top-bottom-0">Ricky The Seller</h4>
                                <p className="detail-body-text margin-top-0">Online 14 hari lalu</p>
                                <div className="detail-wrap-box">
                                    <p style={{ alignSelf: "center" }} className="margin-top-bottom-0">4.9 <img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" /> Star</p>
                                </div>
                            </div>
                        </div>
                        <p className="detail-comment-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!</p>
                        <br />
                        <div className="detail-comment">
                            <img className="detail-pfp" src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg" alt="Logo candelaacts" />
                            <div className="detail-comment-status" >
                                <h4 className="detail-body-text margin-top-bottom-0">Ricky The Seller</h4>
                                <p className="detail-body-text margin-top-0">Online 14 hari lalu</p>
                                <div className="detail-wrap-box">
                                    <p style={{ alignSelf: "center" }} className="margin-top-bottom-0">4.9 <img aria-hidden="true" src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg" alt="" /> Star</p>
                                </div>
                            </div>
                        </div>
                        <p className="detail-comment-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!</p>
                    </div>
                </div>
                <Button style={{ marginTop: "8px" }}>
                    Load More Review
                </Button>
            </div>
        </div>
    )
}
