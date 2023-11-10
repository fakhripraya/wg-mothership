import React, {
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { formattedNumber } from "../../../utils/functions/global";
import Dropdown from "../../../components/DynamicDropdown";

const ShowItem = (props) =>
  useMemo(() => {
    function handleGoToProductPage() {
      window.location.href = `/product-detail?productId=${props.data.productId}`;
    }

    return (
      <Fragment>
        <br />
        <label
          onClick={() => handleGoToProductPage()}
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
            <Dropdown
              style={{
                width: "80px",
              }}
              toggle={true}
              title="Pengiriman : "
              values={["a"]}
            />
            <br />
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
              <span className="main-color">
                Rp.
                {formattedNumber(
                  props.data.buyQty *
                    props.data.productPrice
                )}
              </span>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.datas]
  );
  // return the memoized render function
  if (props.datas && props.datas.length > 0)
    return render();
  return null;
};

export default ShowItems;
