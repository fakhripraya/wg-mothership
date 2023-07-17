import React, {
    Fragment,
    useEffect,
    useRef
} from 'react';
import './style.scss';
import Button from '../../components/Button';
import ImageSlider from '../../components/ImageSlider';
import dummy from "../../config/json/development/carouselDummy.json";
import {
    scrollCarousel, smoothScrollTop
} from '../../utils/functions/global';
import {
    getBalanceTools,
    getGrid, getRecommended,
    getRecommendedGaming,
    getRecommendedGraphicRendering
} from '../../variables/dummy/home';
import Tag from '../../components/Tag';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../utils/hooks/useAxios';
import Cookies from 'universal-cookie';
import { CLIENT_USER_INFO } from '../../variables/global';
import { checkAuthAndRefresh } from '../../utils/functions/middlewares';
import { trackPromise } from 'react-promise-tracker';

export default function Home() {

    // OBJECT CLASSES
    const cookies = new Cookies();

    // VARIABLES //
    let login = cookies.get(CLIENT_USER_INFO);

    // HOOK
    const navigate = useNavigate();
    const credentialService = useAxios();

    // REFS //
    const heroRef = useRef();
    const flashSaleRef = useRef();
    const officialStoreRef = useRef();
    const recommendRenderingCarouselRef = useRef();
    const recommendGamingCarouselRef = useRef();
    const recommendCarouselRef = useRef();
    const gridRefs = {};

    // FUNCTIONS SPECIFIC //
    function handleScrollToFirstSection() {
        window.scrollTo({ top: heroRef.current.offsetHeight, behavior: "smooth" });
    }

    function handleGoToDetail(navigate) {
        navigate(`/detail`);
    }

    // COMPONENTS SPECIFIC //
    const ShowTools = () => {
        return getBalanceTools().map((items, index) => {
            return <div key={`tool-${index}`} className="home-balance-box home-balance-tools-box main-bg-color">
                <h3 className="home-title-balance light-color">
                    {items.name}
                </h3>
                <p className="home-desc-balance light-color">
                    {items.desc}
                </p>
            </div>
        })
    }

    const ShowGrabableCarouselTag = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <Tag key={`carousel-${props.uniqueKey}-${index}`} text={item.name} />
        })
    }

    const ShowGrabableCardCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <Card
                onClick={() => handleGoToDetail(navigate)}
                key={`carousel-${props.uniqueKey}-${index}`}
                imgUrl={item.url}
                title={item.name}
                location={item.location}
                price={item.price}
                desc={item.desc} />
        })
    }

    const ShowGridCardCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <div key={`all-stores-${index}`} onMouseDown={(event) => scrollCarousel(event, gridRefs[index])} className={"home-recommend-wrapper " + item.className} ref={ref => gridRefs[index] = ref}>
                <ShowGrabableCardCarousel uniqueKey={`all-stores-id-${index}`} arrayFunc={() => item.arrayFunc()} />
            </div>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        // scroll to top on entering
        smoothScrollTop();
        // check user auth
        async function checkUserAuth() {
            const result = await checkAuthAndRefresh(credentialService, cookies);
            if (result.responseStatus === 401 || result.responseStatus === 403) cookies.remove(CLIENT_USER_INFO, { path: '/' });
        }

        // home page init
        if (login) trackPromise(checkUserAuth());
    }, []);

    return (
        <Fragment>
            <div className="home-container">
                <div className="home-wrapper">
                    <div ref={heroRef} className="home-section home-hero-section darker-bg-color">
                        <div className="home-hero-container justify-center">
                            <h1>
                                OKSYEN <span className="hero-span-text">.ID</span>
                            </h1>
                            <label>
                                Mau cari barang langka atau barang - barang lainnya dengan harga dinamis? langsung cekidot aja yuk scroll kebawah !
                            </label>
                            <div onClick={() => handleScrollToFirstSection()} className="hero-round-button">
                                <label>
                                    Scroll
                                </label>
                            </div>
                        </div>
                    </div>
                    <ImageSlider />
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            FLASH BID
                        </h2>
                        <h3 className="home-recommend-subtitle light-color">
                            Selesai setelah : 58:34:21 - <span className="cursor-pointer main-color">Lihat Lebih</span>
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, flashSaleRef.current)} className="home-recommend-wrapper" ref={flashSaleRef}>
                            <ShowGrabableCardCarousel uniqueKey={'flash-sale'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <div className="home-balance-wrapper">
                            <div className="home-balance-box home-balance-counter-box dark-bg-color">
                                <h1 className="home-title-balance light-color">
                                    Saldo
                                </h1>
                                <h3 className="home-balance-number light-color">
                                    Rp. 1000.000
                                </h3>
                                <p className="home-desc-balance light-color">
                                    Klik disini untuk isi saldo
                                </p>
                            </div>
                            <div className="home-balance-tools">
                                <ShowTools />
                            </div>
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            REKOMENDASI UNTUK GRAPHIC RENDERING
                        </h2>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendRenderingCarouselRef.current)} className="home-recommend-wrapper" ref={recommendRenderingCarouselRef}>
                            <ShowGrabableCarouselTag uniqueKey={'recommend-graphic-rendering'} arrayFunc={() => getRecommendedGraphicRendering()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            REKOMENDASI UNTUK GAMING
                        </h2>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendGamingCarouselRef.current)} className="home-recommend-wrapper" ref={recommendGamingCarouselRef}>
                            <ShowGrabableCarouselTag uniqueKey={'recommend-gaming'} arrayFunc={() => getRecommendedGaming()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            REKOMENDASI UNTUK KAMU
                        </h2>
                        <h3 className="home-recommend-subtitle cursor-pointer main-color">
                            Lihat Lebih
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendCarouselRef.current)} className="home-recommend-wrapper" ref={recommendCarouselRef}>
                            <ShowGrabableCardCarousel uniqueKey={'recommend-for-you'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            TOKO OFFICIAL
                        </h2>
                        <h3 className="home-recommend-subtitle cursor-pointer main-color">
                            Lihat Lebih
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, officialStoreRef.current)} className="home-recommend-wrapper" ref={officialStoreRef}>
                            <ShowGrabableCardCarousel uniqueKey={'official-stores'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <img className="home-fullwidth-img" src={dummy[1].url} alt="ads-2"></img>
                    <div className="home-element-container darker-bg-color">
                        <h2 className="home-recommend-title light-color">
                            SEMUA TOKO
                        </h2>
                        <h3 className="home-recommend-subtitle ">
                            Lihat semua toko yang tersedia - <span className="cursor-pointer main-color">Lihat Lebih</span>
                        </h3>
                        <ShowGridCardCarousel arrayFunc={() => getGrid()} />
                        <Button className="home-button home-grid-button">Lihat Lebih</Button>
                    </div>
                    <div className="home-company-section home-section">
                        <div className="home-company-profile lighter-color">
                            <h1>
                                Kenapa sih pilih Oksyen ?
                            </h1>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                        </div>
                        <div className="home-company-profile lighter-color">
                            <h1>
                                Kembangin usaha kalian !
                            </h1>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                            <h3>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nostrum odit beatae inventore quia quidem sequi recusandae error ut quae repellendus optio cupiditate necessitatibus et, delectus velit pariatur dolor animi.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}