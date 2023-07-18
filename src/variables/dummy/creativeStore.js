export const initialRooms = [
    {
        title: "Informasi Toko",
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
    {
        title: "Masukan",
        data: [
            {
                roomTitle: "🖥︱Kasih kita masukan disini",
                roomType: "TEXT",
                roomChats: []
            },
        ]
    },
]

export const initialChatTexts = [
    {
        user: {
            id: 1,
            fullname: "Pakpres",
            profilePictureURI: null
        },
        chats: [
            {
                id: 1,
                content: "Hai min",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 2,
                content: "Ini adalah message dummy dari aku",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 3,
                content: "maaf kalo spam ya!!",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
        ]
    },
    {
        user: {
            id: 2,
            fullname: "Fiori",
            profilePictureURI: null
        },
        chats: [
            {
                id: 4,
                content: "Hai min",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 5,
                content: "Ini adalah message dummy dari aku",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 6,
                content: "maaf kalo spam ya!!",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
        ]
    },
    {
        user: {
            id: 3,
            fullname: "Laksamana",
            profilePictureURI: null
        },
        chats: [
            {
                id: 7,
                content: "Hai min",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 8,
                content: "Ini adalah message dummy dari aku",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 9,
                content: "maaf kalo spam ya!!",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 10,
                content: "Hai min",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 11,
                content: "Ini adalah message dummy dari aku",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
            {
                id: 12,
                content: "maaf kalo spam ya!!",
                isImage: false,
                createdAt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()
            },
        ]
    }, {
        "user": {
            "id": 1,
            "fullname": "John Doe",
            "profilePictureURI": null
        },
        "chats": [
            {
                "id": 1,
                "content": "Hey, how are you?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:56 PM"
            },
            {
                "id": 2,
                "content": "I'm doing great! How about you?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:57 PM"
            },
            {
                "id": 3,
                "content": "I'm good too, thanks!",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:58 PM"
            },
            // ... up to 15 chat objects ...
        ]
    },
    {
        "user": {
            "id": 2,
            "fullname": "Alice Johnson",
            "profilePictureURI": null
        },
        "chats": [
            {
                "id": 4,
                "content": "Hey, what's up?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:59 PM"
            },
            {
                "id": 5,
                "content": "Not much, just working on a project.",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:35:00 PM"
            },
            {
                "id": 6,
                "content": "That sounds interesting! Tell me more about it.",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:35:01 PM"
            },
            // ... up to 15 chat objects ...
        ]
    }, {
        "user": {
            "id": 1,
            "fullname": "John Doe",
            "profilePictureURI": null
        },
        "chats": [
            {
                "id": 1,
                "content": "Hey, how are you?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:56 PM"
            },
            {
                "id": 2,
                "content": "I'm doing great! How about you?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:57 PM"
            },
            {
                "id": 3,
                "content": "I'm good too, thanks!",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:58 PM"
            },
            // ... up to 15 chat objects ...
        ]
    },
    {
        "user": {
            "id": 2,
            "fullname": "Alice Johnson",
            "profilePictureURI": null
        },
        "chats": [
            {
                "id": 4,
                "content": "Hey, what's up?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:34:59 PM"
            },
            {
                "id": 5,
                "content": "Not much, just working on a project.",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:35:00 PM"
            },
            {
                "id": 6,
                "content": "That sounds interesting! Tell me more about it.",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:35:01 PM"
            },
            // ... up to 15 chat objects ...
        ]
    },
    // ... 48 more objects ...

    {
        "user": {
            "id": 50,
            "fullname": "Emma Watson",
            "profilePictureURI": null
        },
        "chats": [
            {
                "id": 148,
                "content": "Hi there!",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:37:05 PM"
            },
            {
                "id": 149,
                "content": "Hello! How are you doing?",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:37:06 PM"
            },
            {
                "id": 150,
                "content": "I'm doing well. Thanks for asking!",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:37:07 PM"
            },
            {
                "id": 151,
                "content": "That's great to hear!",
                "isImage": false,
                "createdAt": "2023-07-19 - 12:37:08 PM"
            },
            // ... up to 15 chat objects ...
        ]
    }
]

export const initialVisitors = [
    {
        fullname: "Fullan",
        userRank: "Newcomer"
    },
    {
        fullname: "Wulling",
        userRank: "Veteran"
    },
    {
        fullname: "BagasMetalica",
        userRank: "Master"
    },
    {
        "fullname": "John Doe",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Alice Johnson",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Michael Smith",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Emily Williams",
        "userRank": "Newcomer"
    },
    {
        "fullname": "David Brown",
        "userRank": "Newcomer"
    },
    // ... 45 more objects ...

    {
        "fullname": "Sophia Lee",
        "userRank": "Newcomer"
    },
    {
        "fullname": "John Doe",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Alice Johnson",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Michael Smith",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Emily Williams",
        "userRank": "Newcomer"
    },
    {
        "fullname": "David Brown",
        "userRank": "Newcomer"
    },
    // ... 45 more objects ...

    {
        "fullname": "Sophia Lee",
        "userRank": "Newcomer"
    },
    {
        "fullname": "John Doe",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Alice Johnson",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Michael Smith",
        "userRank": "Newcomer"
    },
    {
        "fullname": "Emily Williams",
        "userRank": "Newcomer"
    },
    {
        "fullname": "David Brown",
        "userRank": "Newcomer"
    },
    // ... 45 more objects ...

    {
        "fullname": "Sophia Lee",
        "userRank": "Newcomer"
    }
]