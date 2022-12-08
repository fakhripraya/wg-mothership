import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import MyRemote from '../../pages/MyRemote';
import Finder from '../../pages/Finder';
import RDP from "../../pages/RDP";
import Detail from "../../pages/Detail";
import RDPConnect from "../../pages/RDPConnect";

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
        path: '/detail',
        component: <Detail />,
    },
    {
        path: '/rdp',
        component: <RDP />,
    },
    {
        path: '/rdp/connect',
        component: <RDPConnect />,
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