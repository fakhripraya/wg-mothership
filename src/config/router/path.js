import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import Remote from '../../pages/Remote';
import Finder from '../../pages/Finder';

export const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/rdp',
        component: <Remote />,
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