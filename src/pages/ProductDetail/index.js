import React, { Fragment, useEffect } from "react";
import "./style.scss";
import { useState } from "react";
import { ShowBreadcrumbs } from "../../components/Global";
import {
  acceptNumericOnly,
  formattedNumber,
  handleError500,
  handleErrorMessage,
  handleOpenOverridingHome,
  sendWACS,
  smoothScrollTop,
} from "../../utils/functions/global";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Accordion from "../../components/Accordion";
import { PRODUCT_DETAIL_FILTER_DATA_OPTIONS } from "../../variables/initial/productDetail";
import TextArea from "../../components/TextArea";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  CLIENT_USER_INFO,
  LOGIN,
  PRODUCT_CATALOGUE_ADDITIONAL_FILES,
  PRODUCT_CATALOGUE_IMAGE,
  URL_GET_PRODUCT_DETAILS,
} from "../../variables/global";
import { cookies } from "../../config/cookie";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import ErrorHandling from "../ErrorHandling";
import { NO_PRODUCT_FOUND } from "../../variables/errorMessages/productDetail";
import { ShowCourierModal } from "./ModularComponents/ShowModal";
import Modal from "../../components/Modal";
import { handleAddItemToCart } from "../../utils/functions/cart";
import { MAX_BUY_QTY_TRESHOLD } from "../../variables/constants/productDetail";

