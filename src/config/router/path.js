import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import MyRemote from '../../pages/MyRemote';
import Finder from '../../pages/Finder';
import RDP from "../../pages/RDP";
import Detail from "../../pages/Detail";
import MyRentals from "../../pages/MyRentals";
import RDPRoom from "../../pages/RDPRoom";
import RDPRoomError from "../../pages/RDPRoomError";

export const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/myremote',
        component: <MyRemote />,
    },
    {
        path: '/myrental',
        component: <MyRentals />,
    },
    {
        path: '/detail/:id',
        component: <Detail />,
    },
    {
        path: '/rdp',
        component: <RDP />,
    },
    {
        path: '/rdp/room',
        component: <RDPRoom />,
    },
    {
        path: '/rdp/error',
        component: <RDPRoomError />,
    },
    {
        path: '/market',
        component: <Finder />,
    },
    {
        path: '*',
        component: <Error404 />,
    },
];