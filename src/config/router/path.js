import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import Error500 from '../../pages/Error500';
import ProductSearch from '../../pages/ProductSearch';
import RDP from "../../pages/RDP";
import Detail from "../../pages/Detail";
import RDPRoom from "../../pages/RDPRoom";
import RDPRoomError from "../../pages/RDPRoomError";
import Dashboard from "../../pages/Dashboard";
import CreativeStore from "../../pages/CreativeStore";
import AddCatalogue from "../../pages/AddCatalogue";
import AddStore from "../../pages/AddStore";

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
        path: '/search',
        component: <ProductSearch />,
    },
    {
        path: '/dashboard/add/catalogue',
        component: <AddCatalogue />,
    },
    {
        path: '/dashboard/add/store',
        component: <AddStore />,
    },
    {
        path: '/creative-store',
        component: <CreativeStore />,
    },
    {
        path: '/dashboard',
        component: <Dashboard />,
    },
    {
        path: '*',
        component: <Error404 />,
    },
    {
        path: '/error500',
        component: <Error500 />,
    },
];