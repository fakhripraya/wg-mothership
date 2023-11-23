export const PURCHASE_ORDER_FILTER_CHECKBOXES = [
  {
    title: "Semua Pesanan",
  },
  {
    title: "Baru",
  },
  {
    title: "Siap Diantar",
  },
  {
    title: "Dalam Pengiriman",
  },
  {
    title: "Dikomplain",
  },
  {
    title: "Selesai",
  },
  {
    title: "Dibatalkan",
  },
];

export const PURCHASE_ORDER_FILTER_DROPDOWN = [
  {
    showTitle: true,
    toggle: true,
    values: ["Semua", "SiCepat", "JNE"],
  },
  {
    showTitle: false,
    toggle: true,
    values: ["Semua", "Terbaru", "Terlama"],
  },
  {
    showTitle: false,
    toggle: true,
    values: ["Semua", "Termahal", "Termurah"],
  },
];

export const PURCHASE_ORDER_DATA_DUMMY = [
  {
    productName: "Pc kuwat RTX 3080 Cocok untuk render",
    productCode: "70001081280111698",
    productImg: {
      alt: "pict-1",
      src: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
    },
    productType: "Physical Rental",
    transactionCode: "WGNV/20230206/MPL/3029629779",
    transactionCourier: "SiCepat",
    transactionRentalDuration: "5 Hari",
    transactionRentalPricing: {
      price: 12000,
      period: "/ Hari",
    },
    transactionNote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nam iste debitis aut eligendi error pariatur necessitatibus tenetur, ipsa, facere, reiciendis quasi sit voluptatibus atque placeat in consequatur exercitationem corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a laudantium consequuntur. Magni accusantium totam est corrupti nemo eius, doloribus asperiores rem quas fugit quasi pariatur aperiam ad neque incidunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cupiditate deserunt natus deleniti nemo sunt nobis doloremque nesciunt rerum. Cum explicabo ea natus inventore esse numquam ad placeat facere modi!",
    totalRentedCounts: 15,
    status: "BARU",
    CreatedAt: "12-02-2022",
    CreatedBy: "SYSTEM",
  },
  {
    productName: "Pc kuwat RTX 3080 Cocok untuk render",
    productCode: "70001081522398773",
    productImg: {
      alt: "pict-1",
      src: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
    },
    productType: "Physical Rental",
    transactionCode: "WMPV/90002983/MJJ/39873689373",
    transactionCourier: "JNE",
    transactionRentalDuration: "15 Hari",
    transactionRentalPricing: {
      price: 25000,
      period: "/ 3 Hari",
    },
    transactionNote:
      "Mas saya kan pesen 10 tolong dipackingnya pisah 2 2 ya mas jangan 1 package sekaligus, trims.",
    totalRentedCounts: 15,
    status: "SIAP DIANTAR",
    CreatedAt: "12-02-2022",
    CreatedBy: "SYSTEM",
  },
];
