import { Fragment, useMemo } from "react";
import { IS_OTP_VERIFIED } from "../../../variables/global";
import ICCart from "../../../assets/svg/cart-icon.svg";
import { handlePageNavigation } from "../../../utils/functions/global";

export const ShowCartCount = (props) =>
  useMemo(() => {
    const ifOverriding = props.isOverriding && {
      position: "relative",
      left: "20px",
    };

    return (
      <div
        style={{
          verticalAlign: "super",
        }}>
        <span
          style={{
            color: props.isGreen ? "#0DA34D" : "#fff",
            fontSize: "0.8em",
            fontWeight: "bold",
            ...ifOverriding,
          }}>
          {props.cart && props.cart.length}
        </span>
      </div>
    );
  }, [props.isOverriding, props.cart]);

export const ShowCart = (props) =>
  useMemo(
    () =>
      IS_OTP_VERIFIED(props.login) && (
        <Fragment>
          <ShowCartCount
            isOverriding={props.isOverriding}
            isGreen={true}
            cart={props.cart}
          />
          <img
            onClick={() =>
              handlePageNavigation("/transaction/cart")
            }
            style={{ marginRight: "12px" }}
            className={`navbar-mobile-hamburger-image ${props.className}`}
            src={ICCart}
            alt="ic_cart"
          />
        </Fragment>
      ),
    [props.login, props.cart]
  );
