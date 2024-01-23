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

function handleKeywordChange(event, setKeyword) {
  setKeyword(event.target.value);
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
  return temp;
}

function handleClearPriceFIlter(setPriceFilter) {
  const temp = cloneDeep(PRODUCT_PRICE_FILTER_VALUES);
  setPriceFilter(temp);
  return temp;
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
          onChange={(e) => {
            const temp = handlePriceFilterChange(
              "min",
              e,
              props.priceFilter,
              props.setPriceFilter
            );

            props.onAfterChange(temp);
          }}
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
          onChange={(e) => {
            const temp = handlePriceFilterChange(
              "max",
              e,
              props.priceFilter,
              props.setPriceFilter
            );

            props.onAfterChange(temp);
          }}
          type="text"
          className="product-search-price-filter-textinput"
        />
        <Button
          onClick={() => {
            const temp = handleClearPriceFIlter(
              props.setPriceFilter
            );
            props.onAfterChange(temp);
          }}
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
          onChange={(e) => {
            handleKeywordChange(e, props.setKeyword);
            props.onAfterChange(e.target.value);
          }}
          type="text"
          className="product-search-price-filter-textinput"
        />
      </div>
    ),
    [props.keyword]
  );
