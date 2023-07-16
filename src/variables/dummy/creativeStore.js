export const initialRooms = [
    {
        title: "Informasi Tokoasdddddddddddddddd",
        data: [
            {
                roomTitle: "📢︱announcement",
                roomType: "TEXT",
                roomChats: [
                    ""
                ]
            },
            {
                roomTitle: "💸︱event-live",
                roomType: "TEXT",
                roomChats: []
            },
        ]
    },
    {
        title: "Lounge",
        data: [
            {
                roomTitle: "🪐︱General Chat",
                roomType: "TEXT",
                roomChats: []
            },
            {
                roomTitle: "🪐︱Chat Resepsionis",
                roomType: "TEXT",
                roomChats: []
            },
            {
                roomTitle: "🎧「Voice 1",
                roomType: "VOICE",
                roomMaxSocket: 10,
                roomSockets: [
                    {
                        name: "user 1"
                    },
                    {
                        name: "user 2"
                    },
                ]
            },
            {
                roomTitle: "🎧「Voice 2",
                roomType: "VOICE",
                roomMaxSocket: 10,
                roomSockets: [
                    {
                        name: "user 1"
                    },
                ]
            },
        ]
    },
    {
        title: "Live Streaming",
        data: [
            {
                roomTitle: "🔥︱Baju Gamis",
                roomType: "LIVE_SPACE",
                roomMaxSocket: -1,
                roomSockets: []
            },
            {
                roomTitle: "🔥︱Sepatu High Heels",
                roomType: "LIVE_SPACE",
                roomMaxSocket: -1,
                roomSockets: []
            },
        ]
    },
    {
        title: "Pelaporan",
        data: [
            {
                roomTitle: "🖥︱Lapor Transaksi",
                roomType: "TEXT",
                roomChats: []
            },
            {
                roomTitle: "📑︱Lapor Retur",
                roomType: "TEXT",
                roomChats: []
            },
            {
                roomTitle: "🎧「Bilik Lapor Privat",
                roomType: "VOICE",
                roomMaxSocket: 2,
                roomSockets: [
                    {
                        name: "staff 1"
                    },
                    {
                        name: "user 1"
                    },
                ]
            },
        ]
    },
]