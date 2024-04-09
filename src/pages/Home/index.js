import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  GET_DUMMY_REELS,
} from "../../variables/initial/home";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  URL_GET_CATEGORIES,
  URL_GET_PRODUCT_LIST,
  URL_GET_STORE_INFO,
  X_SID,
} from "../../variables/global";
import { cookies } from "../../config/cookie";
import {
  ShowGrabableProductCardCarousel,
  ShowGrabableStoreCardCarousel,
  ShowGrabableCarouselCategoriesTag,
  ShowGridProductCardCarousel,
} from "./ModularComponents/ShowCarousels";
import TheVideo1 from "../../assets/testvid.mp4";
import TheVideo2 from "../../assets/testvid2.mp4";
import TheVideo3 from "../../assets/testvid3.mp4";
import TheVideo4 from "../../assets/testvid4.mp4";
import TheVideo5 from "../../assets/testvid5.mp4";
import CartIcon from "../../assets/svg/cart-icon.svg";
import ExitIcon from "../../assets/svg/caret-angle-down.svg";
import PauseIcon from "../../assets/svg/pause-button.svg";
import MuteIcon from "../../assets/svg/headphone-disabled.svg";
import UnmuteIcon from "../../assets/svg/headphone-enabled.svg";
import PFPPlaceholder from "../../assets/svg/profile-picture-placeholder.svg";
import FloatButton from "../../components/FloatButton";
import Avatar from "react-avatar";
import Footer from "./../../components/Footer";
import SliderRange from "../../components/SliderRange";
import { handleAddItemToCart } from "../../utils/functions/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  reelsButtonHiddenState,
  reelsButtonVisibleState,
} from "../../variables/styles/home";
import { trackPromise } from "react-promise-tracker";
import { useMap } from "../../utils/hooks/useMap";
import { cloneDeep } from "lodash-es";

