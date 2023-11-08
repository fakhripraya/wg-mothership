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
        <label
          onClick={() => handleGoToCreativeStore()}
          className="font-bold main-color cursor-pointer">
          {props.data.productName}
        </label>
        <label style={{ marginBottom: "8px" }}>
          {props.data.productCode}
        </label>
        <div className="transaction-payment-item">
          <div className="transaction-payment-item-image-container">
            <img
              className="transaction-payment-item-image"
              src={props.data.productImageSrc}
              alt={props.data.productImageSrc}
            />
          </div>
          <div className="transaction-payment-item-other">
            <div className="transaction-payment-other-wrapper">
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
                className="transaction-payment-input-text"
                value={formattedNumber(
                  removeLeadingZeros(props.data.buyQty)
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
        {[...props.datas].map((data, index) => (
          <ShowItem
            key={`transaction-payment-item-${index}`}
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
