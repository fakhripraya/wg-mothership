import Card from "../../../components/Card";
import Tag from "../../../components/Tag";
import {
  formattedNumber,
  scrollCarousel,
} from "../../../utils/functions/global";
import Notfound404 from "../../../assets/svg/404-notfound-1.svg";

export function handleGoToProductDetail(navigate, id) {
  navigate(`/product-detail?productId=${id}`);
}

export function handleGoToCreativeStore(navigate, id) {
  navigate(`/creative-store?id=${id}`);
}

export const ShowGrabableCarouselCategoriesTag = (props) =>
  props.values?.map((obj, index) => (
    <Tag
      key={`carousel-tag-${props.uniqueKey}-${index}`}
      text={obj.categoryName}
    />
  ));

export const ShowGrabableProductCardCarousel = (props) =>
  props.values?.map((obj, index) => (
    <Card
      onClick={() =>
        handleGoToProductDetail(props.navigate, obj.id)
      }
      key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
      <img
        className="card-img"
        src={`${process.env.REACT_APP_CHRONOS_SERVICE}${obj?.MasterFiles[0]?.destination}`}
        alt={obj?.MasterFiles[0]?.destination}></img>
      <br />
      <br />
      <h3 className="light-color">{obj?.productName}</h3>
      <p className="margin-bottom-0 light-color">
        {
          obj?.MasterStoreCatalogue?.MasterStore
            ?.storeProvince
        }
      </p>
      <p
        style={{ marginTop: "0.2em" }}
        className="margin-bottom-0 main-color">
        Rp.{formattedNumber(obj?.productPrice)}
      </p>
      <p className="light-color">
        {obj?.productDescription}
      </p>
    </Card>
  ));

export const ShowGrabableStoreCardCarousel = (props) =>
  props.values?.map((obj, index) => (
    <Card
      onClick={() =>
        handleGoToCreativeStore(props.navigate, obj.id)
      }
      key={`carousel-card-${props.uniqueKey}-${index}-id${obj.id}`}>
      <img
        className="card-img"
        src={
          obj?.MasterFiles?.[0]?.destination
            ? `${
                process.env.REACT_APP_CHRONOS_SERVICE +
                obj?.MasterFiles?.[0]?.destination
              }`
            : Notfound404
        }
        alt={
          obj?.MasterFiles?.[0]?.destination ||
          obj?.storeName
        }></img>
      <br />
      <br />
      <h3 className="light-color">{obj?.storeName}</h3>
      <p className="margin-bottom-0 light-color">
        {obj?.storeProvince}
      </p>
      <p className="light-color">{obj?.storeDescription}</p>
    </Card>
  ));

export const ShowGridProductCardCarousel = (props) =>
  props.values?.map((obj, index) => (
    <div
      key={`${props.uniqueKey}-${index}`}
      onMouseDown={(event) =>
        scrollCarousel(event, props.gridRefs[index])
      }
      className={"home-carousel-wrapper " + obj.className}
      ref={(ref) => (props.gridRefs[index] = ref)}>
      <ShowGrabableProductCardCarousel
        key={`${props.uniqueKey}-card-id-${index}`}
        uniqueKey={props.uniqueKey}
        values={obj.values}
        navigate={props.navigate}
      />
    </div>
  ));
