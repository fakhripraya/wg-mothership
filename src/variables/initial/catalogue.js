// MAIN
export const stockTypes = [
  "Buah",
  "Milligram",
  "Gram",
  "Kilogram",
  "MilliLiter",
  "Liter",
  "KiloLiter",
];

// ADD CATALOGUE
export const initialValue = {
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
  courierChoosen: ["Pilih Kurir"],
  newCatalogues: [],
};

export const initialFetchedDatas = {
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

export const weightList = ["Gram", "Kilogram"];
export const defaultCourier = "Pilih Kurir";

// DASHBOARD CATALOGUE
export const filterCheckboxes = [
  {
    title: "Active",
  },
  {
    title: "Non Active",
  },
];

export const filterDropdowns = [
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
