import React, {
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { formattedNumber } from "../../../utils/functions/global";
import Dropdown from "../../../components/DynamicDropdown";
import {
  setCartStateAndBroadcast,
  updateCartField,
} from "../../../utils/functions/cart";
import { cloneDeep } from "lodash-es";

const ShowItem = (props) =>
  useMemo(() => {
    function handleGoToProductPage() {
      window.location.href = `/product-detail?productId=${props.data.productId}`;
    }
    function handleCheckExpeditionAvailability() {
      const found = props.data?.availableCourierList.find(
        (val) => props.data?.selectedCourierList === val
      );

      if (found) return props.data.selectedCourierList;
      else return props.data.availableCourierList[0];
    }

    return (
      <Fragment>
        <div className="breakline" />
        <label
          onClick={() => handleGoToProductPage()}
          className="font-bold main-color cursor-pointer margin-bottom-8">
          {props.data.productName}
        </label>
        <label className="margin-bottom-8 margin-top-0">
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
            <Dropdown
              onChange={(val) => {
                const temp = cloneDeep(props.reduxDatas);

                updateCartField(
                  temp,
                  "selectedCourierList",
                  props.login.user.userId,
                  props.data.productId,
                  val
                );

                setCartStateAndBroadcast(props.dispatch, [
                  ...temp,
                ]);
              }}
              style={{
                width: "80px",
              }}
              toggle={true}
              title="Pengiriman : "
              value={handleCheckExpeditionAvailability()}
              values={props.data.availableCourierList}
            />
            <div className="breakline" />
            <label style={{ marginBottom: "8px" }}>
              Harga Per Item :&nbsp;Rp.
              {formattedNumber(props.data.productPrice)}
            </label>
            <label style={{ marginBottom: "8px" }}>
              Jumlah Item :&nbsp;
              {formattedNumber(props.data.buyQty)}
              &nbsp;Buah
            </label>
            <label style={{ marginBottom: "8px" }}>
              Subtotal :&nbsp;
              <span className="main-color font-bold">
                Rp.
                {formattedNumber(
                  props.data.buyQty *
                    props.data.productPrice
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="breakline" />
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
        {[...props.filteredDatas].map((data, index) => (
          <ShowItem
            key={`transaction-payment-item-${index}`}
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
