import React, {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import "./style.scss";
import {
  getURLParams,
  scrollCarousel,
  smoothScrollTop,
} from "../../utils/functions/global";
import FloatButton from "../../components/FloatButton";
import BottomSheet from "../../components/BottomSheet";
import Accordion from "../../components/Accordion";
import { PRODUCT_SEARCH_FILTER_DATA_OPTIONS } from "../../variables/initial/productSearch";
import { ShowBreadcrumbs } from "../../components/Global";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  IS_NOT_AUTHENTICATE,
  URL_GET_PRODUCT_LIST,
  X_SID,
} from "../../variables/global";
import { cookies } from "../../config/cookie";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import { useAxios } from "../../utils/hooks/useAxios";
import { cloneDeep } from "lodash-es";
import { useMap } from "../../utils/hooks/useMap";
import {
  ShowGrabableCarouselCategoriesTag,
  ShowGridProductCardCarousel,
} from "./ModularComponents/ShowCarousels";
import { useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { ShowSearchText } from "./ModularComponents/ShowText";
import { PRODUCT_SORT_OPTIONS } from "../../variables/constants/dropdown";

export default function ProductSearch() {
  // HOOK
  const axiosService = useAxios();
  const mapper = useMap();
  const navigate = useNavigate();

  // REFS //
  const productSearchTagRef = useRef();
  const gridRefs = {};

  // STATES //
  const [breadcrumbs, setBreadcrumb] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedProducts, setSearchedProducts] =
    useState(null);
  const [
    searchedProductsMasterCount,
    setSearchedProductsMasterCount,
  ] = useState(null);
  const [relatedCatalogue, setRelatedCatalogue] =
    useState(null);

  // VARIABLES //
  const currentLocation = new URL(document.location);
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
  const category = useMemo(
    () => getURLParams(currentLocation, "category"),
    []
  );
  const store = useMemo(
    () => getURLParams(currentLocation, "store"),
    []
  );
  const catalogue = useMemo(
    () => getURLParams(currentLocation, "catalogue"),
    []
  );
  const keyword = useMemo(
    () => getURLParams(currentLocation, "keyword"),
    []
  );
  let searchedProductsMapped = useMemo(() => {
    const cloned = cloneDeep(searchedProducts);
    return mapper.splitArrayForGrid(cloned || [], 10);
  }, [searchedProducts]);

  // API ENDPOINTS
  // 1. searched product list
  // 2. related catalogues from the product list
  const endpoints = [
    {
      ...defaultConfigs,
      url: handleEndpointURL(),
    },
    // {
    //   ...defaultConfigs,
    //   url: `${URL_GET_CATALOGUE_DATA}`,
    // },
  ];

  // FUNCTIONS SPECIFIC //
  async function handleInitialize() {
    // execute axios request
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
        if (res.responseData?.[0]?.responseStatus === 200) {
          setSearchedProducts(
            res.responseData?.[0]?.responseData.result
          );
          setSearchedProductsMasterCount(
            res.responseData?.[0]?.responseData.masterCount
          );
          setIsLoading(false);
        }
        // if (res.responseData?.[1]?.responseStatus === 200)
        //   setRelatedCatalogue(
        //     res.responseData?.[1]?.responseData
        //   );
      })
      .catch((error) => {
        if (IS_NOT_AUTHENTICATE(error))
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
        else console.error(error);
      });
  }

  function handleEndpointURL(limit = 0, offset = 0) {
    let targetUrl;
    try {
      targetUrl = new URL(
        `${process.env.REACT_APP_ZEUS_SERVICE}${URL_GET_PRODUCT_LIST}`
      );
      category &&
        axiosService.setURLParams(
          targetUrl,
          "category",
          category
        );
      store &&
        axiosService.setURLParams(
          targetUrl,
          "store",
          store
        );
      catalogue &&
        axiosService.setURLParams(
          targetUrl,
          "catalogue",
          catalogue
        );
      keyword &&
        axiosService.setURLParams(
          targetUrl,
          "keyword",
          keyword
        );
      axiosService.setURLParams(targetUrl, "limit", limit);
      axiosService.setURLParams(
        targetUrl,
        "offset",
        offset
      );
      axiosService.setURLParams(
        targetUrl,
        "isWithFiles",
        true
      );
      axiosService.setURLParams(
        targetUrl,
        "isWithStoreInfo",
        true
      );
    } catch (error) {
      console.log(error);
    }
    return targetUrl;
  }

  function handleLoadMoreNewProducts() {
    trackPromise(
      axiosService
        .getData({
          ...endpoints[4],
          url: handleEndpointURL(
            10,
            Math.floor(searchedProducts.length / 10)
          ),
        })
        .then((res) => {
          if (
            res.responseStatus === 200 &&
            res.responseData.masterCount >
              searchedProducts.length
          ) {
            const combinedArr = searchedProducts.concat(
              res.responseData.result
            );
            setSearchedProducts(combinedArr);
          }
        })
        .catch((error) => console.error(error))
    );
  }

  function handleBottomSheet() {
    setToggle(!toggle);
  }

  // COMPONENTS SPECIFIC //
  const ShowAccordions = (props) =>
    props.datas.map((item, index) => (
      <Accordion
        key={`${props.uniqueKey}-accordion-${index}`}
        toggle={true}
        isButton={true}
        title={item.title}
        data={item.data}
      />
    ));

  // INITIAL RENDER
  useEffect(() => {
    // default page config
    smoothScrollTop();
    // set breadcrumbs
    const breadcrumbs = ["Home"];
    category && breadcrumbs.push(category);
    store && breadcrumbs.push(store);
    catalogue && breadcrumbs.push(catalogue);
    keyword && breadcrumbs.push(keyword);
    setBreadcrumb(breadcrumbs);
    // initialize datas
    trackPromise(handleInitialize());
  }, []);

  return (
    <Fragment>
      <div className="product-search-container">
        <div className="product-search-wrapper">
          <div className="product-search-breadcrumbs">
            <ShowBreadcrumbs trails={breadcrumbs} />
          </div>
          <div className="product-search-title">
            <h3 className="margin-top-0">
              Berikut adalah hasil pencarian random
            </h3>
          </div>
          <div className="product-search-flex-container">
            <div className="product-search-tools-container">
              <ShowAccordions
                uniqueKey="desktop"
                datas={PRODUCT_SEARCH_FILTER_DATA_OPTIONS}
              />
            </div>
            <div className="product-search-cards-container">
              <div
                className={`product-search-cards-top-header-container ${
                  !relatedCatalogue ? "display-none" : ""
                }`}>
                <FloatButton
                  onClick={() => handleBottomSheet()}
                  className="product-search-filter-button"
                />
                <div
                  onMouseDown={(event) =>
                    scrollCarousel(
                      event,
                      productSearchTagRef.current
                    )
                  }
                  className="product-search-cards-tag-container"
                  ref={productSearchTagRef}>
                  <ShowGrabableCarouselCategoriesTag
                    uniqueKey={"product-search-tag"}
                    values={relatedCatalogue}
                  />
                </div>
              </div>
              <div className="product-search-cards-header">
                <div className="product-search-cards-counter">
                  <ShowSearchText
                    isLoading={isLoading}
                    searchedProductsLength={
                      searchedProducts?.length || 0
                    }
                    searchedProductsMasterCount={
                      searchedProductsMasterCount
                    }
                  />
                </div>
                <div className="product-search-dropdown-wrapper">
                  <Dropdown
                    onChange={(value) => {}}
                    style={{
                      width: "100px",
                      maxWidth: "100px",
                    }}
                    showTitle={true}
                    toggle={true}
                    values={PRODUCT_SORT_OPTIONS}
                  />
                </div>
              </div>
              {isLoading && (
                <p className="justify-center display-flex">
                  Loading bentar...
                </p>
              )}
              {!isLoading &&
                searchedProductsMasterCount > 0 && (
                  <Fragment>
                    <div className="product-search-cards-wrapper">
                      <ShowGridProductCardCarousel
                        uniqueKey="product-search-item-grid"
                        gridRefs={gridRefs}
                        navigate={navigate}
                        values={searchedProductsMapped}
                      />
                    </div>
                    <div className="product-search-cards-button-wrapper">
                      <Button
                        onClick={handleLoadMoreNewProducts}
                        className="product-search-button main-bg-color">
                        Lihat Lebih
                      </Button>
                    </div>
                  </Fragment>
                )}
              {!isLoading &&
                searchedProductsMasterCount <= 0 && (
                  <p className="justify-center display-flex">
                    Produk belum bisa ditemukan
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
      <BottomSheet
        toggle={toggle}
        clicked={handleBottomSheet}>
        <div className="product-search-mobile-tools-container">
          <ShowAccordions
            uniqueKey="desktop"
            datas={PRODUCT_SEARCH_FILTER_DATA_OPTIONS}
          />
        </div>
      </BottomSheet>
    </Fragment>
  );
}
