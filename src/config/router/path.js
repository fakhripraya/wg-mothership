import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import MyRemote from '../../pages/MyRemote';
import Finder from '../../pages/Finder';
import RDP from "../../pages/RDP";

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
        path: '/rdp',
        component: <RDP />,
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