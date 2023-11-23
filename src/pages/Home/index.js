import React, { Fragment, useEffect, useRef } from "react";
import "./style.scss";
import Button from "../../components/Button";
import ImageSlider from "../../components/ImageSlider";
import dummy from "../../config/json/development/carouselDummy.json";
import {
  scrollCarousel,
  smoothScrollTop,
} from "../../utils/functions/global";
import {
  GET_BALANCE_TOOLS,
  getGrid,
  getRecommended,
  getRecommendedGaming,
  getRecommendedGraphicRendering,
} from "../../variables/initial/home";
import Tag from "../../components/Tag";
import Card from "../../components/Card";
import WGLogo from "../../assets/svg/LIVEJB_V1_LOGO.svg";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  IS_OTP_VERIFIED,
} from "../../variables/global";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { trackPromise } from "react-promise-tracker";
import { cookies } from "../../config/cookie";

export default function Home() {
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
  async function handleInitialize() {
    const result = await checkAuthAndRefresh(
      credentialService,
      cookies
    );
    if (IS_NOT_AUTHENTICATE(result))
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
  }

  function handleScrollToFirstSection() {
    window.scrollTo({
      top: heroRef.current.offsetHeight,
      behavior: "smooth",
    });
  }

  function handleGoToDetail(navigate) {
    navigate(`/product-detail`);
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

  const ShowGrabableCarouselTag = (props) => {
    return props.arrayFunc().map((item, index) => {
      return (
        <Tag
          key={`carousel-${props.uniqueKey}-${index}`}
          text={item.name}
        />
      );
    });
  };

  const ShowGrabableCardCarousel = (props) => {
    return props.arrayFunc().map((item, index) => {
      return (
        <Card
          onClick={() => handleGoToDetail(navigate)}
          key={`carousel-${props.uniqueKey}-${index}`}
          imgUrl={item.url}
          title={item.name}
          location={item.location}
          price={item.price}
          desc={item.desc}
        />
      );
    });
  };

  const ShowGridCardCarousel = (props) => {
    return props.arrayFunc().map((item, index) => {
      return (
        <div
          key={`all-stores-${index}`}
          onMouseDown={(event) =>
            scrollCarousel(event, gridRefs[index])
          }
          className={
            "home-recommend-wrapper " + item.className
          }
          ref={(ref) => (gridRefs[index] = ref)}>
          <ShowGrabableCardCarousel
            uniqueKey={`all-stores-id-${index}`}
            arrayFunc={() => item.arrayFunc()}
          />
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
    if (IS_OTP_VERIFIED(login))
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
            className="home-recommend-wrapper"
            ref={flashSaleRef}>
            <ShowGrabableCardCarousel
              uniqueKey={"flash-sale"}
              arrayFunc={() => getRecommended()}
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
            className="home-recommend-wrapper"
            ref={recommendRenderingCarouselRef}>
            <ShowGrabableCarouselTag
              uniqueKey={"recommend-graphic-rendering"}
              arrayFunc={() =>
                getRecommendedGraphicRendering()
              }
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
            className="home-recommend-wrapper"
            ref={recommendCarouselRef}>
            <ShowGrabableCardCarousel
              uniqueKey={"recommend-for-you"}
              arrayFunc={() => getRecommended()}
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
            className="home-recommend-wrapper"
            ref={officialStoreRef}>
            <ShowGrabableCardCarousel
              uniqueKey={"official-stores"}
              arrayFunc={() => getRecommended()}
            />
          </div>
        </div>
        <img
          className="home-fullwidth-img"
          src={dummy[1].url}
          alt="ads-2"></img>
        <div className="home-element-container darker-bg-color">
          <h3 className="home-recommend-title light-color">
            SEMUA TOKO
          </h3>
          <label className="home-recommend-subtitle ">
            Lihat semua toko yang tersedia -{" "}
            <span className="cursor-pointer main-color">
              Lihat Lebih
            </span>
          </label>
          <ShowGridCardCarousel
            arrayFunc={() => getGrid()}
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
