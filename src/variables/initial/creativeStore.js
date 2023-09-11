export const dummyStoreInfo = {
  id: "39598421-3d00-493a-bd71-b197ec2c6a23",
  name: "dummy-store",
};

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

// export const initialLeftPanelDatas = [
//     {
//         id: 1,
//         title: "Informasi Toko",
//         data: [
//             {
//                 roomTitle: "📢︱announcement",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//             {
//                 roomTitle: "💸︱event-live",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//         ]
//     },
//     {
//         id: 2,
//         title: "Lounge",
//         data: [
//             {
//                 roomTitle: "🪐︱General Chat",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//             {
//                 roomTitle: "🪐︱Chat Resepsionis",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//             {
//                 roomId: '123',
//                 roomTitle: "🎧「Voice 1",
//                 roomType: "VOICE",
//                 roomMaxSocket: 10,
//                 roomSockets: []
//             },
//             {
//                 roomId: '1234',
//                 roomTitle: "🎧「Voice 2",
//                 roomType: "VOICE",
//                 roomMaxSocket: 10,
//                 roomSockets: {
//                     "anjing123": {
//                         "userId": "anjing123",
//                         "username": "fakhripraya@gasdmail.com",
//                         "fullName": "fakhripraya@gmasdasail.com",
//                         "phoneNumber": null,
//                         "email": "fakhripraya@gmail.com",
//                         "OTPVerified": true
//                     },
//                     "anjing1234": {
//                         "userId": "anjing1234",
//                         "username": "fakhripraya@anjing1234.com",
//                         "fullName": "fakhripraya@anjing1234.com",
//                         "phoneNumber": null,
//                         "email": "fakhripraya@gmail.com",
//                         "OTPVerified": true
//                     }
//                 }
//             },
//         ]
//     },
//     {
//         id: 3,
//         title: "Live Streaming",
//         data: [
//             {
//                 roomTitle: "🔥︱Baju Gamis",
//                 roomType: "LIVE_SPACE",
//                 roomMaxSocket: -1,
//                 roomSockets: []
//             },
//             {
//                 roomTitle: "🔥︱Sepatu High Heels",
//                 roomType: "LIVE_SPACE",
//                 roomMaxSocket: -1,
//                 roomSockets: []
//             },
//         ]
//     },
//     {
//         id: 4,
//         title: "Pelaporan",
//         data: [
//             {
//                 roomTitle: "🖥︱Lapor Transaksi",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//             {
//                 roomTitle: "📑︱Lapor Retur",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//             {
//                 roomId: '12345',
//                 roomTitle: "🎧「Bilik Lapor Privat",
//                 roomType: "VOICE",
//                 roomMaxSocket: 2,
//                 roomSockets: []
//             },
//         ]
//     },
//     {
//         id: 5,
//         title: "Masukan",
//         data: [
//             {
//                 roomTitle: "🖥︱Kasih kita masukan disini",
//                 roomType: "TEXT",
//                 roomChats: []
//             },
//         ]
//     },
// ]

export const initialChatTexts = [
  {
    user: {
      id: 1,
      fullname: "Pakpres",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 1,
        content: "Hai min",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 2,
        content: "Ini adalah message dummy dari aku",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 3,
        content: "maaf kalo spam ya!!",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
    ],
  },
  {
    user: {
      id: 2,
      fullname: "Fiori",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 4,
        content: "Hai min",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 5,
        content: "Ini adalah message dummy dari aku",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 6,
        content: "maaf kalo spam ya!!",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
    ],
  },
  {
    user: {
      id: 3,
      fullname: "Laksamana",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 7,
        content: "Hai min",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 8,
        content: "Ini adalah message dummy dari aku",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 9,
        content: "maaf kalo spam ya!!",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 10,
        content: "Hai min",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 11,
        content: "Ini adalah message dummy dari aku",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
      {
        id: 12,
        content: "maaf kalo spam ya!!",
        isImage: false,
        createdAt:
          new Date().toLocaleDateString() +
          " - " +
          new Date().toLocaleTimeString(),
      },
    ],
  },
  {
    user: {
      id: 1,
      fullname: "John Doe",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 1,
        content: "Hey, how are you?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:56 PM",
      },
      {
        id: 2,
        content: "I'm doing great! How about you?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:57 PM",
      },
      {
        id: 3,
        content: "I'm good too, thanks!",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:58 PM",
      },
      // ... up to 15 chat objects ...
    ],
  },
  {
    user: {
      id: 2,
      fullname: "Alice Johnson",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 4,
        content: "Hey, what's up?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:59 PM",
      },
      {
        id: 5,
        content: "Not much, just working on a project.",
        isImage: false,
        createdAt: "2023-07-19 - 12:35:00 PM",
      },
      {
        id: 6,
        content:
          "That sounds interesting! Tell me more about it.",
        isImage: false,
        createdAt: "2023-07-19 - 12:35:01 PM",
      },
      // ... up to 15 chat objects ...
    ],
  },
  {
    user: {
      id: 1,
      fullname: "John Doe",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 1,
        content: "Hey, how are you?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:56 PM",
      },
      {
        id: 2,
        content: "I'm doing great! How about you?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:57 PM",
      },
      {
        id: 3,
        content: "I'm good too, thanks!",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:58 PM",
      },
      // ... up to 15 chat objects ...
    ],
  },
  {
    user: {
      id: 2,
      fullname: "Alice Johnson",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 4,
        content: "Hey, what's up?",
        isImage: false,
        createdAt: "2023-07-19 - 12:34:59 PM",
      },
      {
        id: 5,
        content: "Not much, just working on a project.",
        isImage: false,
        createdAt: "2023-07-19 - 12:35:00 PM",
      },
      {
        id: 6,
        content:
          "That sounds interesting! Tell me more about it.",
        isImage: false,
        createdAt: "2023-07-19 - 12:35:01 PM",
      },
      // ... up to 15 chat objects ...
    ],
  },
  // ... 48 more objects ...

  {
    user: {
      id: 50,
      fullname: "Emma Watson",
      profilePictureURI: null,
    },
    chats: [
      {
        id: 148,
        content: "Hi there!",
        isImage: false,
        createdAt: "2023-07-19 - 12:37:05 PM",
      },
      {
        id: 149,
        content: "Hello! How are you doing?",
        isImage: false,
        createdAt: "2023-07-19 - 12:37:06 PM",
      },
      {
        id: 150,
        content: "I'm doing well. Thanks for asking!",
        isImage: false,
        createdAt: "2023-07-19 - 12:37:07 PM",
      },
      {
        id: 151,
        content: "That's great to hear!",
        isImage: false,
        createdAt: "2023-07-19 - 12:37:08 PM",
      },
      // ... up to 15 chat objects ...
    ],
  },
];

export const initialVisitors = [
  {
    fullname: "Fullan",
    statusMessage: "",
  },
  {
    fullname: "Wulling",
    statusMessage: "Sedang menjalin cinta",
  },
  {
    fullname: "BagasMetalica",
    statusMessage: "",
  },
  {
    fullname: "John Doe",
    statusMessage: "Gatau ah",
  },
];
