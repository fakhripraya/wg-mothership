export const GET_BALANCE_TOOLS = () => {
  return [
    {
      name: "Top Up",
      desc: "Klik disini",
    },
    {
      name: "Transfer",
      desc: "Klik disini",
    },
    {
      name: "Promo",
      desc: "Lihat Semua",
    },
  ];
};

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
    {
      name: "Nvidia Quadro RTX 9000",
    },
    {
      name: "Nvidia Quadro RTX 10000",
    },
  ];
};

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
    {
      name: "Nvidia GTX 1060",
    },
  ];
};

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
    {
      url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140058.jpg",
      name: "Nvidia GTX 1060",
      price: "$0.99",
      location: "Makassar",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
    },
    {
      url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140058.jpg",
      name: "Nvidia GTX 1050 ti",
      price: "$0.49",
      location: "Makassar",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius nulla nesciunt libero modi",
    },
  ];
};

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
    },
    {
      url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140061.jpg",
      name: "Nvidia GTX 1060",
      price: "$0.99",
      location: "Jayapura",
      desc: "Lorem ipsum, dolor sit amet",
    },
    {
      url: "https://www.shutterstock.com/image-photo/powerful-personal-computer-gamer-rig-260nw-1430140061.jpg",
      name: "Nvidia RTX 1050 TI",
      price: "$0.49",
      location: "Jayapura",
      desc: "Lorem ipsum, dolor sit amet",
    },
  ];
};

export const getGrid = () => {
  return [
    {
      arrayFunc: () => getGridItems(),
    },
    {
      arrayFunc: () => getGridItems(),
    },
    {
      arrayFunc: () => getGridItems(),
    },
    {
      arrayFunc: () => getGridItems(),
    },
    {
      arrayFunc: () => getGridItems(),
    },
  ];
};
