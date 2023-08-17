import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import "./style.scss";
import Card from "../../components/Card";
import {
  scrollCarousel,
  smoothScrollTop,
} from "../../utils/functions/global";
import {
  getGrid,
  getRecommendedGaming,
} from "../../variables/initial/home";
import Tag from "../../components/Tag";
import FloatButton from "../../components/FloatButton";
import BottomSheet from "../../components/BottomSheet";
import Accordion from "../../components/Accordion";
import { filterData } from "../../variables/initial/productSearch";
import { ShowBreadcrumbs } from "../../components/Global";

export default function ProductSearch() {
  // REFS //
  const productSearchTagRef = useRef();
  const gridRefs = {};

  // STATES //
  const [breadcrumbs, setBreadcrumb] = useState([]);
  const [toggle, setToggle] = useState(false);

  // FUNCTIONS SPECIFIC //
  function handleBottomSheet() {
    setToggle(!toggle);
  }

  // COMPONENTS SPECIFIC //
  const ShowAccordions = (props) => {
    return props.datas.map((item, index) => {
      return (
        <Accordion
          key={`${props.uniqueKey}-accordion-${index}`}
          toggle={true}
          isButton={true}
          title={item.title}
          data={item.data}
        />
      );
    });
  };

  const ShowGrabableCarouselTag = (props) => {
    return props.arrayFunc().map((item, index) => {
      return (
        <Tag
          key={`carousel-${props.uniqueKey}-${index}`}
          text={item.name}
          textStyle={{
            marginTop: "12px",
            marginBottom: "12px",
          }}
        />
      );
    });
  };

  const ShowGrabableCardCarousel = (props) => {
    return props.arrayFunc().map((item, index) => {
      return (
        <Card
          className="dark-bg-color"
          key={`finding-carousel-${props.uniqueKey}-${index}`}
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
          key={`all-finding-${index}`}
          onMouseDown={(event) =>
            scrollCarousel(event, gridRefs[index])
          }
          className="product-search-cards-grid-wrapper"
          ref={(ref) => (gridRefs[index] = ref)}>
          <ShowGrabableCardCarousel
            uniqueKey={`all-finding-id-${index}`}
            arrayFunc={() => item.arrayFunc()}
          />
        </div>
      );
    });
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
    const dummyBreadcrumb = [
      "Home",
      "Graphical Renders",
      "Tesla P100",
    ];
    setBreadcrumb(dummyBreadcrumb);
  }, []);

  return (
    <Fragment>
      <div className="product-search-container">
        <div className="product-search-wrapper">
          <div className="product-search-breadcrumbs">
            <ShowBreadcrumbs trails={breadcrumbs} />
          </div>
          <div className="product-search-title">
            <h2>THIS IS THE TITLE OF THE SEARCH</h2>
          </div>
          <div className="product-search-flex-container">
            <div className="product-search-tools-container">
              <ShowAccordions
                uniqueKey="desktop"
                datas={filterData}
              />
            </div>
            <div className="product-search-cards-container">
              <div className="product-search-cards-top-header-container">
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
                  <ShowGrabableCarouselTag
                    uniqueKey={"product-search-tag"}
                    arrayFunc={() => getRecommendedGaming()}
                  />
                </div>
              </div>
              <div className="product-search-cards-header">
                <div className="product-search-cards-counter">
                  <span>
                    Showing 1 - 60 products of 257k of{" "}
                  </span>
                  <strong>Graphical Render</strong>
                </div>
                <Dropdown
                  onChange={(value) => {}}
                  style={{
                    width: "100px",
                    maxWidth: "100px",
                  }}
                  showTitle={true}
                  toggle={true}
                  values={["Fittest", "Jancokest"]}
                />
              </div>
              <div className="product-search-cards-wrapper">
                <ShowGridCardCarousel
                  arrayFunc={() => getGrid()}
                />
              </div>
              <div className="product-search-cards-button-wrapper">
                <Button className="product-search-button">
                  See More
                </Button>
              </div>
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
            datas={filterData}
          />
        </div>
      </BottomSheet>
    </Fragment>
  );
}
