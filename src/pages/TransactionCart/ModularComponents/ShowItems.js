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

    const updateCartField = (
      dataArray,
      field,
      userId,
      productId,
      value
    ) => {
      const foundIndex = dataArray.findIndex(
        (val) =>
          val.userId === userId &&
          val.productId === productId
      );

      if (foundIndex !== -1) {
        dataArray[foundIndex][field] = value;
      }
    };

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
                const temp = cloneDeep(props.reduxDatas);
                const localTemp = cloneDeep(props.datas);

                updateCartField(
                  temp,
                  "buyingNote",
                  props.login.user.userId,
                  props.data.productId,
                  e.target.value
                );
                updateCartField(
                  localTemp,
                  "buyingNote",
                  props.login.user.userId,
                  props.data.productId,
                  e.target.value
                );

                props.dispatch(setItem(temp));
                props.setDatas(localTemp);
              }}
              className="transaction-cart-longtext-area dark-bg-color"
              value={props.data.buyingNote}
            />
          </div>
          <div className="transaction-cart-item-other">
            <div className="transaction-cart-other-wrapper">
              <TextInput
                onChange={(e) => {
                  const temp = cloneDeep(props.reduxDatas);
                  const localTemp = cloneDeep(props.datas);

                  updateCartField(
                    temp,
                    "buyQty",
                    props.login.user.userId,
                    props.data.productId,
                    acceptNumericOnly(e.target.value)
                  );
                  updateCartField(
                    localTemp,
                    "buyQty",
                    props.login.user.userId,
                    props.data.productId,
                    acceptNumericOnly(e.target.value)
                  );

                  props.dispatch(setItem(temp));
                  props.setDatas(localTemp);
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
        {[...props.datas].map((data, index) => (
          <ShowItem
            key={`transaction-cart-item-${index}`}
            index={index}
            data={data}
            login={props.login}
            datas={props.datas}
            reduxDatas={props.reduxDatas}
            setDatas={props.setDatas}
            dispatch={props.dispatch}
          />
        ))}
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.datas]
  );
  // return the memoized render function
  if (props.datas && props.datas.length > 0)
    return render();
  return null;
};

export default ShowItems;
