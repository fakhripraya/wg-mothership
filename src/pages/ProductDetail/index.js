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
import MinusIcon from "../../assets/svg/square-minus-solid.svg";
import PlusIcon from "../../assets/svg/square-plus-solid-green.svg";
import Accordion from "../../components/Accordion";
import { filterData } from "../../variables/initial/productDetail";
import TextArea from "../../components/TextArea";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  LOGIN,
  URL_GET_PRODUCT_DETAILS,
  X_SID,
} from "../../variables/global";
import { cookies } from "../../config/cookie";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Avatar from "react-avatar";
import ErrorHandling from "../ErrorHandling";
import { NO_PRODUCT_FOUND } from "../../variables/errorMessages/productDetail";

export default function ProductDetail() {
  // HOOKS //
  const navigate = useNavigate();
  const zeusService = useAxios();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // STATES //
  const [productData, setProductData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [buyQty, setBuyQty] = useState(0);
  const [buyingNote, setBuyingNote] = useState("");
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productId, setProductId] = useState(
    searchParams.get("productId")
  );

  // VARIABLES //
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

  // COMPONENTS SPECIFIC //
  const ShowAccordions = (props) => {
    return props.datas.map((item, index) => {
      return (
        <Accordion
          key={`${props.uniqueKey}-accordion-${index}`}
          toggle={false}
          isButton={true}
          title={item.title}
          data={item.data}
        />
      );
    });
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
              res.responseData.result.MasterCategory
                .categoryName,
              res.responseData.result.MasterStoreCatalogue
                .catalogueName,
              res.responseData.result.productName,
            ];

            const tempProductData = {
              ...res.responseData.result,
              breadcrumbs: dummyBreadcrumb,
            };

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
  }, []);

  if (isFetched && !productData)
    return (
      <ErrorHandling errorMessage={NO_PRODUCT_FOUND}>
        <Button
          className="margin-top-12-18 "
          onClick={() => window.location.replace("/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );

  return (
    <div className="detail-container">
      <div className="detail-wrapper">
        <Fragment>
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
                {productData && (
                  <img
                    className="detail-picture"
                    alt={
                      productData &&
                      productData.MasterFiles[0].filename
                    }
                    src={
                      productData &&
                      `${process.env.REACT_APP_CHRONOS_SERVICE}${productData.MasterFiles[0].destination}`
                    }
                  />
                )}
              </div>
              <div className="detail-picture-box-options">
                {productData &&
                  productData.MasterFiles.map(
                    (file, index) => {
                      console.log(file);
                      return (
                        index !== 0 && (
                          <img
                            className="detail-picture-box-options-item"
                            alt={file.filename}
                            src={`${process.env.REACT_APP_CHRONOS_SERVICE}${file.destination}`}
                          />
                        )
                      );
                    }
                  )}
              </div>
            </div>
            <div className="detail-flexbox detail-flexbox-details ">
              <h2 className="detail-title margin-top-bottom-0">
                {productData && productData.productName}
              </h2>
              <br />
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
              <h1 className="detail-pricetag">
                {productData &&
                  `Rp.${formattedNumber(
                    productData.productPrice
                  )}`}
              </h1>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <div className="detail-tabs">
                <Button>Details</Button>
                <Button>Ketentuan</Button>
              </div>
              <hr
                style={{ opacity: 0.1 }}
                className="max-width"
              />
              <p className="detail-body-text margin-bottom-0">
                Kondisi:&nbsp;
                {productData &&
                  productData.productCondition}
              </p>
              <p className="detail-body-text margin-top-bottom-0">
                Berat Satuan:&nbsp;
                {productData && productData.productWeight}
                &nbsp;
                {productData &&
                  productData.productWeightUnit}
              </p>
              <p className="detail-body-text margin-top-bottom-0">
                Kategori:&nbsp;
                {productData &&
                  productData.MasterCategory.categoryName}
              </p>
              <p className="detail-body-text margin-top-0">
                Katalog:&nbsp;
                {productData &&
                  productData.MasterStoreCatalogue
                    .catalogueName}
              </p>
              <p>
                {productData &&
                  productData.productDescription}
              </p>
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
                  src={
                    productData &&
                    `${process.env.REACT_APP_CHRONOS_SERVICE}${productData.MasterStoreCatalogue.MasterStore.MasterFiles[0].destination}`
                  }
                  title={
                    productData &&
                    productData.MasterStoreCatalogue
                      .MasterStore.MasterFiles[0].filename
                  }
                  name={
                    productData &&
                    productData.MasterStoreCatalogue
                      .MasterStore.MasterFiles[0].filename
                  }
                />
                <div className="detail-merchant-status">
                  <h4 className="detail-body-text margin-top-bottom-0">
                    {productData &&
                      productData.MasterStoreCatalogue
                        .MasterStore.storeName}
                  </h4>
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
                <Button style={{ marginLeft: "8px" }}>
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
              <h1 className="detail-title margin-top-bottom-0">
                Pesan
              </h1>
              <br />
              <h3 className="detail-title margin-top-bottom-0">
                Jumlah Pembelian
              </h3>
              <div
                style={{ marginBottom: "8px" }}
                className="detail-flexbox-pricing-rowbox">
                <TextInput
                  value={formattedNumber(buyQty)}
                  onChange={(e) => {
                    let temp = acceptNumericOnly(
                      e.target.value
                    );
                    return setBuyQty(temp);
                  }}
                  className="detail-flexbox-pricing-count-area"
                />
                <img
                  onClick={() => {}}
                  className="detail-flexbox-pricing-count-button"
                  src={PlusIcon}
                  alt={"plus-icon"}
                />
                <img
                  onClick={() => {}}
                  className="detail-flexbox-pricing-count-button"
                  src={MinusIcon}
                  alt={"minus-icon"}
                />
              </div>
              <br />
              <h3 className="detail-title margin-top-bottom-0">
                Masukan Catatan Bila Ada
              </h3>
              <TextArea
                value={buyingNote}
                onChange={(e) =>
                  setBuyingNote(e.target.value)
                }
                className="detail-flexbox-pricing-longtext-area"
              />
              <div className="detail-flexbox-pricing-rowbox">
                <h2 className="detail-title margin-top-0">
                  Subtotal&nbsp;
                </h2>
                <h2 className="detail-title margin-top-0">
                  {productData &&
                    `Rp.${formattedNumber(
                      productData.productPrice * buyQty
                    )}`}
                </h2>
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
                <Button
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
              <h1 className="detail-title margin-top-bottom-0">
                Review Barang
              </h1>
              <div className="detail-review-rating">
                <img
                  style={{
                    height: "36px",
                    width: "36px",
                    marginRight: "8px",
                  }}
                  aria-hidden="true"
                  src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                  alt=""
                />
                <p style={{ fontSize: "72px" }}>4.9 </p>
                <p style={{ fontSize: "72px" }}>/</p>
                <p style={{ fontSize: "36px" }}>5.0</p>
              </div>
              <p className="detail-body-text margin-top-0">
                100% peminjam merasa puas
              </p>
              <p className="detail-body-text margin-top-0">
                11 rating • 9 ulasan
              </p>
              <br />
              <ShowAccordions
                uniqueKey="filter-rating"
                datas={filterData}
              />
            </div>
            <div className="detail-flexbox detail-flexbox-review ">
              <h1 className="detail-title margin-top-0">
                Foto Review Dari Peminjam
              </h1>
              <div className="detail-picture-box-review">
                <img
                  className="detail-picture-box-review-item"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
                  src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                />
                <img
                  className="detail-picture-box-review-item"
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
              <h1 className="detail-title margin-bottom-0">
                Review Dari Peminjam
              </h1>
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
                  <h4 className="detail-body-text margin-top-bottom-0">
                    Ricky The Seller
                  </h4>
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
              <br />
              <div className="detail-comment">
                <img
                  className="detail-pfp"
                  src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg"
                  alt="Logo candelaacts"
                />
                <div className="detail-comment-status">
                  <h4 className="detail-body-text margin-top-bottom-0">
                    Ricky The Seller
                  </h4>
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
              <br />
              <div className="detail-comment">
                <img
                  className="detail-pfp"
                  src="https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/8/17/8b9136a1-364e-4702-9fab-8802f184c8e8.jpg"
                  alt="Logo candelaacts"
                />
                <div className="detail-comment-status">
                  <h4 className="detail-body-text margin-top-bottom-0">
                    Ricky The Seller
                  </h4>
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
            Load More Review
          </Button>
        </Fragment>
        );
      </div>
    </div>
  );
}
