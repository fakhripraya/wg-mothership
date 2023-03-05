import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import Finder from '../../pages/Finder';
import RDP from "../../pages/RDP";
import Detail from "../../pages/Detail";
import RDPRoom from "../../pages/RDPRoom";
import RDPRoomError from "../../pages/RDPRoomError";
import Dashboard from "../../pages/Dashboard";
import AddCatalogue from "../../pages/AddCatalogue";
import AddToko from "../../pages/AddToko";

export const routes = [
    {
        path: '/',
        component: <Home />,
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
        path: '/dashboard/add/catalogue',
        component: <AddCatalogue />,
    },
    {
        path: '/dashboard/add/toko',
        component: <AddToko />,
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