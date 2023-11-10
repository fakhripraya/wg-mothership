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
import { setItem } from "../../../utils/redux/reducers/cartReducer";
import { cloneDeep } from "lodash-es";

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
              style={{ marginBottom: "8px" }}
              className="font-bold main-color cursor-pointer">
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
            <h2
              style={{ marginBottom: "8px" }}
              onClick={() => handleGoToProductPage()}
              className="main-color cursor-pointer">
              {props.data.productName}
            </h2>
            <label>{props.data.productCode}</label>
            <br />
            <TextArea
              onChange={(e) => {
                let temp = cloneDeep(props.datas);
                const found = temp.findIndex(
                  (val) =>
                    val.userId ===
                      props.login.user.userId &&
                    val.productId === props.data.productId
                );
                temp[found].buyingNote = e.target.value;
                props.dispatch(setItem(temp));
                props.setDatas(temp);
              }}
              className="transaction-cart-longtext-area dark-bg-color"
              value={props.data.buyingNote}
            />
          </div>
          <div className="transaction-cart-item-other">
            <div className="transaction-cart-other-wrapper">
              <TextInput
                onChange={(e) => {
                  let temp = cloneDeep(props.datas);
                  const found = temp.findIndex(
                    (val) =>
                      val.userId ===
                        props.login.user.userId &&
                      val.productId === props.data.productId
                  );
                  temp[found].buyQty = acceptNumericOnly(
                    e.target.value
                  );
                  props.dispatch(setItem(temp));
                  props.setDatas(temp);
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
  }, [props.data]);

const ShowItems = (props) => {
  const render = useCallback(
    () => (
      <Fragment>
        {[...props.datas].map((data, index) => (
          <ShowItem
            key={`transaction-cart-item-${index}`}
            index={index}
            data={data}
            login={props.login}
            datas={props.datas}
            setDatas={props.setDatas}
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