export default function ProductDetail() {
  // HOOKS //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const zeusService = useAxios();
  // eslint-disable-next-line no-unused-vars
  const [searchParams] = useSearchParams();

  // STATES //
  const [selectedTab, setSelectedTab] = useState(0);
  const [
    toggleCourierListModal,
    setToggleCourierListModal,
  ] = useState(false);
  const [productData, setProductData] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [productDocuments, setProductDocuments] =
    useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [buyQty, setBuyQty] = useState(0);
  const [buyingNote, setBuyingNote] = useState("");
  const [modalToggle, setModalToggle] = useState(false);
  const [, setErrorMessage] = useState(null);
  const [productId] = useState(
    searchParams.get("productId")
  );

  // VARIABLES //
  const cart = useSelector((state) => state.cart);
  const zeusDefaultConfigs = {
    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
  };

  // FUNCTIONS SPECIFIC //
  function handleGoToCreativeStore() {
    if (productData)
      navigate(
        `/creative-store?id=${productData.MasterStoreCatalogue.MasterStore.id}`
      );
  }

  function handleChangeTab(tab) {
    setSelectedTab(tab);
  }

  function handleToggleCourierListModal() {
    setToggleCourierListModal((val) => !val);
  }

  // COMPONENTS SPECIFIC //
  const ShowAccordions = (props) => {
    return props.datas.map((item, index) => {
      return (
        <Accordion
          className="detail-accordion"
          key={`${props.uniqueKey}-accordion-${index}`}
          toggle={false}
          isButton={true}
          title={item.title}
          data={item.data}
        />
      );
    });
  };

  const ShowDetails = () => {
    return (
      <div className="detail-top-body-container">
        <p className="detail-body-text margin-bottom-0 font-bold">
          <span className="light-color">
            Kondisi:&nbsp;
          </span>
          <span className="main-color">
            {productData?.productCondition}
          </span>
        </p>
        <p className="detail-body-text margin-top-bottom-0 font-bold">
          <span className="light-color">
            Berat Satuan:&nbsp;
          </span>
          <span className="main-color">
            {productData?.productWeight}
            &nbsp;
            {productData?.productWeightUnit}
          </span>
        </p>
        <p className="detail-body-text margin-top-bottom-0 font-bold">
          <span className="light-color">
            Kategori:&nbsp;
          </span>
          <span className="main-color">
            {productData &&
              productData.MasterCategory.categoryName}
          </span>
        </p>
        <p className="detail-body-text margin-top-0 font-bold">
          <span className="light-color">
            Katalog:&nbsp;
          </span>
          <span className="main-color">
            {productData &&
              productData.MasterStoreCatalogue
                .catalogueName}
          </span>
        </p>
        <p style={{ whiteSpace: "pre-line" }}>
          {productData?.productDescription}
        </p>
      </div>
    );
  };

  const ShowDocuments = () => {
    return (
      productDocuments &&
      productDocuments.length > 0 && (
        <div className="detail-top-body-container">
          <span>No Document Found</span>
        </div>
      )
    );
  };

  const ShowImportantInfo = () => {
    return (
      <div className="detail-top-body-container">
        <section>
          <span>No Document Found</span>
        </section>
        <section>
          <span>No Document Found</span>
        </section>
      </div>
    );
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
    trackPromise(
      (async () => {
        await zeusService
          .getData({
            ...zeusDefaultConfigs,
            url: URL_GET_PRODUCT_DETAILS(productId),
          })
          .then((res) => {
            if (!res.responseData.result) return;

            const dummyBreadcrumb = [
              "Home",
              res.responseData.result.MasterCategory
                .categoryName,
              res.responseData.result.MasterStoreCatalogue
                .MasterStore.storeName,
              res.responseData.result.MasterStoreCatalogue
                .catalogueName,
              res.responseData.result.productName,
            ];

            const tempProductData = {
              ...res.responseData.result,
              breadcrumbs: dummyBreadcrumb,
            };

            // map files between images and documents
            let tempImages = [];
            let tempDocuments = [];
            tempProductData.MasterFiles.forEach((file) => {
              if (file.fileType === PRODUCT_CATALOGUE_IMAGE)
                tempImages.push(file);
              else if (
                file.fileType ===
                PRODUCT_CATALOGUE_ADDITIONAL_FILES
              )
                tempDocuments.push(file);
            });

            setProductImages([...tempImages]);
            setProductDocuments([...tempDocuments]);
            setProductData({ ...tempProductData });
          })
          .catch((error) => {
            if (error.responseStatus === 500)
              handleError500();
            if (
              error.responseStatus === 401 ||
              error.responseStatus === 403
            ) {
              cookies.remove(CLIENT_USER_INFO, {
                path: "/",
              });
              handleOpenOverridingHome(LOGIN);
            } else
              handleErrorMessage(
                error,
                setErrorMessage,
                setModalToggle,
                modalToggle
              );
          })
          .finally(() => {
            setIsFetched(true);
          });
      })()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetched && !productData)
    return (
      <ErrorHandling errorMessage={NO_PRODUCT_FOUND}>
        <Button
          className="margin-top-12-18 "
          onClick={() => (window.location.href = "/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={handleToggleCourierListModal}
        toggle={toggleCourierListModal}>
        <ShowCourierModal
          handleOpenModal={handleToggleCourierListModal}
          productData={productData}
        />
      </Modal>
      <div className="detail-container">
        <div className="detail-wrapper">
          <div className="detail-breadcrumbs">
            {productData && (
              <ShowBreadcrumbs
                trails={productData.breadcrumbs}
              />
            )}
          </div>
          <div className="detail-flex-container">
            <div className="detail-flexbox detail-flexbox-pictures ">
              <div className="detail-picture-box">
                {productImages && (
                  <img
                    className="detail-picture"
                    alt={productImages?.[0]?.filename}
                    src={`${process.env.REACT_APP_CHRONOS_SERVICE}${productImages?.[0]?.destination}`}
                  />
                )}
              </div>
              <div className="detail-picture-box-options">
                {productImages?.map((file, index) => {
                  return (
                    index !== 0 && (
                      <img
                        key={`detail-picture-box-options-${index}`}
                        className="detail-picture-box-options-item"
                        alt={file.filename}
                        src={`${process.env.REACT_APP_CHRONOS_SERVICE}${file.destination}`}
                      />
                    )
                  );
                })}
              </div>
            </div>
            <div className="detail-flexbox detail-flexbox-details ">
              <h3 className="detail-title margin-top-bottom-0">
                {productData?.productName}
              </h3>
              <div className="breakline" />
              <p className="detail-count">
                Tersewa&nbsp;<span>35+</span>
              </p>
              <p className="detail-count">
                <img
                  aria-hidden="true"
                  src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                  alt=""
                />{" "}
                4.9 ( dari 11 rating )
              </p>
              <h2 className="detail-pricetag">
                {productData &&
                  `Rp.${formattedNumber(
                    productData.productPrice
                  )}`}
              </h2>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <div className="detail-tabs">
                <Button
                  onClick={() => handleChangeTab(0)}
                  className={`${
                    selectedTab === 0 && "main-color"
                  } transparent-bg-color font-bold`}>
                  Details
                </Button>
                {productDocuments &&
                  productDocuments.length > 0 && (
                    <Button
                      onClick={() => handleChangeTab(1)}
                      className={`${
                        selectedTab === 1 && "main-color"
                      } transparent-bg-color font-bold`}>
                      Dokumen
                    </Button>
                  )}
                <Button
                  onClick={() => handleChangeTab(2)}
                  className={`${
                    selectedTab === 2 && "main-color"
                  } transparent-bg-color font-bold`}>
                  Penting
                </Button>
              </div>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              {selectedTab === 0 && <ShowDetails />}
              {selectedTab === 1 && <ShowDocuments />}
              {selectedTab === 2 && <ShowImportantInfo />}
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <div className="detail-merchant">
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleGoToCreativeStore();
                  }}
                  size={"60px"}
                  round={true}
                  src={`${process.env.REACT_APP_CHRONOS_SERVICE}${productData?.MasterStoreCatalogue?.MasterStore?.MasterFiles?.[0]?.destination}`}
                  title={
                    productData?.MasterStoreCatalogue
                      ?.MasterStore?.MasterFiles?.[0]
                      ?.filename ||
                    productData?.MasterStoreCatalogue
                      ?.MasterStore?.storeName
                  }
                  name={
                    productData?.MasterStoreCatalogue
                      ?.MasterStore?.MasterFiles?.[0]
                      ?.filename ||
                    productData?.MasterStoreCatalogue
                      ?.MasterStore?.storeName
                  }
                />
                <div className="detail-merchant-status">
                  <p className="detail-body-text margin-top-bottom-0 font-bold">
                    {productData &&
                      productData.MasterStoreCatalogue
                        .MasterStore.storeName}
                  </p>
                  <p className="detail-body-text margin-top-0">
                    Online 14 hari lalu
                  </p>
                  <div className="detail-wrap-box">
                    <p
                      style={{ alignSelf: "center" }}
                      className="margin-top-bottom-0">
                      4.9&nbsp;
                      <img
                        aria-hidden="true"
                        src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                        alt=""
                      />
                      &nbsp;Star
                    </p>
                    <Button
                      style={{
                        marginLeft: "8px",
                        backgroundColor: "red",
                      }}
                      className="margin-top-bottom-0">
                      SELLER GESIT !
                    </Button>
                  </div>
                </div>
                <Button className="detail-merchant-follow">
                  Follow
                </Button>
              </div>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <h3 className="detail-title margin-bottom-0">
                Pemesanan
              </h3>
              <p className="detail-body-text">
                Pesanan akan dikirim dari&nbsp;
                <span style={{ fontWeight: "bold" }}>
                  {productData &&
                    `${productData.MasterStoreCatalogue.MasterStore.storeVillage} - ${productData.MasterStoreCatalogue.MasterStore.storeDistrict} - ${productData.MasterStoreCatalogue.MasterStore.storeRegency} - ${productData.MasterStoreCatalogue.MasterStore.storeProvince}`}
                </span>
              </p>
              <div className="detail-wrap-box">
                <Button
                  onClick={() => {
                    handleGoToCreativeStore();
                  }}>
                  Chat
                </Button>
                <Button
                  onClick={handleToggleCourierListModal}
                  style={{ marginLeft: "8px" }}>
                  Lihat Pilihan kurir
                </Button>
              </div>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <p className="detail-body-text">
                Ada kendala dengan seller ?&nbsp;
                <a
                  onClick={() => {
                    sendWACS();
                  }}
                  className="main-color"
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  Lapor aja !
                </a>
              </p>
            </div>
            <div className="detail-flexbox detail-flexbox-pricing">
              <h3 className="detail-title margin-top-bottom-0">
                Pesan
              </h3>
              <div className="breakline" />
              <p className="detail-title margin-top-bottom-0 font-bold">
                Jumlah Pembelian
              </p>
              <div
                style={{ marginBottom: "8px" }}
                className="detail-flexbox-pricing-rowbox">
                <TextInput
                  value={formattedNumber(buyQty)}
                  onChange={(e) => {
                    let temp = acceptNumericOnly(
                      e.target.value
                    );

                    if (!temp) temp = 0;
                    if (temp > MAX_BUY_QTY_TRESHOLD)
                      temp =
                        MAX_BUY_QTY_TRESHOLD.toString();
                    return setBuyQty(temp);
                  }}
                  className="detail-flexbox-pricing-count-area"
                />
                <Button>Buah</Button>
              </div>
              <div className="breakline" />
              <p className="detail-title margin-top-bottom-0 font-bold">
                Masukan Catatan Bila Ada
              </p>
              <TextArea
                value={buyingNote}
                onChange={(e) =>
                  setBuyingNote(e.target.value)
                }
                className="detail-flexbox-pricing-longtext-area"
              />
              <div className="detail-flexbox-pricing-rowbox">
                <h3 className="detail-title margin-top-0">
                  Subtotal&nbsp;
                </h3>
                <h3 className="detail-title margin-top-0">
                  {productData &&
                    `Rp.${formattedNumber(
                      productData.productPrice * buyQty
                    )}`}
                </h3>
              </div>
              <Button
                onClick={() =>
                  handleAddItemToCart(
                    navigate,
                    dispatch,
                    cart,
                    productData,
                    productImages,
                    buyQty,
                    buyingNote
                  )
                }
                className="main-bg-color">
                Masukkan Keranjang
              </Button>
              <div className="breakline" />
              <Button className="main-bg-color">
                Langsung Pesan
              </Button>
              <div className="breakline" />
              <div className="detail-flexbox-pricing-other">
                <Button
                  onClick={() => {
                    handleGoToCreativeStore();
                  }}
                  style={{ marginRight: "8px" }}
                  className="detail-button-outlined darker-bg-color full-width">
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
              <h3 className="detail-title margin-top-bottom-0">
                Review Barang
              </h3>
              <div className="detail-review-rating">
                <img
                  style={{
                    height: "36px",
                    width: "36px",
                    marginRight: "8px",
                  }}
                  aria-hidden="true"
                  src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                  alt="product-detail-star-icon"
                />
                <p style={{ fontSize: "72px" }}>4.9 </p>
                <p style={{ fontSize: "72px" }}>/</p>
                <p style={{ fontSize: "36px" }}>5.0</p>
              </div>
              <p className="detail-body-text margin-top-0">
                100% Pembeli merasa puas
              </p>
              <p className="detail-body-text margin-top-0">
                11 rating • 9 ulasan
              </p>
              <div className="breakline" />
              <ShowAccordions
                uniqueKey="filter-rating"
                datas={PRODUCT_DETAIL_FILTER_DATA_OPTIONS}
              />
            </div>
            <div className="detail-flexbox detail-flexbox-review ">
              <h3 className="detail-title margin-top-0">
                Foto Review Dari Pembeli
              </h3>
              <div className="detail-picture-box-review">
                <img
                  className="detail-picture-box-review-item"
                  alt="rvw-1"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  alt="rvw-2"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  alt="rvw-3"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  alt="rvw-4"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  alt="rvw-5"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
              </div>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <h3 className="detail-title margin-bottom-0">
                Review Dari Pembeli
              </h3>
              <p className="detail-body-text margin-top-0">
                Menampilkan 9 ulasan dari 9
              </p>
              <div className="detail-comment">
                <img
                  className="detail-pfp"
                  src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg"
                  alt="Logo candelaacts"
                />
                <div className="detail-comment-status">
                  <p className="detail-body-text margin-top-bottom-0 font-bold">
                    Ricky The Seller
                  </p>
                  <p className="detail-body-text margin-top-0">
                    Online 14 hari lalu
                  </p>
                  <div className="detail-wrap-box">
                    <p
                      style={{ alignSelf: "center" }}
                      className="margin-top-bottom-0">
                      4.9{" "}
                      <img
                        aria-hidden="true"
                        src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                        alt=""
                      />{" "}
                      Star
                    </p>
                  </div>
                </div>
              </div>
              <p className="detail-comment-body">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Illo nam iste debitis aut
                eligendi error pariatur necessitatibus
                tenetur, ipsa, facere, reiciendis quasi sit
                voluptatibus atque placeat in consequatur
                exercitationem corrupti. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ab a
                laudantium consequuntur. Magni accusantium
                totam est corrupti nemo eius, doloribus
                asperiores rem quas fugit quasi pariatur
                aperiam ad neque incidunt. Lorem ipsum
                dolor, sit amet consectetur adipisicing
                elit. Quaerat cupiditate deserunt natus
                deleniti nemo sunt nobis doloremque nesciunt
                rerum. Cum explicabo ea natus inventore esse
                numquam ad placeat facere modi!
              </p>
              <div className="breakline" />
              <div className="detail-comment">
                <img
                  className="detail-pfp"
                  src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg"
                  alt="Logo candelaacts"
                />
                <div className="detail-comment-status">
                  <p className="detail-body-text margin-top-bottom-0 font-bold">
                    Ricky The Seller
                  </p>
                  <p className="detail-body-text margin-top-0">
                    Online 14 hari lalu
                  </p>
                  <div className="detail-wrap-box">
                    <p
                      style={{ alignSelf: "center" }}
                      className="margin-top-bottom-0">
                      4.9{" "}
                      <img
                        aria-hidden="true"
                        src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                        alt=""
                      />{" "}
                      Star
                    </p>
                  </div>
                </div>
              </div>
              <p className="detail-comment-body">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Illo nam iste debitis aut
                eligendi error pariatur necessitatibus
                tenetur, ipsa, facere, reiciendis quasi sit
                voluptatibus atque placeat in consequatur
                exercitationem corrupti. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ab a
                laudantium consequuntur. Magni accusantium
                totam est corrupti nemo eius, doloribus
                asperiores rem quas fugit quasi pariatur
                aperiam ad neque incidunt. Lorem ipsum
                dolor, sit amet consectetur adipisicing
                elit. Quaerat cupiditate deserunt natus
                deleniti nemo sunt nobis doloremque nesciunt
                rerum. Cum explicabo ea natus inventore esse
                numquam ad placeat facere modi!
              </p>
              <div className="breakline" />
              <div className="detail-comment">
                <img
                  className="detail-pfp"
                  src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg"
                  alt="Logo candelaacts"
                />
                <div className="detail-comment-status">
                  <p className="detail-body-text margin-top-bottom-0 font-bold">
                    Ricky The Seller
                  </p>
                  <p className="detail-body-text margin-top-0">
                    Online 14 hari lalu
                  </p>
                  <div className="detail-wrap-box">
                    <p
                      style={{ alignSelf: "center" }}
                      className="margin-top-bottom-0">
                      4.9{" "}
                      <img
                        aria-hidden="true"
                        src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                        alt=""
                      />{" "}
                      Star
                    </p>
                  </div>
                </div>
              </div>
              <p className="detail-comment-body">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Illo nam iste debitis aut
                eligendi error pariatur necessitatibus
                tenetur, ipsa, facere, reiciendis quasi sit
                voluptatibus atque placeat in consequatur
                exercitationem corrupti. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ab a
                laudantium consequuntur. Magni accusantium
                totam est corrupti nemo eius, doloribus
                asperiores rem quas fugit quasi pariatur
                aperiam ad neque incidunt. Lorem ipsum
                dolor, sit amet consectetur adipisicing
                elit. Quaerat cupiditate deserunt natus
                deleniti nemo sunt nobis doloremque nesciunt
                rerum. Cum explicabo ea natus inventore esse
                numquam ad placeat facere modi!
              </p>
            </div>
          </div>
          <Button style={{ marginTop: "8px" }}>
            Lihat Lebih
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
