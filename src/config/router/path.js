import React from "react";
import Home from "../../pages/Home";
import Error404 from "../../pages/Error404";
import Error500 from "../../pages/Error500";
import ProductSearch from "../../pages/ProductSearch";
import RDP from "../../pages/RDP";
import ProductDetail from "../../pages/ProductDetail";
import RDPRoom from "../../pages/RDPRoom";
import RDPRoomError from "../../pages/RDPRoomError";
import Dashboard from "../../pages/Dashboard";
import CreativeStore from "../../pages/CreativeStore";
import AddStore from "../../pages/AddStore";
import ErrorHandling from "../../pages/ErrorHandling";
import AddProduct from "../../pages/AddProduct";
import TransactionCart from "../../pages/TransactionCart";
import TransactionPayment from "../../pages/TransactionPayment";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/product-detail",
    component: <ProductDetail />,
  },
  {
    path: "/transaction/cart",
    component: <TransactionCart />,
  },
  {
    path: "/transaction/payment",
    component: <TransactionPayment />,
  },
  {
    path: "/rdp",
    component: <RDP />,
  },
  {
    path: "/rdp/room",
    component: <RDPRoom />,
  },
  {
    path: "/rdp/error",
    component: <RDPRoomError />,
  },
  {
    path: "/search",
    component: <ProductSearch />,
  },
  {
    path: "/dashboard/add/product",
    component: <AddProduct />,
  },
  {
    path: "/dashboard/add/store",
    component: <AddStore />,
  },
  {
    path: "/creative-store",
    component: <CreativeStore />,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "*",
    component: <Error404 />,
  },
  {
    path: "/error500",
    component: <Error500 />,
  },
  {
    path: "/error",
    component: <ErrorHandling />,
  },
];
