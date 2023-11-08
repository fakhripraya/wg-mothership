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
import { setItem } from "../../../utils/redux/reducers/cartReducer";

const ShowItem = (props) =>
  useMemo(() => {
    function handleGoToProductPage() {
      window.location.href = `/product-detail?productId=${props.data.productId}`;
    }

    function handleGoToCreativeStore() {
      window.location.href = `/creative-store?id=${props.data.storeId}`;
    }

    return (
      <Fragment>
        <br />
        <label
          onClick={() => handleGoToCreativeStore()}
          style={{ marginBottom: "8px" }}
          className="font-bold main-color cursor-pointer">
          Warunk Gaming
        </label>
        <label style={{ marginBottom: "8px" }}>
          Jakarta Selatan
        </label>
        <div className="transaction-cart-item">
          <div className="transaction-cart-item-image-container">
            <img
              className="transaction-cart-item-image"
              src={props.data.productImageSrc}
              alt={props.data.productImageSrc}
            />
          </div>
          <div className="transaction-cart-item-body">
            <h2
              style={{ marginBottom: "8px" }}
              onClick={() => handleGoToProductPage()}
              className="main-color cursor-pointer">
              {props.data.productName}
            </h2>
            <label>{props.data.productCode}</label>
            <br />
            <br />
            <TextArea
              onChange={(e) => {
                const found = props.datas.findIndex(
                  (val) =>
                    val.userId !==
                      props.login.user.userId &&
                    val.productId === props.data.productId
                );
                props.datas[found].buyingNote =
                  e.target.value;
                props.dispatch(setItem([...props.datas]));
              }}
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
              alt={XMark}
              className="transaction-cart-icon cursor-pointer"
            />
            <br />
            <div className="transaction-cart-other-wrapper">
              <TextInput
                onChange={(e) => {
                  const found = props.datas.findIndex(
                    (val) =>
                      val.userId !==
                        props.login.user.userId &&
                      val.productId === props.data.productId
                  );
                  props.datas[found].buyQty =
                    e.target.value;
                  props.dispatch(setItem([...props.datas]));
                }}
                className="transaction-cart-input-text"
                value={removeLeadingZeros(
                  props.data.buyQty
                )}
              />
              <Button style={{ marginLeft: "8px" }}>
                Buah
              </Button>
            </div>
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
    );
  }, [props.data]);

const ShowItems = (props) => {
  const render = useCallback(
    () => (
      <Fragment>
        {props.datas.map((data, index) => (
          <ShowItem
            key={`transaction-cart-item-${index}`}
            index={index}
            data={data}
            datas={props.datas}
            dispatch={props.dispatch}
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
