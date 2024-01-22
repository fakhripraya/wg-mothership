import { cloneDeep } from "lodash-es";
import {
  acceptNumericOnly,
  formattedNumber,
} from "../../../utils/functions/global";
import { PRODUCT_PRICE_FILTER_VALUES } from "../../../variables/initial/productSearch";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useMemo } from "react";
import { MAX_PRICE_FILTER_TRESHOLD } from "../../../variables/constants/productSearch";

//let priceSetterTimeout = null;
let keywordSetterTimeout = null;

function handleKeywordChange(event, setKeyword) {
  clearTimeout(keywordSetterTimeout);
  keywordSetterTimeout = setTimeout(() => {
    setKeyword(event.target.value);
  }, 500);
}

function handlePriceFilterChange(
  field,
  event,
  priceFilter,
  setPriceFilter
) {
  const temp = cloneDeep(priceFilter);
  let value = parseInt(
    acceptNumericOnly(event.target.value)
  );
  if (!value) value = 0;
  if (value > MAX_PRICE_FILTER_TRESHOLD)
    value = MAX_PRICE_FILTER_TRESHOLD;

  temp[field] = value || 0;
  setPriceFilter(temp);
}

function handleClearPriceFIlter(setPriceFilter) {
  setPriceFilter(cloneDeep(PRODUCT_PRICE_FILTER_VALUES));
}

export const PriceFilters = (props) =>
  useMemo(
    () => (
      <div className={"product-search-tools-wrapper"}>
        <p className="margin-top-0 font-bold">
          Filter Harga
        </p>
        <label style={{ marginBottom: "2px" }}>Min</label>
        <TextInput
          value={formattedNumber(props.priceFilter.min)}
          onChange={(e) =>
            handlePriceFilterChange(
              "min",
              e,
              props.priceFilter,
              props.setPriceFilter
            )
          }
          type="text"
          className="product-search-price-filter-textinput"
        />
        <label
          style={{
            marginTop: "12px",
            marginBottom: "2px",
          }}>
          Max
        </label>
        <TextInput
          value={formattedNumber(props.priceFilter.max)}
          onChange={(e) =>
            handlePriceFilterChange(
              "max",
              e,
              props.priceFilter,
              props.setPriceFilter
            )
          }
          type="text"
          className="product-search-price-filter-textinput"
        />
        <Button
          onClick={() =>
            handleClearPriceFIlter(props.setPriceFilter)
          }
          style={{ marginTop: "12px" }}>
          Reset
        </Button>
      </div>
    ),
    [props.priceFilter]
  );

export const NameFilter = (props) =>
  useMemo(
    () => (
      <div
        className={
          "margin-top-0 product-search-tools-wrapper"
        }>
        <TextInput
          placeholder="Cari"
          value={props.keyword}
          onChange={(e) =>
            handleKeywordChange(e, props.setKeyword)
          }
          type="text"
          className="product-search-price-filter-textinput"
        />
      </div>
    ),
    [props.priceFilter]
  );
