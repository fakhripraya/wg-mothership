import { Fragment, useCallback, useMemo } from "react";
import Avatar from "react-avatar";

const ShowNewPurchaseOrder = (props) =>
  useMemo(
    () => (
      <div className="creative-store-visitor-user darker-bg-color">
        <div className="creative-store-avatar-container">
          <div className="creative-store-identifier-img-wrapper">
            <Avatar
              style={{ cursor: "pointer" }}
              src={
                "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
              }
              size={60}
              title={props.value.productName}
              name={props.value.productName}
            />
          </div>
        </div>
        <div className="creative-store-visitor-user-text-container">
          <label className="main-color">
            {props.value.productName}
          </label>
          <small>Note: {props.value.orderNote}</small>
          <small>Qty: {props.value.orderQuantity}</small>
          <small>Total: {props.value.totalPrice}</small>
          <small>Kurir: {props.value.chosenCourier}</small>
        </div>
      </div>
    ),
    [props.value]
  );

const ShowNewPurchaseOrders = (props) => {
  const render = useCallback(
    () => (
      <Fragment>
        <div className="creative-store-scrollable-visitor-container">
          {props.datas &&
            Object.entries(props.datas).map(
              ([key, obj]) => {
                return (
                  <ShowNewPurchaseOrder
                    key={`creative-store-visitor-user-${key}`}
                    value={obj}
                  />
                );
              }
            )}
        </div>
      </Fragment>
    ),
    [props.datas]
  );

  // return the memoized render function
  return render();
};

export default ShowNewPurchaseOrders;
