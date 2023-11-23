import { setItem } from "../redux/reducers/cartReducer";

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
