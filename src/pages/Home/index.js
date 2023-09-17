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
  getBalanceTools,
  getGrid,
  getRecommended,
  getRecommendedGaming,
  getRecommendedGraphicRendering,
} from "../../variables/initial/home";
import Tag from "../../components/Tag";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/hooks/useAxios";
import { CLIENT_USER_INFO } from "../../variables/global";
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
    if (
      result.responseStatus === 401 ||
      result.responseStatus === 403
    )
      cookies.remove(CLIENT_USER_INFO, { path: "/" });
  }

  function handleScrollToFirstSection() {
    window.scrollTo({
      top: heroRef.current.offsetHeight,
      behavior: "smooth",
    });
  }

  function handleGoToDetail(navigate) {
    navigate(`/detail`);
  }

  // COMPONENTS SPECIFIC //
  const ShowTools = () => {
    return getBalanceTools().map((items, index) => {
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
    if (login) trackPromise(handleInitialize());
  }, []);

  return (
    <Fragment>
      <div className="home-container">
        <div className="home-wrapper">
          <div
            ref={heroRef}
            className="home-section home-hero-section darker-bg-color">
            <div className="home-hero-container justify-center">
              <h1>
                LIVE{" "}
                <span className="hero-span-text">JB</span>
              </h1>
              <label>
                Jualan? beli barang? sambil voice call aja
                negonya wkwkwk...
              </label>
              <div
                onClick={() => handleScrollToFirstSection()}
                className="hero-round-button">
                <span className="hero-round-button-icon" />
              </div>
            </div>
          </div>
          <ImageSlider />
          <div className="home-element-container darker-bg-color">
            <h2 className="home-recommend-title light-color">
              FLASH SALE
            </h2>
            <h3 className="home-recommend-subtitle light-color">
              Selesai setelah : 58:34:21 -{" "}
              <span className="cursor-pointer main-color">
                Lihat Lebih
              </span>
            </h3>
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
                <h1 className="home-title-balance light-color">
                  Saldo
                </h1>
                <h3 className="home-balance-number light-color">
                  Rp. 1000.000
                </h3>
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
            <h2 className="home-recommend-title light-color">
              REKOMENDASI UNTUK GRAPHIC RENDERING
            </h2>
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
            <h2 className="home-recommend-title light-color">
              REKOMENDASI UNTUK GAMING
            </h2>
            <div
              onMouseDown={(event) =>
                scrollCarousel(
                  event,
                  recommendGamingCarouselRef.current
                )
              }
              className="home-recommend-wrapper"
              ref={recommendGamingCarouselRef}>
              <ShowGrabableCarouselTag
                uniqueKey={"recommend-gaming"}
                arrayFunc={() => getRecommendedGaming()}
              />
            </div>
          </div>
          <div className="home-element-container darker-bg-color">
            <h2 className="home-recommend-title light-color">
              REKOMENDASI UNTUK KAMU
            </h2>
            <h3 className="home-recommend-subtitle cursor-pointer main-color">
              Lihat Lebih
            </h3>
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
            <h2 className="home-recommend-title light-color">
              TOKO OFFICIAL
            </h2>
            <h3 className="home-recommend-subtitle cursor-pointer main-color">
              Lihat Lebih
            </h3>
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
            <h2 className="home-recommend-title light-color">
              SEMUA TOKO
            </h2>
            <h3 className="home-recommend-subtitle ">
              Lihat semua toko yang tersedia -{" "}
              <span className="cursor-pointer main-color">
                Lihat Lebih
              </span>
            </h3>
            <ShowGridCardCarousel
              arrayFunc={() => getGrid()}
            />
            <Button className="home-button home-grid-button">
              Lihat Lebih
            </Button>
          </div>
          <div className="home-company-section home-section">
            <div className="home-company-profile lighter-color">
              <h1 className="main-color">
                Kenapa sih pilih LIVEJB ?
              </h1>
              <h3>
                Apakah Anda mencari platform all-in-one yang
                mengintegrasikan komunikasi, perdagangan,
                dan keterlibatan komunitas dengan lancar?
                Tidak perlu mencari lebih jauh daripada
                LIVEJB! Platform kami dirancang dengan Anda
                dalam pikiran, menawarkan berbagai fitur dan
                manfaat yang membuatnya pilihan yang
                sempurna untuk kebutuhan B2C Anda.
              </h3>
              <h2>Terhubung Dengan Lancar</h2>
              <h3>
                LIVEJB menyediakan aplikasi VoIP yang kuat,
                memungkinkan Anda tetap terhubung dengan
                pelanggan, mitra, dan pengguna Anda dengan
                mudah. Baik itu obrolan cepat atau diskusi
                panjang, layanan VoIP kami memastikan
                komunikasi yang jernih.
              </h3>
              <h2>Beli dan Jual Dengan Mudah</h2>
              <h3>
                Bosan dengan navigasi situs web berbeda
                untuk membeli dan menjual? Dengan LIVEJB,
                Anda dapat dengan mudah mencantumkan produk
                Anda, menemukan barang-barang baru, dan
                melakukan transaksi dengan mudah. Antarmuka
                yang ramah pengguna kami menyederhanakan
                proses ini, membuatnya mudah untuk mengelola
                bisnis online Anda.
              </h3>
              <h2>Diskusi Dengan Suara</h2>
              <h3>
                Tingkatkan interaksi Anda dengan LIVEJB
                melalui saluran suara. Terlibat dalam
                diskusi real-time tentang produk Anda,
                kumpulkan umpan balik, dan bangun rasa
                komunitas di antara pengguna Anda. Ini
                adalah tempat yang sempurna untuk memupuk
                kepercayaan dan loyalitas.
              </h3>
              <h2>Aman dan Terjamin</h2>
              <h3>
                Kepercayaan adalah hal yang penting dalam
                transaksi online. Itulah mengapa LIVEJB
                menjamin langkah-langkah keamanan terbaik
                untuk melindungi data dan transaksi Anda.
                Belanja dan berjualan dengan percaya diri,
                dengan mengetahui bahwa informasi Anda
                berada di tangan yang aman.
              </h3>
            </div>
            <div className="home-company-profile lighter-color">
              <h1 className="main-color">
                Bagaimana LIVEJB Dapat Mengembangkan Bisnis
                Anda?
              </h1>
              <h3>
                Apakah Anda siap untuk meningkatkan
                pertumbuhan bisnis Anda? LIVEJB adalah
                senjata rahasia Anda! Berikut cara platform
                kami dapat membantu Anda mengembangkan
                bisnis B2C Anda seperti belum pernah
                sebelumnya:
              </h3>
              <h2>Jangkauan Se-Indonesia</h2>
              <h3>
                Dengan LIVEJB, Anda tidak terbatas oleh
                batasan geografis. Capai audiens
                Se-Indonesia dan tembus ke pasar-pasar baru,
                memberikan bisnis Anda kehadiran di
                Indonesia.
              </h3>
              <h2>Keterlibatan Pelanggan</h2>
              <h3>
                Platform kami meningkatkan keterlibatan
                pelanggan dengan memfasilitasi diskusi suara
                real-time. Terlibat dengan audiens Anda
                secara langsung, jawab pertanyaan mereka,
                dan bangun basis pelanggan yang setia.
              </h3>
              <h2>Penjualan Meningkat</h2>
              <h3>
                Antarmuka yang ramah pengguna dan fitur
                e-commerce terintegrasi membuat lebih mudah
                daripada sebelumnya untuk memamerkan produk
                Anda. Nikmati peningkatan penjualan dan
                pendapatan saat Anda dengan mudah terhubung
                dengan calon pembeli.
              </h3>
              <h2>Membangun Komunitas</h2>
              <h3>
                Fosteringa rasa komunitas yang kuat di
                antara pengguna Anda melalui saluran suara
                kami. Dorong diskusi, kumpulkan umpan balik,
                dan bangun pengikut setia yang dapat menjadi
                pendukung merek.
              </h3>
              <h2>Wawasan Berbasis Data</h2>
              <h3>
                Akses data dan analisis berharga untuk
                memahami pelanggan Anda dengan lebih baik.
                Buat keputusan yang berdasarkan informasi,
                sesuaikan penawaran Anda, dan tetap unggul
                dari pesaing.
              </h3>
              <h2>Operasi yang Tersusun</h2>
              <h3>
                Kelola semua aspek bisnis B2C Anda dari satu
                platform. Dari komunikasi hingga penjualan
                dan pembangunan komunitas, LIVEJB
                menyederhanakan operasi Anda, menghemat
                waktu dan usaha Anda.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
