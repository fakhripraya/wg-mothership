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
import {
  PRODUCT_PRICE_FILTER_VALUES,
  PRODUCT_SEARCH_FILTER_DATA_OPTIONS,
  PRODUCT_SEARCH_FILTER_VALUES,
} from "../../variables/initial/productSearch";
import { ShowBreadcrumbs } from "../../components/Global";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  URL_GET_CATEGORIES,
  URL_GET_PRODUCT_LIST,
  X_SID,
} from "../../variables/global";
import { cookies } from "../../config/cookie";
import { useAxios } from "../../utils/hooks/useAxios";
import { cloneDeep } from "lodash-es";
import { useMap } from "../../utils/hooks/useMap";
import {
  ShowGrabableCarouselCategoriesTag,
  ShowGridProductCardCarousel,
} from "./ModularComponents/ShowCarousels";
import { useNavigate } from "react-router-dom";
import { ShowSearchText } from "./ModularComponents/ShowText";
import { PRODUCT_SORT_OPTIONS } from "../../variables/constants/dropdown";
import ShowAccordions from "./ModularComponents/ShowAccordions";
import { FILTER_PRICE_RANGE } from "../../variables/constants/productSearch";
import {
  NameFilter,
  PriceFilters,
} from "./ModularComponents/ShowInputText";

export default function ProductSearch() {
  // HOOK
  const axiosService = useAxios();
  const mapper = useMap();
  const navigate = useNavigate();

  // REFS //
  const productSearchTagRef = useRef();
  const gridRefs = {};

  // VARIABLES //
  const carouselLimit = 10;
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

  // STATES //
  const [breadcrumbs, setBreadcrumb] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState(
    getURLParams(currentLocation, "keyword")
  );
  const [priceFilter, setPriceFilter] = useState(
    PRODUCT_PRICE_FILTER_VALUES
  );
  const [sideBarFilters, setSideBarFilters] = useState([
    ...PRODUCT_SEARCH_FILTER_VALUES,
  ]);
  const [allCategories, setAllCategories] = useState(null);
  const [searchedProducts, setSearchedProducts] =
    useState(null);
  const [
    searchedProductsMasterCount,
    setSearchedProductsMasterCount,
  ] = useState(null);

  // MEMOIZED VARIABLES //
  const category = useMemo(
    () => getURLParams(currentLocation, "category"),
    []
  );
  const store = useMemo(
    () => getURLParams(currentLocation, "store"),
    []
  );
  let searchedProductsMapped = useMemo(() => {
    const cloned = cloneDeep(searchedProducts);
    return mapper.splitArrayForGrid(cloned || [], 10);
  }, [searchedProducts]);

  // API ENDPOINTS
  // 1. searched product list
  // 2. all categories available
  const endpoints = [
    {
      ...defaultConfigs,
      url: handleEndpointURL(),
    },
    {
      ...defaultConfigs,
      url: `${URL_GET_CATEGORIES}`,
    },
  ];

  // FUNCTIONS SPECIFIC //
  async function handleInitialize() {
    // execute axios request
    await axiosService
      .getAllData(endpoints)
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
        if (res.responseData?.[1]?.responseStatus === 200)
          setAllCategories(
            res.responseData?.[1]?.responseData
          );
      })
      .catch((error) => console.error(error));
  }

  async function handleFilterFetch() {
    setIsLoading(true);
    // execute axios request
    await axiosService
      .getData({
        ...endpoints[0],
      })
      .then((res) => {
        if (res.responseStatus === 200) {
          setSearchedProducts(res.responseData.result);
          setSearchedProductsMasterCount(
            res.responseData.masterCount
          );
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }

  function handleBreadcrumbs() {
    const breadcrumbs = ["Home"];
    category && breadcrumbs.push(category);
    store && breadcrumbs.push(store);
    keyword && breadcrumbs.push(keyword);
    setBreadcrumb(breadcrumbs);
  }

  function handleSearchSubject() {
    if (keyword) return keyword;
    if (store) return store;
    if (category) return category;
  }

  function handleEndpointURL(limit = 50, offset = 0) {
    try {
      let targetUrl;
      targetUrl = new URL(
        `${process.env.REACT_APP_ZEUS_SERVICE}${URL_GET_PRODUCT_LIST}`
      );

      // assign the final filter values
      let finalFilters = [
        {
          filter: FILTER_PRICE_RANGE,
          value: {
            min: priceFilter.min,
            max: priceFilter.max,
          },
        },
      ];

      if (sideBarFilters.length > 0) {
        finalFilters = [...finalFilters, ...sideBarFilters];
      }
      if (category) {
        axiosService.setURLParams(
          targetUrl,
          "category",
          category
        );
      }
      if (store) {
        axiosService.setURLParams(
          targetUrl,
          "store",
          store
        );
      }
      if (keyword) {
        axiosService.setURLParams(
          targetUrl,
          "keyword",
          keyword
        );
      }

      axiosService.setURLParams(
        targetUrl,
        "filters",
        JSON.stringify(finalFilters)
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

      return targetUrl;
    } catch (error) {
      console.log(error);
    }
  }

  function handleLoadMoreNewProducts() {
    axiosService
      .getData({
        ...endpoints[4],
        url: handleEndpointURL(
          carouselLimit,
          Math.floor(
            searchedProducts.length / carouselLimit
          )
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
      .catch((error) => console.error(error));
  }

  function handleBottomSheet() {
    setToggle(!toggle);
  }

  // INITIAL RENDER
  useEffect(() => {
    // page scroll config
    smoothScrollTop();
    // initialize breadcrumbs and initialize datas by fetching it
    handleBreadcrumbs();
    handleInitialize();
  }, []);

  useEffect(() => {
    handleBreadcrumbs();
    handleFilterFetch();
  }, [sideBarFilters, priceFilter, keyword]);

  return (
    <Fragment>
      <div className="product-search-container">
        <div className="product-search-wrapper">
          <div className="product-search-breadcrumbs">
            <ShowBreadcrumbs trails={breadcrumbs} />
          </div>
          <div className="product-search-title">
            <h3 className="margin-top-0">
              {(() => {
                const subject = handleSearchSubject();
                return `Berikut adalah hasil pencarian ${
                  subject || "random"
                }`;
              })()}
            </h3>
          </div>
          <div className="product-search-flex-container">
            <div className="product-search-tools-container">
              <NameFilter
                keyword={keyword}
                setKeyword={setKeyword}
              />
              <PriceFilters
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
              />
              <div className="padding-0 product-search-tools-wrapper">
                <ShowAccordions
                  uniqueKey="product-search-desktop"
                  datas={PRODUCT_SEARCH_FILTER_DATA_OPTIONS}
                  stateData={sideBarFilters}
                  setStateDatas={setSideBarFilters}
                />
              </div>
            </div>
            <div className="product-search-cards-container">
              <div
                className={`product-search-cards-top-header-container ${
                  !allCategories ? "display-none" : ""
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
                    values={allCategories}
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
          <NameFilter
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <PriceFilters
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />
          <ShowAccordions
            uniqueKey="product-search-mobile"
            datas={PRODUCT_SEARCH_FILTER_DATA_OPTIONS}
            stateData={sideBarFilters}
            setStateDatas={setSideBarFilters}
          />
        </div>
      </BottomSheet>
    </Fragment>
  );
}
