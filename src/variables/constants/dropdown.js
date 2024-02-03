import {
  SORT_KEY_NEW,
  SORT_KEY_PRICE_ASC,
  SORT_KEY_PRICE_DESC,
  SORT_KEY_RATING,
} from "./productSearch";

export const PRODUCT_SORT_OPTIONS = [
  {
    key: SORT_KEY_NEW,
    field: "createdAt",
    value: "DESC",
  },
  {
    key: SORT_KEY_RATING,
    field: "productRating",
    value: "DESC",
  },
  {
    key: SORT_KEY_PRICE_ASC,
    field: "productPrice",
    value: "ASC",
  },
  {
    key: SORT_KEY_PRICE_DESC,
    field: "productPrice",
    value: "DESC",
  },
];
