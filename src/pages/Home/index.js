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
    scrollCarousel
} from '../../utils/functions/global';
import {
    getBalanceTools,
    getGrid, getRecommended,
    getRecommendedGaming,
    getRecommendedGraphicRendering
} from '../../variables/styles/home';
import Tag from '../../components/Tag';
import Card from '../../components/Card';

export default function Home() {

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

    // COMPONENTS SPECIFIC //
    const ShowTools = () => {
        return getBalanceTools().map((items, index) => {
            return <div key={`tool-${index}`} className="home-balance-box home-balance-tools-box main-bg-color">
                <h1 className="home-title-balance light-color">
                    {items.name}
                </h1>
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
            return <div key={'all-stores-' + `${index}`} onMouseDown={(event) => scrollCarousel(event, gridRefs[index])} className={"home-recommend-wrapper " + item.className} ref={ref => gridRefs[index] = ref}>
                <ShowGrabableCardCarousel uniqueKey={'all-stores-' + `id-${index}`} arrayFunc={() => item.arrayFunc()} />
            </div>
        })
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <div className="home-container">
                <div className="home-wrapper">
                    <div ref={heroRef} className="home-section home-hero-section darker-bg-color">
                        <div className="home-hero-container justify-center">
                            <h1>
                                WARUNK <span className="hero-span-text">GAMINK</span>
                            </h1>
                            <h3>
                                Butuh komputer cepet, high-end, high-res untuk keperluan rendering, gaming, kantor, atau apapun yang lu butuhin dengan spec tersebut ?
                            </h3>
                            <div onClick={() => handleScrollToFirstSection()} className="hero-round-button">
                                <p>
                                    Scroll
                                </p>
                                <h2>
                                    ↓
                                </h2>
                            </div>
                        </div>
                    </div>
                    <ImageSlider />
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            FLASH RENTAL
                        </h1>
                        <h3 className="home-recommend-subtitle light-color">
                            Counting countdown: 58:34:21 - <span className="cursor-pointer main-color">See more</span>
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, flashSaleRef.current)} className="home-recommend-wrapper home-first-recommend-wrapper" ref={flashSaleRef}>
                            <ShowGrabableCardCarousel uniqueKey={'flash-sale'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <div className="home-balance-wrapper">
                            <div className="home-balance-box home-balance-counter-box dark-bg-color">
                                <h1 className="home-title-balance dark-color">
                                    Balance
                                </h1>
                                <h3 className="home-balance-number dark-color">
                                    Rp. 1000.000
                                </h3>
                                <p className="home-desc-balance dark-color">
                                    Click here for billing
                                </p>
                            </div>
                            <div className="home-balance-tools">
                                <ShowTools />
                            </div>
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR GRAPHIC RENDERING
                        </h1>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendRenderingCarouselRef.current)} className="home-recommend-wrapper home-first-recommend-wrapper" ref={recommendRenderingCarouselRef}>
                            <ShowGrabableCarouselTag uniqueKey={'recommend-graphic-rendering'} arrayFunc={() => getRecommendedGraphicRendering()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR GAMING
                        </h1>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendGamingCarouselRef.current)} className="home-recommend-wrapper home-first-recommend-wrapper" ref={recommendGamingCarouselRef}>
                            <ShowGrabableCarouselTag uniqueKey={'recommend-gaming'} arrayFunc={() => getRecommendedGaming()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR YOU
                        </h1>
                        <h3 className="home-recommend-subtitle cursor-pointer main-color">
                            See more
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, recommendCarouselRef.current)} className="home-recommend-wrapper home-first-recommend-wrapper" ref={recommendCarouselRef}>
                            <ShowGrabableCardCarousel uniqueKey={'recommend-for-you'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            OFFICIAL STORES
                        </h1>
                        <h3 className="home-recommend-subtitle cursor-pointer main-color">
                            See more
                        </h3>
                        <div onMouseDown={(event) => scrollCarousel(event, officialStoreRef.current)} className="home-recommend-wrapper home-first-recommend-wrapper" ref={officialStoreRef}>
                            <ShowGrabableCardCarousel uniqueKey={'official-stores'} arrayFunc={() => getRecommended()} />
                        </div>
                    </div>
                    <img className="home-fullwidth-img" src={dummy[1].url} alt="ads-2"></img>
                    <div className="home-element-container darker-bg-color">
                        <h1 className="home-recommend-title light-color">
                            ALL STORES
                        </h1>
                        <h3 className="home-recommend-subtitle ">
                            Look for all available stores - <span className="cursor-pointer main-color">See more</span>
                        </h3>
                        <ShowGridCardCarousel arrayFunc={() => getGrid()} />
                        <Button className="home-button">See More</Button>
                    </div>
                    <div className="home-company-section home-section">
                        <div className="home-company-profile lighter-color justify-center">
                            <h1>
                                Kenapa sih pilih WG ?
                            </h1>
                            <h3>
                                Kategori Produk Terlengkap. Salah satu keunggulan yang bisa langsung dirasakan dengan belanja di Bukalapak adalah lengkapnya kategori produk. Halaman situs Bukalapak memiliki tampilan navigasi kategori barang untuk memudahkan pembeli dalam memilih produk yang dinginkan. Kategori tersedia lengkap mulai dari kebutuhan rumah tangga, elektronik rumah tangga, furniture rumah tangga, hingga gadget dan smartphone. Bukalapak juga dikenal baik sebagai toko online murah untuk kategori sepeda beserta aksesorisnya lengkap. Tidak hanya itu, tersedia juga produk fashion anak, pria, dan wanita, serta produk otomotif yang kini juga sudah tersedia dalam fitur BukaMobil.
                            </h3>
                            <h3>
                                Promo Meriah. Selain lengkapnya kategori produk yang tersedia, Bukalapak juga menawarkan harga promo menarik setiap harinya yang bisa Anda akses pada halaman promo. Terdapat banyak pilihan promo dengan masa berlaku yang beragam untuk berbagai produk, di antaranya promo smartphone hingga promo tiket kereta murah. Caranya juga sangat mudah, Anda hanya perlu memasukkan kode voucher atau kode promo yang sedang berlaku untuk produk yang Anda inginkan.
                            </h3>
                            <h3>
                                Virtual Product. Situs jual beli online Bukalapak juga menyediakan virtual product dalam bentuk e-voucher dan tiket, mulai dari tiket pesawat, tiket kereta, pulsa, paket data, tagihan listrik, token listrik, angsuran kredit, air PDAM, kartu prakerja hingga voucher game. Harga yang ditawarkan juga lebih murah dibandingkan toko lainnya sehingga belanja Anda lebih hemat. Tersedia juga fitur pembayaran zakat profesi yang bisa Anda bayarkan dengan sangat mudah dan praktis dengan bantuan kalkulator zakat untuk menghitung bayaran zakat yang sebaiknya dibayar.
                            </h3>
                            <h3>
                                Aman dan Terpercaya. Belanja online di Bukalapak tidak perlu khawatir tertipu dengan adanya jaminan 100% aman. Pembeli diberikan jaminan 100% uang kembali apabila produk yang sudah Anda bayar tidak kunjung tiba di tempat Anda. Tak jarang orang yang khawatir tertipu sehingga memilih untuk beli offline. Singkirkan segala keraguan belanja online dengan adanya jaminan uang aman 100% di Bukalapak.
                            </h3>
                            <h3>
                                Sistem Pembayaran Mudah. Situs belanja online terpercaya Bukalapak menawarkan beragam sistem pembayaran untuk memudahkan jual beli online Anda, di antaranya pembayaran yang praktis melalui BukaDompet, yakni dompet virtual yang bisa Anda isi dengan melakukan transfer sehingga memudahkan Anda dalam ativitas shoping setiap harinya di Bukalapak. Selain itu, ada juga pembayaran melalui bank transfer, instant payment melalui BCA KlikPay, Mandiri E-Cash, dan CIMB Clicks, serta sistem cicilan yang bisa Anda lakukan dengan kartu kredit dan juga cicilan Kredivo.
                            </h3>
                        </div>
                        <div className="home-company-profile lighter-color">
                            <h1>
                                Kembangin warnet kalian !
                            </h1>
                            <h3>
                                Kategori Produk Terlengkap. Salah satu keunggulan yang bisa langsung dirasakan dengan belanja di Bukalapak adalah lengkapnya kategori produk. Halaman situs Bukalapak memiliki tampilan navigasi kategori barang untuk memudahkan pembeli dalam memilih produk yang dinginkan. Kategori tersedia lengkap mulai dari kebutuhan rumah tangga, elektronik rumah tangga, furniture rumah tangga, hingga gadget dan smartphone. Bukalapak juga dikenal baik sebagai toko online murah untuk kategori sepeda beserta aksesorisnya lengkap. Tidak hanya itu, tersedia juga produk fashion anak, pria, dan wanita, serta produk otomotif yang kini juga sudah tersedia dalam fitur BukaMobil.
                            </h3>
                            <h3>
                                Promo Meriah. Selain lengkapnya kategori produk yang tersedia, Bukalapak juga menawarkan harga promo menarik setiap harinya yang bisa Anda akses pada halaman promo. Terdapat banyak pilihan promo dengan masa berlaku yang beragam untuk berbagai produk, di antaranya promo smartphone hingga promo tiket kereta murah. Caranya juga sangat mudah, Anda hanya perlu memasukkan kode voucher atau kode promo yang sedang berlaku untuk produk yang Anda inginkan.
                            </h3>
                            <h3>
                                Virtual Product. Situs jual beli online Bukalapak juga menyediakan virtual product dalam bentuk e-voucher dan tiket, mulai dari tiket pesawat, tiket kereta, pulsa, paket data, tagihan listrik, token listrik, angsuran kredit, air PDAM, kartu prakerja hingga voucher game. Harga yang ditawarkan juga lebih murah dibandingkan toko lainnya sehingga belanja Anda lebih hemat. Tersedia juga fitur pembayaran zakat profesi yang bisa Anda bayarkan dengan sangat mudah dan praktis dengan bantuan kalkulator zakat untuk menghitung bayaran zakat yang sebaiknya dibayar.
                            </h3>
                            <h3>
                                Aman dan Terpercaya. Belanja online di Bukalapak tidak perlu khawatir tertipu dengan adanya jaminan 100% aman. Pembeli diberikan jaminan 100% uang kembali apabila produk yang sudah Anda bayar tidak kunjung tiba di tempat Anda. Tak jarang orang yang khawatir tertipu sehingga memilih untuk beli offline. Singkirkan segala keraguan belanja online dengan adanya jaminan uang aman 100% di Bukalapak.
                            </h3>
                            <h3>
                                Sistem Pembayaran Mudah. Situs belanja online terpercaya Bukalapak menawarkan beragam sistem pembayaran untuk memudahkan jual beli online Anda, di antaranya pembayaran yang praktis melalui BukaDompet, yakni dompet virtual yang bisa Anda isi dengan melakukan transfer sehingga memudahkan Anda dalam ativitas shoping setiap harinya di Bukalapak. Selain itu, ada juga pembayaran melalui bank transfer, instant payment melalui BCA KlikPay, Mandiri E-Cash, dan CIMB Clicks, serta sistem cicilan yang bisa Anda lakukan dengan kartu kredit dan juga cicilan Kredivo.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}