import React, {
  Fragment,
  useCallback,
  useMemo,
} from "react";
import TextInput from "../../../components/TextInput";
import XMark from "../../../assets/svg/xmark-solid-red.svg";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import {
  formattedNumber,
  removeLeadingZeros,
} from "../../../utils/functions/global";

const ShowItem = (props) =>
  useMemo(
    () => (
      <Fragment>
        <br />
        <label
          style={{ marginBottom: "8px" }}
          className="font-bold">
          Warunk Gaming
        </label>
        <label>Jakarta Selatan</label>
        <div className="transaction-cart-item">
          <div className="transaction-cart-item-image-container">
            <img
              className="transaction-cart-item-image"
              src={props.data.productImageSrc}
            />
          </div>
          <div className="transaction-cart-item-body">
            <h2>{props.data.productName}</h2>
            <TextArea
              className="transaction-cart-longtext-area dark-bg-color"
              value={
                props.data.buyingNote ||
                "Tulis catatan untuk penjual"
              }
            />
          </div>
          <div className="transaction-cart-item-other">
            <img
              src={XMark}
              className="transaction-cart-icon cursor-pointer"
            />
            <br />
            <div className="transaction-cart-other-wrapper">
              <TextInput
                className="transaction-cart-input-text"
                value={removeLeadingZeros(
                  props.data.buyQty
                )}
              />
              <Button style={{ marginLeft: "8px" }}>
                Buah
              </Button>
            </div>
            <br />
            <h3>
              Subtotal: Rp.
              {formattedNumber(
                props.data.buyQty * props.data.productPrice
              )}
            </h3>
          </div>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
      </Fragment>
    ),
    [props.data]
  );

const ShowItems = (props) => {
  const render = useCallback(
    () => (
      <Fragment>
        {props.datas.map((data, index) => (
          <ShowItem
            key={`transaction-cart-item-${index}`}
            index={index}
            data={data}
          />
        ))}
      </Fragment>
    ),
    [props.datas]
  );
  // return the memoized render function
  if (props.datas && props.datas.length > 0)
    return render();
  return null;
};

export default ShowItems;
