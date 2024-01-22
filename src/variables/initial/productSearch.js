import {
  FILTER_BUTTON_ELEMENT,
  FILTER_COURIER,
  OPEN_LOCATION_MODAL,
  OPEN_MODAL,
  FILTER_RATING,
  FILTER_STORE_LOCATION,
  FILTER_STORE_LEVEL,
  MAX_PRICE_FILTER_TRESHOLD,
} from "../constants/productSearch";

export const PRODUCT_SEARCH_FILTER_DATA_OPTIONS = [
  {
    title: "Jenis Toko",
    filter: FILTER_STORE_LEVEL,
    data: [
      {
        key: `${FILTER_STORE_LEVEL}-3`,
        title: "Official",
        value: "4",
      },
      {
        key: `${FILTER_STORE_LEVEL}-2`,
        title: "Trusted",
        value: "3",
      },
      {
        key: `${FILTER_STORE_LEVEL}-1`,
        title: "Verified",
        value: "2",
      },
      {
        key: `${FILTER_STORE_LEVEL}-0`,
        title: "Tidak Ada Reputasi",
        value: "1",
      },
    ],
  },
  {
    title: "Rating",
    filter: FILTER_RATING,
    data: [
      {
        key: `${FILTER_RATING}-4`,
        title: "4-5 ★★★★★",
        value: "4",
      },
      {
        key: `${FILTER_RATING}-3`,
        title: "3-4 ★★★★",
        value: "3",
      },
      {
        key: `${FILTER_RATING}-2`,
        title: "2-3 ★★★",
        value: "2",
      },
      {
        key: `${FILTER_RATING}-1`,
        title: "1-2 ★★",
        value: "1",
      },
      {
        key: `${FILTER_RATING}-0`,
        title: "0-1 ★",
        value: "0",
      },
    ],
  },
  {
    title: "Lokasi Toko",
    filter: FILTER_STORE_LOCATION,
    data: [
      {
        key: `${FILTER_STORE_LOCATION}-3`,
        title: "DKI Jakarta",
        value: "DKI Jakarta",
      },
      {
        key: `${FILTER_STORE_LOCATION}-2`,
        title: "Jember",
        value: "Jember",
      },
      {
        key: `${FILTER_STORE_LOCATION}-1`,
        title: "Palembang",
        value: "Palembang",
      },
      {
        key: `${FILTER_STORE_LOCATION}-0`,
        title: "Lihat Lebih",
        type: FILTER_BUTTON_ELEMENT,
        commandType: OPEN_MODAL,
        command: OPEN_LOCATION_MODAL,
      },
    ],
  },
  {
    title: "Kurir",
    filter: FILTER_COURIER,
    data: [
      {
        key: `${FILTER_COURIER}-3`,
        title: "Gojek",
        value: "Gojek",
      },
      {
        key: `${FILTER_COURIER}-2`,
        title: "Grab",
        value: "Grab",
      },
      {
        key: `${FILTER_COURIER}-1`,
        title: "JNT",
        value: "JNT",
      },
      {
        key: `${FILTER_COURIER}-0`,
        title: "Ekspedisi Lainnya",
        value: "Ekspedisi Lainnya",
      },
    ],
  },
];

export const PRODUCT_SEARCH_FILTER_VALUES = [];
export const PRODUCT_PRICE_FILTER_VALUES = {
  min: 0,
  max: MAX_PRICE_FILTER_TRESHOLD,
};
