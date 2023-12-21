import { cloneDeep } from "lodash-es";
import { cookies } from "../../config/cookie";
import {
  CLIENT_USER_INFO,
  IS_OTP_VERIFIED,
  LOGIN,
} from "../../variables/global";
import { setItem } from "../redux/reducers/cartReducer";
import { handleOpenOverridingHome } from "./global";
import { PRODUCT_DETAIL_INITIAL_BUYING_NOTE } from "../../variables/initial/productDetail";

export const handleAddItemToCart = (
  navigate,
  dispatch,
  cart,
  productData,
  productImages,
  buyQty,
  buyingNote
) => {
  const login = cookies.get(CLIENT_USER_INFO, {
    path: "/",
  });

  if (!productData) return;
  if (!IS_OTP_VERIFIED(login))
    return handleOpenOverridingHome(LOGIN);
  if (buyQty <= 0) return alert("Qty kosong");

  let temp = cloneDeep(cart);
  if (!temp) temp = [];

  let cartItem = {
    userId: login.user.userId,
    storeId:
      productData.MasterStoreCatalogue.MasterStore.id,
    storeName:
      productData.MasterStoreCatalogue.MasterStore
        .storeName,
    storeImageSrc: `${process.env.REACT_APP_CHRONOS_SERVICE}${productData.MasterStoreCatalogue.MasterStore.MasterFiles.destination}`,
    productId: productData.id,
    productCode: productData.productCode,
    productName: productData.productName,
    productImageSrc: `${process.env.REACT_APP_CHRONOS_SERVICE}${productImages[0].destination}`,
    productPrice: productData.productPrice,
    buyQty: buyQty,
    buyingNote:
      buyingNote || PRODUCT_DETAIL_INITIAL_BUYING_NOTE,
  };

  let foundExisting = temp.findIndex(
    (val) =>
      val.userId === login.user.userId &&
      val.productId === cartItem.productId
  );

  if (foundExisting !== -1) temp[foundExisting] = cartItem;
  else temp.push(cartItem);

  setCartStateAndBroadcast(dispatch, [...temp]);
  navigate("/transaction/cart");
};

export const setCartStateAndBroadcast = (dispatch, val) => {
  dispatch(setItem([...val]));
  const channel = new BroadcastChannel(
    "REDUX_UPDATER_CHANNEL"
  );
  channel.postMessage({
    type: "CART_UPDATE",
    payload: [...val],
  });
};

export const updateCartField = (
  dataArray,
  field,
  userId,
  productId,
  value
) => {
  const foundIndex = dataArray.findIndex(
    (val) =>
      val.userId === userId && val.productId === productId
  );

  if (foundIndex !== -1) {
    dataArray[foundIndex][field] = value;
  }
};

export const handleCartArray = (
  newArray,
  oldArray,
  dispatch
) => {
  console.log(newArray);
  console.log(oldArray);
  // Filter out items that no longer exist in the database
  const synchronizedArray = oldArray.filter((x) =>
    newArray.some((y) => y.id === x.productId)
  );

  // Update the synchronized items
  synchronizedArray.forEach((x) => {
    const updateItem = newArray.find(
      (y) => y.id === x.productId
    );
    if (updateItem) {
      x.productName = updateItem.productName;
      x.productPrice = updateItem.productPrice;
      const availableCourierList = JSON.parse(
        updateItem.availableCourierList
      );
      x.availableCourierList = availableCourierList;
      if (!x.selectedCourierList)
        x.selectedCourierList = availableCourierList[0];
      x.productImageSrc = `${process.env.REACT_APP_CHRONOS_SERVICE}${updateItem.MasterFiles[0].destination}`;
    }
  });

  // Set the updated array
  setCartStateAndBroadcast(dispatch, [
    ...synchronizedArray,
  ]);
};
