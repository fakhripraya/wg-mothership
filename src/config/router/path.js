import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import Finder from '../../pages/Finder';
import RDP from "../../pages/RDP";
import Detail from "../../pages/Detail";
import RDPRoom from "../../pages/RDPRoom";
import RDPRoomError from "../../pages/RDPRoomError";
import AddRental from "../../pages/AddRental";
import Dashboard from "../../pages/Dashboard";

export const routes = [
    {
        path: '/',
        component: <Home />,
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
        path: '/add/rental',
        component: <AddRental />,
    },
    {
        path: '/dashboard',
        component: <Dashboard />,
    },
    {
        path: '*',
        component: <Error404 />,
    },
];