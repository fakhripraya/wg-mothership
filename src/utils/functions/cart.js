export const handleCartArray = (
  newArray,
  oldArray,
  setDatas
) => {
  newArray.forEach((val) => {
    let alter = oldArray.find(
      (obj) => val.id === obj.productId
    );

    if (!alter) return;
    alter.productName = val.productName;
    alter.productPrice = val.productPrice;
    alter.productImageSrc = `${process.env.REACT_APP_CHRONOS_SERVICE}${val.MasterFiles[0].destination}`;
  });
  // and then map the cart items by the user id
  setDatas([...oldArray]);
};
