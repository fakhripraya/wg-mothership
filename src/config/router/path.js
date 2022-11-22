import React from "react";
import Home from '../../pages/Home';
import Error404 from '../../pages/Error404';
import Rental from '../../pages/Rental';
import Finder from '../../pages/Finder';

export const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/rental',
        component: <Rental />,
    },
    {
        path: '/finder',
        component: <Finder />,
    },
    {
        path: '*',
        component: <Error404 />,
    },
];