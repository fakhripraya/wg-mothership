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
  acceptNumericOnly,
  formattedNumber,
  removeLeadingZeros,
} from "../../../utils/functions/global";
import {
  setCartStateAndBroadcast,
  updateCartField,
} from "../../../utils/functions/cart";
import { cloneDeep } from "lodash-es";
import { MAX_BUY_QTY_TRESHOLD } from "../../../variables/constants/productDetail";

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
        <div className="transaction-cart-item-header">
          <div className="transaction-cart-item-header-storeinfo">
            <label
              onClick={() => handleGoToCreativeStore()}
              className="font-bold main-color cursor-pointer margin-bottom-8">
              {props.data.storeName}
            </label>
            <label style={{ marginBottom: "8px" }}>
              Jakarta Selatan
            </label>
          </div>
          <img
            src={XMark}
            alt={XMark}
            className="transaction-cart-icon cursor-pointer"
          />
        </div>
        <div className="transaction-cart-item">
          <div className="transaction-cart-item-image-container">
            <img
              className="transaction-cart-item-image"
              src={props.data.productImageSrc}
              alt={props.data.productImageSrc}
            />
          </div>
          <div className="transaction-cart-item-body">
            <label
              onClick={() => handleGoToProductPage()}
              className="main-color cursor-pointer font-bold margin-bottom-8">
              {props.data.productName}
            </label>
            <label>{props.data.productCode}</label>
            <br />
            <TextArea
              placeholder="Tulis catatan untuk penjual"
              onChange={(e) => {
                const temp = cloneDeep(props.reduxDatas);

                updateCartField(
                  temp,
                  "buyingNote",
                  props.login.user.userId,
                  props.data.productId,
                  e.target.value
                );

                setCartStateAndBroadcast(props.dispatch, [
                  ...temp,
                ]);
              }}
              className="transaction-cart-longtext-area dark-bg-color"
              value={props.data.buyingNote}
            />
          </div>
          <div className="transaction-cart-item-other">
            <div className="transaction-cart-other-wrapper">
              <TextInput
                onChange={(e) => {
                  let value = e.target.value;
                  const temp = cloneDeep(props.reduxDatas);

                  if (!value) value = 0;
                  if (value > MAX_BUY_QTY_TRESHOLD)
                    value = MAX_BUY_QTY_TRESHOLD.toString();
                  updateCartField(
                    temp,
                    "buyQty",
                    props.login.user.userId,
                    props.data.productId,
                    acceptNumericOnly(value)
                  );

                  setCartStateAndBroadcast(props.dispatch, [
                    ...temp,
                  ]);
                }}
                className="transaction-cart-input-text"
                value={formattedNumber(
                  removeLeadingZeros(props.data.buyQty)
                )}
              />
              <Button style={{ marginLeft: "8px" }}>
                Buah
              </Button>
            </div>
            <br />
            <label className="text-align-end">
              Subtotal : Rp.
              {formattedNumber(
                props.data.buyQty * props.data.productPrice
              )}
            </label>
          </div>
        </div>
        <br />
        <hr
          style={{ opacity: 0.1 }}
          className="max-width"
        />
      </Fragment>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

const ShowItems = (props) => {
  const render = useCallback(
    () => (
      <Fragment>
        {[...props.filteredDatas].map((data, index) => (
          <ShowItem
            key={`transaction-cart-item-${index}`}
            index={index}
            data={data}
            login={props.login}
            reduxDatas={props.reduxDatas}
            dispatch={props.dispatch}
          />
        ))}
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.reduxDatas]
  );
  // return the memoized render function
  if (props.reduxDatas?.length > 0) return render();
};

export default ShowItems;
