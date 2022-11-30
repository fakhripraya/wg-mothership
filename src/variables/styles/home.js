export const getBalanceTools = () => {
    return [
        {
            name: "Top Up",
            desc: "Click here"
        },
        {
            name: "Transfer",
            desc: "Click here"
        },
        {
            name: "Promos",
            desc: "See all"
        },
    ]
}

export const getRecommendedGraphicRendering = () => {
    return [
        {
            name: "Nvidia Tesla P100",
        },
        {
            name: "Nvidia Quadro RTX 4000",
        },
        {
            name: "Nvidia Quadro RTX 5000",
        },
        {
            name: "Nvidia Quadro RTX 6000",
        },
        {
            name: "Nvidia Quadro RTX 8000",
        },
    ]
}

export const getRecommendedGaming = () => {
    return [
        {
            name: "Nvidia RTX 3090",
        },
        {
            name: "Nvidia RTX 3080",
        },
        {
            name: "Nvidia RTX 2080",
        },
        {
            name: "Nvidia RTX 2060",
        },
        {
            name: "Nvidia GTX 1660",
        },
    ]
}

export const getRecommended = () => {
    return [
        {
            url: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
            name: "Nvidia RTX 3090",
            price: "$8.99",
            location: "Jakarta Selatan",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
        },
        {
            url: "https://www.shutterstock.com/image-photo/computer-water-cooling-systeminside-air-600w-1210381663.jpg",
            name: "Nvidia RTX 3080",
            price: "$2.99",
            location: "Jakarta Timur",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
        },
        {
            url: "https://www.shutterstock.com/image-photo/computer-water-cooling-systeminside-air-260nw-1210381657.jpg",
            name: "Nvidia RTX 3070",
            price: "$5.99",
            location: "Bekasi",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
        },
        {
            url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140061.jpg",
            name: "Nvidia RTX 3060",
            price: "$4.99",
            location: "Jayapura",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
        },
        {
            url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140058.jpg",
            name: "Nvidia RTX 2060",
            price: "$1.99",
            location: "Makassar",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
        },
    ]
}

export const getGridItems = () => {
    return [
        {
            url: "https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg",
            name: "Nvidia RTX 3090",
            price: "$8.99",
            location: "Jakarta Selatan",
            desc: "Lorem ipsum, dolor sit amet ",
        },
        {
            url: "https://www.shutterstock.com/image-photo/computer-water-cooling-systeminside-air-600w-1210381663.jpg",
            name: "Nvidia RTX 3080",
            price: "$2.99",
            location: "Jakarta Timur",
            desc: "Lorem ipsum, dolor sit amet ",
        },
        {
            url: "https://www.shutterstock.com/image-photo/computer-water-cooling-systeminside-air-260nw-1210381657.jpg",
            name: "Nvidia RTX 3070",
            price: "$5.99",
            location: "Bekasi",
            desc: "Lorem ipsum, dolor sit amet",
        },
        {
            url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140061.jpg",
            name: "Nvidia RTX 3060",
            price: "$4.99",
            location: "Jayapura",
            desc: "Lorem ipsum, dolor sit amet",
        },
        {
            url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140061.jpg",
            name: "Nvidia RTX 3060",
            price: "$4.99",
            location: "Jayapura",
            desc: "Lorem ipsum, dolor sit amet",
        }
    ]
}

export const getGrid = () => {
    return [
        {
            className: "home-first-recommend-wrapper",
            arrayFunc: () => getGridItems()
        },
        {
            arrayFunc: () => getGridItems()
        },
        {
            arrayFunc: () => getGridItems()
        },
        {
            arrayFunc: () => getGridItems()
        },
        {
            arrayFunc: () => getGridItems()
        },
    ]
}