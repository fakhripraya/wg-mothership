export const initialValue = {
  productName: "",
  productCategory: "Pilih Kategori",
  productCatalog: "Pilih Katalog",
  productDescription: "",
  productHashtag: "",
  productCondition: "",
  productWeight: "",
  productWeightUnit: "/ Kilogram",
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

export const weightList = ["/ Gram", "/ Kilogram"];

export const defaultPrice = {
  price: 0,
  period: "/ Hari",
};

export const defaultCourier = "Pilih Kurir";

export const filterCheckboxes = [
  {
    title: "Active",
  },
  {
    title: "Non Active",
  },
];

export const pricePeriodValues = [
  "/ Hari",
  "/ 3 Hari",
  "/ 7 Hari",
  "/ 15 Hari",
  "/ 30 Hari",
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

export const dumnmyValue = [
  {
    productName: "Pc kuwat RTX 3080 Cocok untuk render",
    productCode: "1234567890",
    productImg: {
      alt: "pict-1",
      src: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
    },
    productType: "Physical Rental",
    productDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!",
    productCategory: "Elektronik",
    productDisplayCategory: "Komputer",
    productHashtag:
      "#Pinjem gratis #pinjem pinjem #ayolah cok",
    productCondition: "Baru",
    productWeight: "150 Kg",
    productPrices: [
      {
        price: 12000,
        period: "/ Hari",
      },
      {
        price: 30000,
        period: "/ 3 Hari",
      },
      {
        price: 70000,
        period: "/ 7 Hari",
      },
    ],
    productStocks: 20,
    pickupCity: "Jakarta Selatan",
    pickupSubdistrict: "Kebayoran Lama",
    pickupWard: "Kebayoran Lama Utara",
    pickupAddress: "Jl. Pelita No.1 RT 15 RW 8",
    pickupPostalCode: "12240",
    productMaxWaitTime: "3",
    productMaxWaitTimePeriod: "/ Jam",
    courierChoosen: ["JNE"],
    rentDetail: {
      views: 43,
      rented: 5,
      totalRentedCounts: 15,
      status: "ACTIVE",
    },
    CreatedAt: "12-02-2022",
    CreatedBy: "SYSTEM",
  },
  {
    productName:
      "Pc kuwat RTX 4080 Mantap banget pokonya cok",
    productCode: "1234567890",
    productImg: {
      alt: "pict-1",
      src: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
    },
    productType: "Physical Rental",
    productDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!",
    productCategory: "Elektronik",
    productDisplayCategory: "Komputer",
    productHashtag:
      "#Pinjem gratis #pinjem pinjem #ayolah cok",
    productCondition: "Baru",
    productWeight: "150 Kg",
    productPrices: [
      {
        price: 12000,
        period: "/ Hari",
      },
      {
        price: 30000,
        period: "/ 3 Hari",
      },
    ],
    productStocks: 32,
    pickupCity: "Jakarta Selatan",
    pickupSubdistrict: "Kebayoran Lama",
    pickupWard: "Kebayoran Lama Utara",
    pickupAddress: "Jl. Pelita No.1 RT 15 RW 8",
    pickupPostalCode: "12240",
    productMaxWaitTime: "3",
    productMaxWaitTimePeriod: "/ Jam",
    courierChoosen: ["JNE", "SiCepat"],
    rentDetail: {
      views: 5,
      rented: 12,
      totalRentedCounts: 23,
      status: "ACTIVE",
    },
    CreatedAt: "12-02-2022",
    CreatedBy: "SYSTEM",
  },
];
