import React, { useEffect, useMemo } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";
import { KEY_CART } from "../../variables/global";
import ShowConditionalMemoized from "./ModularComponents/ShowConditionalMemoized";

export default function TransactionCart() {
  let datas = localStorage.getItem(KEY_CART);

  useEffect(() => {
    smoothScrollTop();
  }, []);

  return useMemo(
    () => <ShowConditionalMemoized datas={datas} />,
    [localStorage.getItem(KEY_CART)]
  );
}
