export const initialLeftPanelDatas = {
  1: {
    channelId: 1,
    channelTitle: "Informasi Toko",
    channelRooms: {
      "Info-toko-1": {
        roomId: "Info-toko-1",
        roomTitle: "📢︱announcement",
        roomType: "TEXT",
        roomChats: {},
      },
      "Info-toko-2": {
        roomId: "Info-toko-2",
        roomTitle: "💸︱event-live",
        roomType: "TEXT",
        roomChats: {},
      },
    },
  },
  2: {
    channelId: 2,
    channelTitle: "Lounge",
    channelRooms: {
      "Lounge-1": {
        roomId: "Lounge-1",
        roomTitle: "🪐︱General Chat",
        roomType: "TEXT",
        roomChats: {},
      },
      "Lounge-2": {
        roomId: "Lounge-2",
        roomTitle: "🪐︱Chat Resepsionis",
        roomType: "TEXT",
        roomChats: {},
      },
      "Lounge-3": {
        roomId: "Lounge-3",
        roomTitle: "🎧「Voice 1",
        roomType: "VOICE",
        roomMaxSocket: 10,
        roomSockets: {},
      },
      "Lounge-4": {
        roomId: "Lounge-4",
        roomTitle: "🎧「Voice 2",
        roomType: "VOICE",
        roomMaxSocket: 10,
        roomSockets: {
          // "dummy-1": {
          //   userId: "dummy-1",
          //   username: "fakhripraya@gmail.com",
          //   fullName: "fakhripraya@gmail.com",
          //   phoneNumber: null,
          //   email: "fakhripraya@gmail.com",
          //   OTPVerified: true,
          // },
        },
      },
    },
  },
  3: {
    channelId: 3,
    channelTitle: "Pelaporan",
    channelRooms: {
      "Pelaporan-1": {
        roomId: "Pelaporan-1",
        roomTitle: "🖥︱Lapor Transaksi",
        roomType: "TEXT",
        roomChats: {},
      },
      "Pelaporan-2": {
        roomId: "Pelaporan-2",
        roomTitle: "📑︱Lapor Retur",
        roomType: "TEXT",
        roomChats: {},
      },
      "Pelaporan-3": {
        roomId: "Pelaporan-3",
        roomTitle: "🎧「Bilik Lapor Privat",
        roomType: "VOICE",
        roomMaxSocket: 10,
        roomSockets: {},
      },
    },
  },
};

export const initialPurchaseOrders = [
  {
    productName: "Boneka Fullan horror",
    orderNote:
      "Bang tolong boneka fullan ini yang warna coklat sama abu abu",
    orderQuantity: 2,
    totalPrice: 89000,
    chosenCourier: "Gojek",
  },
  {
    productName: "Mobil miniatur wulling",
    orderNote: "Bang beli wullingnya 3 ya",
    orderQuantity: 3,
    totalPrice: 12000,
    chosenCourier: "Gojek",
  },
  {
    productName: "Tas selempang kulit naga",
    orderNote: "Tolong packing rapih",
    orderQuantity: 1,
    totalPrice: 39000,
    chosenCourier: "Gojek",
  },
  {
    productName: "Tas snapbag",
    orderNote: "Please cepetan sampenya",
    orderQuantity: 1,
    totalPrice: 12500,
    chosenCourier: "Gojek",
  },
];