export default function Home() {
  // HOOK
  const mapper = useMap();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosService = useAxios();

  // REFS //
  const flashSaleRef = useRef();
  const officialStoreRef = useRef();
  const recommendRenderingCarouselRef = useRef();
  const recommendCarouselRef = useRef();
  const gridRefs = {};

  // STATES //
  const [flashSale, setFlashSale] = useState(null);
  const [reelVideos, setReelVideos] = useState(null);
  const [reelIndex, setReelIndex] = useState(0);
  const [toggleScrollVideo, setToggleScrollVideo] =
    useState(true);
  const [isReelsbuttonShow, setIsReelsbuttonShow] =
    useState(false);
  const [isReelsLoaded, setIsReelsLoaded] = useState(false);
  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] =
    useState(false);
  const [isEverUnmute, setIsEverUnmute] = useState(false);
  const [isVideoAlwaysMuted, setIsVideoAlwaysMuted] =
    useState(true);
  const [playTimeout, setPlayTimeout] = useState(null);
  const [recommendedCategories, setRecommendedCategories] =
    useState(null);
  const [recommendedProducts, setRecommendedProducts] =
    useState(null);
  const [officialStores, setOfficialStores] =
    useState(null);
  const [newProducts, setNewProducts] = useState(null);

  // VARIABLES //
  const carouselLimit = 10;
  const overridingToggle = useSelector(
    (state) => state.navbar.overridingToggle
  );
  const cart = useSelector((state) => state.cart);
  const defaultConfigs = {
    headers: {
      [AUTHORIZATION]: `Bearer ${
        cookies.get(CLIENT_USER_INFO, {
          path: "/",
        })?.credentialToken?.accessToken
      }`,
      [X_SID]: cookies.get(CLIENT_USER_INFO, {
        path: "/",
      })?.sid,
    },
    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
  };

  // MEMOIZED VARIABLES //
  let newProductsMapped = useMemo(() => {
    const cloned = cloneDeep(newProducts);
    return mapper.splitArrayForGrid(
      cloned || [],
      carouselLimit
    );
  }, [newProducts]);

  // API ENDPOINTS
  // 1. flash sale endpoint
  // 2. recommendation categories endpoint
  // 3. recommendation products endpoint
  // 4. official store endpoint
  // 5. all products endpoint
  const endpoints = [
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&limit=${carouselLimit}`,
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_CATEGORIES}`,
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&limit=${carouselLimit}`,
    },
    {
      ...defaultConfigs,
      url: URL_GET_STORE_INFO(
        `?limit=${carouselLimit}&isWithFiles=true`
      ),
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true`,
    },
  ];

  // FUNCTIONS SPECIFIC //
  async function handleInitialize() {
    await axiosService
      .getAllData(endpoints)
      .then((res) => {
        if (res.responseData?.[0]?.responseStatus === 200)
          setFlashSale(
            res.responseData?.[0]?.responseData.result
          );
        if (res.responseData?.[1]?.responseStatus === 200)
          setRecommendedCategories(
            res.responseData?.[1]?.responseData
          );
        if (res.responseData?.[2]?.responseStatus === 200)
          setRecommendedProducts(
            res.responseData?.[2]?.responseData.result
          );
        if (res.responseData?.[3]?.responseStatus === 200)
          setOfficialStores(
            res.responseData?.[3]?.responseData
          );
        if (res.responseData?.[4]?.responseStatus === 200)
          setNewProducts(
            res.responseData?.[4]?.responseData.result
          );

        setReelVideos(GET_DUMMY_REELS);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleReelsInitialVideoLoad() {
    setIsReelsLoaded(true);
  }

  function handleScrollToFirstSection() {
    setToggleScrollVideo(false);
    setIsReelsbuttonShow(true);
    setIsVideoPlay(false);
  }

  function handleScrollToVideoReels() {
    window.location.href = "/";
  }

  function handleGoToCreativeStore(storeId) {
    if (storeId) navigate(`/creative-store?id=${storeId}`);
  }

  function handleLoadMoreNewProducts() {
    const newProductsCount = newProducts?.length || 0;
    trackPromise(
      axiosService
        .getData({
          ...endpoints[4],
          url: `${URL_GET_PRODUCT_LIST}?isWithFiles=true&isWithStoreInfo=true&limit=${carouselLimit}&offset=${Math.floor(
            newProductsCount / carouselLimit
          )}`,
        })
        .then((res) => {
          if (
            res.responseStatus === 200 &&
            res.responseData.masterCount > newProductsCount
          ) {
            const combinedArr = newProducts.concat(
              res.responseData.result
            );
            setNewProducts(combinedArr);
          }
        })
        .catch((error) => console.error(error))
    );
  }

  // COMPONENTS SPECIFIC //
  const ShowTools = () =>
    GET_BALANCE_TOOLS.map((items, index) => (
      <div
        key={`tool-${index}`}
        className="home-balance-box home-balance-tools-box main-bg-color">
        <p className="home-title-balance light-color font-bold">
          {items.name}
        </p>
        <p className="home-desc-balance light-color">
          {items.desc}
        </p>
      </div>
    ));

  // INITIAL RENDER
  useEffect(() => {
    const htmlDocument = document.querySelector("html");
    htmlDocument.style.setProperty("overflow-y", "hidden");
    // scroll to top on entering
    smoothScrollTop();
    // home page initialization
    // here we will check the user authentication first
    //trackPromise(handleInitialize());
    handleInitialize();

    // handle reels initial load events
    const currentVideoElement = document.getElementById(
      `home-reels-video-0`
    );
    currentVideoElement?.addEventListener(
      "loadeddata",
      handleReelsInitialVideoLoad
    );

    // load the first video
    currentVideoElement.load();

    function handleShowReelsButton() {
      if (window.scrollY >= 80) setIsReelsbuttonShow(false);
      else setIsReelsbuttonShow(true);
    }

    // Listen for the scroll event on the container
    window.addEventListener(
      "scroll",
      handleShowReelsButton
    );

    return () => {
      currentVideoElement?.removeEventListener(
        "loadeddata",
        handleReelsInitialVideoLoad
      );
      window.removeEventListener(
        "scroll",
        handleShowReelsButton
      );
    };
  }, []);

  useEffect(() => {
    const htmlDocument = document.querySelector("html");
    // take control of overflow-y from handleWindowScroll function in navbar
    if (toggleScrollVideo && overridingToggle === false)
      htmlDocument.style.setProperty(
        "overflow-y",
        "hidden"
      );
    else
      htmlDocument.style.setProperty(
        "overflow-y",
        "scroll"
      );
  }, [toggleScrollVideo, overridingToggle]);

  useEffect(() => {
    if (!isReelsLoaded) return;

    const reelsVideoContainer = document.getElementById(
      "home-reels-video-container"
    );
    if (reelsVideoContainer) {
      const currentVideoElement = document.getElementById(
        `home-reels-video-${reelIndex}`
      );

      function handleSnap() {
        // Calculate the current scroll snap item
        const scrollTop = reelsVideoContainer.scrollTop;
        const itemHeight = reelsVideoContainer.offsetHeight; // Assuming each item has the same width
        const currentScrollSnapItem = Math.round(
          scrollTop / itemHeight
        );

        if (reelIndex === currentScrollSnapItem) return;

        currentVideoElement.currentTime = 0;
        currentVideoElement.pause();
        clearInterval(playTimeout);
        setReelIndex(currentScrollSnapItem);
      }

      // Listen for the scroll event on the container
      reelsVideoContainer.addEventListener(
        "scroll",
        handleSnap
      );

      return () => {
        reelsVideoContainer.removeEventListener(
          "scroll",
          handleSnap
        );
      };
    }
  }, [reelIndex, isReelsLoaded]);

  useEffect(() => {
    if (!isReelsLoaded) return;

    const currentVideoElement = document.getElementById(
      `home-reels-video-${reelIndex}`
    );
    const reelsVideoDurationSlider =
      document.getElementById("reels-duration-slider");

    function handlePlay() {
      setPlayTimeout(() => {
        const interval = setInterval(() => {
          // select the element by ID, so we could get the current DOM state
          const selectedVideo = document.getElementById(
            `home-reels-video-${reelIndex}`
          );

          // Use a promise to handle the play action
          const playPromise = selectedVideo.play();

          // await the promise
          playPromise
            ?.then(() => {
              // Video successfully started playing
              setIsVideoPlay(true);
            })
            .catch((error) => {
              // Handle play promise rejection (usually due to autoplay restrictions)
              console.error(
                "Failed to play the video:",
                error
              );
              // You can provide a user-friendly message or take alternative actions
            });
        }, 500);
        return interval;
      });
    }

    function handlePause() {
      currentVideoElement.pause();
      clearInterval(playTimeout);
    }

    function handleSliderInteract() {
      currentVideoElement.pause();
      setIsVideoPlay(false);
    }

    function handleInput() {
      const sliderValue = reelsVideoDurationSlider.value;
      currentVideoElement.currentTime = sliderValue;
    }

    function handleUpdateSlider() {
      // Update the duration slider's value based on the current video time
      reelsVideoDurationSlider.value =
        currentVideoElement.currentTime;
      // Update the duration slider's max attribute based on the video duration
      reelsVideoDurationSlider.max =
        currentVideoElement.duration;
    }

    if (isVideoPlay) {
      //currentVideoElement.currentTime = 0;
      reelsVideoDurationSlider.value =
        currentVideoElement.currentTime;
      handlePlay();
    } else handlePause();

    // Update the duration slider and video playback position as the video plays
    currentVideoElement?.addEventListener(
      "timeupdate",
      handleUpdateSlider
    );
    reelsVideoDurationSlider?.addEventListener(
      "mousedown",
      handleSliderInteract
    );
    reelsVideoDurationSlider?.addEventListener(
      "touchstart",
      handleSliderInteract,
      { passive: true }
    );
    // Listen for the scroll event on the container
    reelsVideoDurationSlider?.addEventListener(
      "input",
      handleInput
    );
    reelsVideoDurationSlider?.addEventListener(
      "change",
      handlePlay
    );

    return () => {
      // Update the duration slider and video playback position as the video plays
      currentVideoElement?.removeEventListener(
        "timeupdate",
        handleUpdateSlider
      );
      reelsVideoDurationSlider?.removeEventListener(
        "mousedown",
        handleSliderInteract
      );
      reelsVideoDurationSlider?.removeEventListener(
        "touchstart",
        handleSliderInteract
      );
      // Listen for the scroll event on the container
      reelsVideoDurationSlider?.removeEventListener(
        "input",
        handleInput
      );
      reelsVideoDurationSlider?.removeEventListener(
        "change",
        handlePlay
      );
    };
  }, [reelIndex, isVideoPlay, isReelsLoaded]);

  useEffect(() => {
    if (!isReelsLoaded) return;

    const currentVideoElement = document.getElementById(
      `home-reels-video-${reelIndex}`
    );

    function handleTimeUpdate() {
      // This event fires continuously as the video progresses
      // Check if the video has reached a certain time to confirm active playback
      const currentVideoElement = document.getElementById(
        `home-reels-video-${reelIndex}`
      );

      const playThreshold = 0.1; // Adjust this value based on your needs
      if (currentVideoElement?.currentTime > playThreshold)
        setIsVideoPlaying(true);
      else setIsVideoPlaying(false);

      // Clear the interval when the video is actively playing

      if (isVideoPlaying && playTimeout)
        clearInterval(playTimeout);
    }

    currentVideoElement?.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    // Cleanup: Remove the event listeners when the component unmounts
    return () => {
      currentVideoElement?.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      // Clear the interval when the component unmounts
      if (playTimeout) clearInterval(playTimeout);
    };
  }, [
    playTimeout,
    reelIndex,
    isVideoPlaying,
    isReelsLoaded,
  ]);

  function handleGetVideoTest(index) {
    if (index === 0) return TheVideo1;
    if (index === 1) return TheVideo2;
    if (index === 2) return TheVideo3;
    if (index === 3) return TheVideo4;
    if (index === 4) return TheVideo5;
  }

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div
          className={`home-section home-hero-section darker-bg-color ${
            toggleScrollVideo
              ? ""
              : "home-video-section-hide"
          }`}>
          <div
            onClick={() => {
              if (isReelsLoaded)
                setIsVideoPlay(() => !isVideoPlay);
            }}
            id="home-reels-video-container"
            className="home-reels-container cursor-pointer">
            {GET_DUMMY_REELS.map((val, index) => {
              return (
                <video
                  id={`home-reels-video-${index}`}
                  key={`home-reels-video-${val.productId}-${index}`}
                  className="home-hero-reels-video"
                  playsInline
                  loop
                  muted={isVideoAlwaysMuted}
                  preload="auto"
                  type="video/mp4"
                  src={handleGetVideoTest(val.video)}
                />
              );
            })}
          </div>
          <div
            onClick={() => {
              if (isReelsLoaded) {
                setIsVideoPlay(() => !isVideoPlay);
                if (!isEverUnmute) {
                  setIsVideoAlwaysMuted(false);
                  setIsEverUnmute(true);
                }
              }
            }}
            className={`home-reels-overlay ${
              isVideoPlay ? "home-reels-overlay-played" : ""
            }`}>
            <div className="home-reels-overlay-content">
              <img
                className={`home-size-25 ${
                  !isReelsLoaded ? "display-none" : ""
                }`}
                alt="paused-icon"
                src={PauseIcon}
              />
              <label
                className={
                  isReelsLoaded ? "display-none" : ""
                }>
                Loading...
              </label>
            </div>
          </div>
          <div className="home-hero-container justify-center">
            <div className="home-hero-sidetools margin-bottom-12">
              <div className="home-sidetools-wrapper">
                <div
                  onClick={() => {
                    setIsVideoAlwaysMuted(
                      () => !isVideoAlwaysMuted
                    );
                  }}
                  className="home-hero-round-button transparent-bg-color">
                  <img
                    className={`home-size-20 ${
                      !isVideoAlwaysMuted
                        ? "display-none"
                        : ""
                    }`}
                    src={MuteIcon}
                    alt="home-hero-reels-mute-button"
                  />
                  <img
                    className={`home-size-20 ${
                      isVideoAlwaysMuted
                        ? "display-none"
                        : ""
                    }`}
                    src={UnmuteIcon}
                    alt="home-hero-reels-mute-button"
                  />
                </div>
                <div className="breakline" />
                <div
                  onClick={() =>
                    handleScrollToFirstSection()
                  }
                  className="home-hero-round-button transparent-bg-color">
                  <img
                    className="home-size-20"
                    src={ExitIcon}
                    alt="home-hero-reels-exit-button"
                  />
                </div>
              </div>
            </div>
            <div className="home-hero-maintools margin-bottom-12">
              <div className="home-maintools-wrapper">
                <div
                  onClick={() =>
                    handleAddItemToCart(
                      navigate,
                      dispatch,
                      cart,
                      reelVideos?.[reelIndex],
                      reelVideos?.[reelIndex]?.MasterFiles,
                      1,
                      ""
                    )
                  }
                  className="home-hero-round-button transparent-bg-color margin-bottom-8">
                  <img
                    className="home-size-30"
                    src={CartIcon}
                    alt="home-cart-icon"
                  />
                </div>
                <Avatar
                  onClick={() => {
                    handleGoToCreativeStore(
                      reelVideos?.[reelIndex]?.storeId
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  size={"60px"}
                  round={true}
                  title={
                    reelVideos?.[reelIndex]?.MasterStore
                      ?.storeName
                  }
                  name={
                    reelVideos?.[reelIndex]?.MasterStore
                      ?.storeName
                  }
                  src={
                    reelVideos?.[reelIndex]?.MasterStore
                      ?.storeName
                      ? `${process.env.REACT_APP_CHRONOS_SERVICE}${reelVideos?.[reelIndex]?.MasterStore?.MasterFiles?.[0]?.destination}`
                      : PFPPlaceholder
                  }
                  className="pointer-all"
                />
                <h3 className="margin-bottom-8">
                  {reelVideos?.[reelIndex]?.productName}
                </h3>
                <p className="margin-top-bottom-0">
                  <img
                    aria-hidden="true"
                    src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                    alt="home-star-icon"
                  />{" "}
                  {`4.9 / 5.0 - ${reelVideos?.[reelIndex]?.MasterStore?.storeName}`}
                </p>
                <p className="margin-top-bottom-0">
                  Lorem ipsum dolor sit amet consectetur
                </p>
                <label className="main-color home-maintools-seemore cursor-pointer font-bold">
                  See More
                </label>
              </div>
            </div>
            <SliderRange
              id="reels-duration-slider"
              className="pointer-all cursor-pointer main-color home-reels-video-control-slider"
              min={0}
              step={0.01}
            />
          </div>
        </div>
        <div
          className={`home-body-section ${
            toggleScrollVideo
              ? "home-body-section-hide"
              : ""
          }`}>
          <FloatButton
            style={
              isReelsbuttonShow
                ? reelsButtonVisibleState
                : reelsButtonHiddenState
            }
            onClick={() => handleScrollToVideoReels()}
            className="home-hero-reels-button main-bg-color">
            <p className="light-color">Reels</p>
          </FloatButton>
          <ImageSlider className="home-imageslider" />
          <div className="home-element-container darker-bg-color">
            <h3 className="home-recommend-title light-color">
              FLASH SALE
            </h3>
            <label className="home-recommend-subtitle light-color">
              Selesai setelah : 58:34:21 -{" "}
              <span
                onClick={() => navigate("/search")}
                className="cursor-pointer main-color">
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
                <h3 className="home-title-balance light-color">
                  Saldo Pengguna
                </h3>
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
              KATEGORI FAVORIT
            </h3>
            <label className="home-recommend-subtitle ">
              Kategori favorit pilihan kami yang pas buatmu
            </label>
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
                navigate={navigate}
                uniqueKey={"recommend-category"}
                values={recommendedCategories}
              />
            </div>
          </div>
          <div className="home-element-container darker-bg-color">
            <h3 className="home-recommend-title light-color">
              KHUSUS UNTUK KAMU
            </h3>
            <label className="home-recommend-subtitle ">
              Produk-produk berikut kita pilihin khusus
              untukmu lho! -
            </label>
            <label
              onClick={() => navigate("/search")}
              className="home-recommend-subtitle cursor-pointer main-color">
              &nbsp;Lihat Lebih
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
            <label className="home-recommend-subtitle ">
              Gaperlu repot nyari toko dengan performa yang
              baik -
            </label>
            <label
              onClick={() => navigate("/search")}
              className="home-recommend-subtitle cursor-pointer main-color">
              &nbsp;Lihat Lebih
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
              List produk baru yang mungkin membuatmu
              tertarik
            </label>
            <ShowGridProductCardCarousel
              uniqueKey={`home-new-product-grid`}
              gridRefs={gridRefs}
              navigate={navigate}
              values={newProductsMapped}
            />
            <Button
              onClick={handleLoadMoreNewProducts}
              className="home-button home-grid-button main-bg-color">
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
                mengintegrasikan komunikasi, perdagangan,
                dan keterlibatan komunitas dengan lancar?
                Tidak perlu mencari lebih jauh daripada
                LIVEJB! Platform kami dirancang dengan Anda
                dalam pikiran, menawarkan berbagai fitur dan
                manfaat yang membuatnya pilihan yang
                sempurna untuk kebutuhan B2C Anda.
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
                Bosan dengan navigasi situs web berbeda
                untuk membeli dan menjual? Dengan LIVEJB,
                Anda dapat dengan mudah mencantumkan produk
                Anda, menemukan barang-barang baru, dan
                melakukan transaksi dengan mudah. Antarmuka
                yang ramah pengguna kami menyederhanakan
                proses ini, membuatnya mudah untuk mengelola
                bisnis online Anda.
              </p>
              <h3>Diskusi Dengan Suara</h3>
              <p>
                Tingkatkan interaksi Anda dengan LIVEJB
                melalui saluran suara. Terlibat dalam
                diskusi real-time tentang produk Anda,
                kumpulkan umpan balik, dan bangun rasa
                komunitas di antara pengguna Anda. Ini
                adalah tempat yang sempurna untuk memupuk
                kepercayaan dan loyalitas.
              </p>
              <h3>Aman dan Terjamin</h3>
              <p>
                Kepercayaan adalah hal yang penting dalam
                transaksi online. Itulah mengapa LIVEJB
                menjamin langkah-langkah keamanan terbaik
                untuk melindungi data dan transaksi Anda.
                Belanja dan berjualan dengan percaya diri,
                dengan mengetahui bahwa informasi Anda
                berada di tangan yang aman.
              </p>
            </div>
            <div className="home-company-profile lighter-color">
              <h2 className="main-color">
                Bagaimana LIVEJB Dapat Mengembangkan Bisnis
                Anda?
              </h2>
              <p>
                Apakah Anda siap untuk meningkatkan
                pertumbuhan bisnis Anda? LIVEJB adalah
                senjata rahasia Anda! Berikut cara platform
                kami dapat membantu Anda mengembangkan
                bisnis B2C Anda seperti belum pernah
                sebelumnya:
              </p>
              <h3>Jangkauan Se-Indonesia</h3>
              <p>
                Dengan LIVEJB, Anda tidak terbatas oleh
                batasan geografis. Capai audiens
                Se-Indonesia dan tembus ke pasar-pasar baru,
                memberikan bisnis Anda kehadiran di
                Indonesia.
              </p>
              <h3>Keterlibatan Pelanggan</h3>
              <p>
                Platform kami meningkatkan keterlibatan
                pelanggan dengan memfasilitasi diskusi suara
                real-time. Terlibat dengan audiens Anda
                secara langsung, jawab pertanyaan mereka,
                dan bangun basis pelanggan yang setia.
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
                Fosteringa rasa komunitas yang kuat di
                antara pengguna Anda melalui saluran suara
                kami. Dorong diskusi, kumpulkan umpan balik,
                dan bangun pengikut setia yang dapat menjadi
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
                platform. Dari komunikasi hingga penjualan
                dan pembangunan komunitas, LIVEJB
                menyederhanakan operasi Anda, menghemat
                waktu dan usaha Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer forceShow={!toggleScrollVideo} />
    </div>
  );
}
