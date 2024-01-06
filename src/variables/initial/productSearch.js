import {
  BUTTON,
  OPEN_CATEGORY_MODAL,
  OPEN_LOCATION_MODAL,
  OPEN_MODAL,
} from "../constants/productSearch";

export const PRODUCT_SEARCH_FILTER_DATA_OPTIONS = [
  {
    title: "Jenis",
    data: [
      {
        title: "Official",
      },
      {
        title: "Trusted",
      },
      {
        title: "Verified",
      },
      {
        title: "Tidak Ada Reputasi",
      },
    ],
  },
  {
    title: "Kategori",
    data: [
      {
        title: "Peralatan Dapur",
      },
      {
        title: "Lain - Lain",
      },
      {
        title: "Hardware",
      },
      {
        title: "Aksesoris",
      },
      {
        title: "Lihat Lebih",
        type: BUTTON,
        commandType: OPEN_MODAL,
        command: OPEN_CATEGORY_MODAL,
      },
    ],
  },
  {
    title: "Rating",
    data: [
      {
        title: "4-5 ★★★★★",
      },
      {
        title: "3-4 ★★★★",
      },
      {
        title: "2-3 ★★★",
      },
      {
        title: "1-2 ★★",
      },
      {
        title: "0-1 ★",
      },
      {
        title: "Tanpa Review",
      },
    ],
  },
  {
    title: "Lokasi Toko",
    data: [
      {
        title: "Jakarta Selatan",
      },
      {
        title: "Jember",
      },
      {
        title: "Palembang",
      },
      {
        title: "Lihat Lebih",
        type: BUTTON,
        commandType: OPEN_MODAL,
        command: OPEN_LOCATION_MODAL,
      },
    ],
  },
  {
    title: "Kurir",
    data: [
      {
        title: "Gojek",
      },
      {
        title: "Grab",
      },
      {
        title: "JNT",
      },
      {
        title: "Ekspedisi Lainnya",
      },
    ],
  },
];

export const PRODUCT_SEARCH_FILTER_VALUES = [];
