import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Button from "../../components/Button";
import ImageSlider from "../../components/ImageSlider";
import dummy from "../../config/json/development/carouselDummy.json";
import {
  handleError500,
  scrollCarousel,
  smoothScrollTop,
} from "../../utils/functions/global";
import { GET_BALANCE_TOOLS } from "../../variables/initial/home";
import WGLogo from "../../assets/svg/LIVEJB_V1_LOGO.svg";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  URL_GET_CATEGORIES,
  URL_GET_PRODUCT_LIST,
  URL_GET_SERVER_INFO,
  X_SID,
} from "../../variables/global";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { trackPromise } from "react-promise-tracker";
import { cookies } from "../../config/cookie";
import {
  ShowGrabableProductCardCarousel,
  ShowGrabableStoreCardCarousel,
  ShowGrabableCarouselCategoriesTag,
  ShowGridProductCardCarousel,
} from "./ModularComponents/ShowCarousels";

export default function Home() {
  // HOOK
  const navigate = useNavigate();
  const axiosService = useAxios();

  // REFS //
  const heroRef = useRef();
  const flashSaleRef = useRef();
  const officialStoreRef = useRef();
  const recommendRenderingCarouselRef = useRef();
  const recommendCarouselRef = useRef();
  const gridRefs = {};

  // STATES //
  const [flashSale, setFlashSale] = useState(null);
  const [recommendedCategories, setRecommendedCategories] =
    useState(null);
  const [recommendedProducts, setRecommendedProducts] =
    useState(null);
  const [officialStores, setOfficialStores] =
    useState(null);
  const [allProducts, setAllProducts] = useState(null);

  // VARIABLES //
  const defaultConfigs = {
    headers: {
      [AUTHORIZATION]: `Bearer ${
        cookies.get(CLIENT_USER_INFO, {
          path: "/",
        })?.credentialToken.accessToken
      }`,
      [X_SID]: cookies.get(CLIENT_USER_INFO, {
        path: "/",
      })?.sid,
    },
    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
  };

  // API ENDPOINTS
  // 1. flash sale endpoint
  // 2. recommendation categories endpoint
  // 3. recommendation products endpoint
  // 4. official store endpoint
  // 5. all products endpoint
  const endpoints = [
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&limit=7`,
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_CATEGORIES}`,
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&limit=7`,
    },
    {
      ...defaultConfigs,
      url: URL_GET_SERVER_INFO(`?limit=7&isWithFiles=true`),
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&isGrid=true&gridLimit=7`,
    },
  ];

  // FUNCTIONS SPECIFIC //
  async function handleInitialize() {
    await axiosService
      .getAllDataWithOnRequestInterceptors(
        endpoints,
        async () => {
          const result = await checkAuthAndRefresh(
            axiosService,
            cookies
          );
          return result;
        }
      )
      .then((res) => {
        if (res.responseData?.[0]?.responseStatus === 200)
          setFlashSale(res.responseData?.[0]?.responseData);
        if (res.responseData?.[1]?.responseStatus === 200)
          setRecommendedCategories(
            res.responseData?.[1]?.responseData
          );
        if (res.responseData?.[2]?.responseStatus === 200)
          setRecommendedProducts(
            res.responseData?.[2]?.responseData
          );
        if (res.responseData?.[3]?.responseStatus === 200)
          setOfficialStores(
            res.responseData?.[3]?.responseData
          );
        if (res.responseData?.[4]?.responseStatus === 200)
          setAllProducts(
            res.responseData?.[4]?.responseData
          );
      })
      .catch((error) => {
        if (error.responseStatus === 500) handleError500();
        if (IS_NOT_AUTHENTICATE(error))
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
      });
  }

  function handleScrollToFirstSection() {
    window.scrollTo({
      top: heroRef.current.offsetHeight,
      behavior: "smooth",
    });
  }

  // COMPONENTS SPECIFIC //
  const ShowTools = () => {
    return GET_BALANCE_TOOLS().map((items, index) => {
      return (
        <div
          key={`tool-${index}`}
          className="home-balance-box home-balance-tools-box main-bg-color">
          <h3 className="home-title-balance light-color">
            {items.name}
          </h3>
          <p className="home-desc-balance light-color">
            {items.desc}
          </p>
        </div>
      );
    });
  };

  // INITIAL RENDER
  useEffect(() => {
    // scroll to top on entering
    smoothScrollTop();
    // home page initialization
    // here we will check the user authentication first
    trackPromise(handleInitialize());
  }, []);

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div
          ref={heroRef}
          className="home-section home-hero-section darker-bg-color">
          <div className="home-hero-container justify-center">
            <img
              className="home-hero-title"
              src={WGLogo}
            />
            <label>
              Jualan? beli barang? sambil voice call aja
              negonya
            </label>
            <div
              onClick={() => handleScrollToFirstSection()}
              className="hero-round-button main-bg-color">
              <span className="hero-round-button-icon" />
            </div>
          </div>
        </div>
        <ImageSlider />
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            FLASH SALE
          </h3>
          <label className="home-recommend-subtitle light-color">
            Selesai setelah : 58:34:21 -{" "}
            <span className="cursor-pointer main-color">
              Lihat Lebih
            </span>
          </label>
          <div
            onMouseDown={(event) =>
              scrollCarousel(event, flashSaleRef.current)
            }
            className="home-carousel-wrapper"
            ref={flashSaleRef}>
            <ShowGrabableProductCardCarousel
              uniqueKey={"flash-sale"}
              navigate={navigate}
              values={flashSale}
            />
          </div>
        </div>
        <div className="home-element-container darker-bg-color">
          <div className="home-balance-wrapper">
            <div className="home-balance-box home-balance-counter-box dark-bg-color">
              <h2 className="home-title-balance light-color">
                Saldo Pengguna
              </h2>
              <label className="home-balance-number light-color">
                Rp. 1000.000
              </label>
              <p className="home-desc-balance light-color">
                Klik disini untuk lihat histori transaksi
              </p>
            </div>
            <div className="home-balance-tools">
              <ShowTools />
            </div>
          </div>
        </div>
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            KATEGORI TEREKOMENDASI
          </h3>
          <div
            onMouseDown={(event) =>
              scrollCarousel(
                event,
                recommendRenderingCarouselRef.current
              )
            }
            className="home-carousel-wrapper"
            ref={recommendRenderingCarouselRef}>
            <ShowGrabableCarouselCategoriesTag
              uniqueKey={"recommend-category"}
              values={recommendedCategories}
            />
          </div>
        </div>
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            REKOMENDASI UNTUK KAMU
          </h3>
          <label className="home-recommend-subtitle cursor-pointer main-color">
            Lihat Lebih
          </label>
          <div
            onMouseDown={(event) =>
              scrollCarousel(
                event,
                recommendCarouselRef.current
              )
            }
            className="home-carousel-wrapper"
            ref={recommendCarouselRef}>
            <ShowGrabableProductCardCarousel
              uniqueKey={"recommend-for-you"}
              navigate={navigate}
              values={recommendedProducts}
            />
          </div>
        </div>
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            TOKO OFFICIAL
          </h3>
          <label className="home-recommend-subtitle cursor-pointer main-color">
            Lihat Lebih
          </label>
          <div
            onMouseDown={(event) =>
              scrollCarousel(
                event,
                officialStoreRef.current
              )
            }
            className="home-carousel-wrapper"
            ref={officialStoreRef}>
            <ShowGrabableStoreCardCarousel
              uniqueKey={"official-stores"}
              navigate={navigate}
              values={officialStores}
            />
          </div>
        </div>
        <img
          className="home-fullwidth-img"
          src={dummy[1].url}
          alt="ads-2"></img>
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            PRODUK BARU
          </h3>
          <label className="home-recommend-subtitle ">
            Lihat semua produk baru yang tersedia -{" "}
            <span className="cursor-pointer main-color">
              Lihat Lebih
            </span>
          </label>
          <ShowGridProductCardCarousel
            uniqueKey={`home-new-product-grid`}
            gridRefs={gridRefs}
            navigate={navigate}
            values={allProducts}
          />
          <Button className="home-button home-grid-button">
            Lihat Lebih
          </Button>
        </div>
        <div className="home-company-section home-section">
          <div className="home-company-profile lighter-color">
            <h2 className="main-color">
              Kenapa sih pilih LIVEJB ?
            </h2>
            <p>
              Apakah Anda mencari platform all-in-one yang
              mengintegrasikan komunikasi, perdagangan, dan
              keterlibatan komunitas dengan lancar? Tidak
              perlu mencari lebih jauh daripada LIVEJB!
              Platform kami dirancang dengan Anda dalam
              pikiran, menawarkan berbagai fitur dan manfaat
              yang membuatnya pilihan yang sempurna untuk
              kebutuhan B2C Anda.
            </p>
            <h3>Terhubung Dengan Lancar</h3>
            <p>
              LIVEJB menyediakan aplikasi VoIP yang kuat,
              memungkinkan Anda tetap terhubung dengan
              pelanggan, mitra, dan pengguna Anda dengan
              mudah. Baik itu obrolan cepat atau diskusi
              panjang, layanan VoIP kami memastikan
              komunikasi yang jernih.
            </p>
            <h3>Beli dan Jual Dengan Mudah</h3>
            <p>
              Bosan dengan navigasi situs web berbeda untuk
              membeli dan menjual? Dengan LIVEJB, Anda dapat
              dengan mudah mencantumkan produk Anda,
              menemukan barang-barang baru, dan melakukan
              transaksi dengan mudah. Antarmuka yang ramah
              pengguna kami menyederhanakan proses ini,
              membuatnya mudah untuk mengelola bisnis online
              Anda.
            </p>
            <h3>Diskusi Dengan Suara</h3>
            <p>
              Tingkatkan interaksi Anda dengan LIVEJB
              melalui saluran suara. Terlibat dalam diskusi
              real-time tentang produk Anda, kumpulkan umpan
              balik, dan bangun rasa komunitas di antara
              pengguna Anda. Ini adalah tempat yang sempurna
              untuk memupuk kepercayaan dan loyalitas.
            </p>
            <h3>Aman dan Terjamin</h3>
            <p>
              Kepercayaan adalah hal yang penting dalam
              transaksi online. Itulah mengapa LIVEJB
              menjamin langkah-langkah keamanan terbaik
              untuk melindungi data dan transaksi Anda.
              Belanja dan berjualan dengan percaya diri,
              dengan mengetahui bahwa informasi Anda berada
              di tangan yang aman.
            </p>
          </div>
          <div className="home-company-profile lighter-color">
            <h2 className="main-color">
              Bagaimana LIVEJB Dapat Mengembangkan Bisnis
              Anda?
            </h2>
            <p>
              Apakah Anda siap untuk meningkatkan
              pertumbuhan bisnis Anda? LIVEJB adalah senjata
              rahasia Anda! Berikut cara platform kami dapat
              membantu Anda mengembangkan bisnis B2C Anda
              seperti belum pernah sebelumnya:
            </p>
            <h3>Jangkauan Se-Indonesia</h3>
            <p>
              Dengan LIVEJB, Anda tidak terbatas oleh
              batasan geografis. Capai audiens Se-Indonesia
              dan tembus ke pasar-pasar baru, memberikan
              bisnis Anda kehadiran di Indonesia.
            </p>
            <h3>Keterlibatan Pelanggan</h3>
            <p>
              Platform kami meningkatkan keterlibatan
              pelanggan dengan memfasilitasi diskusi suara
              real-time. Terlibat dengan audiens Anda secara
              langsung, jawab pertanyaan mereka, dan bangun
              basis pelanggan yang setia.
            </p>
            <h3>Penjualan Meningkat</h3>
            <p>
              Antarmuka yang ramah pengguna dan fitur
              e-commerce terintegrasi membuat lebih mudah
              daripada sebelumnya untuk memamerkan produk
              Anda. Nikmati peningkatan penjualan dan
              pendapatan saat Anda dengan mudah terhubung
              dengan calon pembeli.
            </p>
            <h3>Membangun Komunitas</h3>
            <p>
              Fosteringa rasa komunitas yang kuat di antara
              pengguna Anda melalui saluran suara kami.
              Dorong diskusi, kumpulkan umpan balik, dan
              bangun pengikut setia yang dapat menjadi
              pendukung merek.
            </p>
            <h3>Wawasan Berbasis Data</h3>
            <p>
              Akses data dan analisis berharga untuk
              memahami pelanggan Anda dengan lebih baik.
              Buat keputusan yang berdasarkan informasi,
              sesuaikan penawaran Anda, dan tetap unggul
              dari pesaing.
            </p>
            <h3>Operasi yang Tersusun</h3>
            <p>
              Kelola semua aspek bisnis B2C Anda dari satu
              platform. Dari komunikasi hingga penjualan dan
              pembangunan komunitas, LIVEJB menyederhanakan
              operasi Anda, menghemat waktu dan usaha Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
