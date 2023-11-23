// ALL CATALOGUE PAGES
export const CATALOGUE_STOCK_TYPE_OPTIONS = [
  "Buah",
  "Milligram",
  "Gram",
  "Kilogram",
  "MilliLiter",
  "Liter",
  "KiloLiter",
];

// ADD CATALOGUE
export const ADD_CATALOGUE_INITIAL_COURIER_VALUE =
  "Pilih Kurir";

export const ADD_CATALOGUE_INITIAL_VALUE = {
  productName: "",
  productCategory: "Pilih Kategori",
  productCatalog: "Pilih Katalog",
  productDescription: "",
  productHashtag: "",
  productCondition: "",
  productWeight: "",
  productWeightUnit: "Kilogram",
  productPrice: "",
  productStocks: "",
  productSafetyStocks: "",
  courierChoosen: [ADD_CATALOGUE_INITIAL_COURIER_VALUE],
  newCatalogues: [],
};

export const ADD_CATALOGUE_INITIAL_FETCHED_DATAS = {
  datas: {
    catalogues: [],
    categories: [],
    couriers: [],
  },
  dropdowns: {
    catalogues: [],
    categories: [],
    couriers: [],
  },
};

export const ADD_CATALOGUE_WEIGHTUNIT_OPTIONS = [
  "Gram",
  "Kilogram",
];

// DASHBOARD CATALOGUE
export const DASHBOARD_CATALOGUE_FILTER_CHECKBOXES = [
  {
    title: "Active",
  },
  {
    title: "Non Active",
  },
];

export const DASHBOARD_CATALOGUE_FILTER_DROPDOWNS = [
  {
    showTitle: true,
    toggle: true,
    values: [
      "Semua",
      "Views Terbanyak",
      "Views Tersedikit",
    ],
  },
  {
    showTitle: false,
    toggle: true,
    values: ["Semua", "Terlaris", "Tidak Laris"],
  },
  {
    showTitle: false,
    toggle: true,
    values: ["Semua", "Stock Tipis", "Stock Banyak"],
  },
];
