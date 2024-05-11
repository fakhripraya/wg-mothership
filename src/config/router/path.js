import React from "react";
import Home from "../../pages/Home";
import Error404 from "../../pages/Error404";
import Error500 from "../../pages/Error500";
import ProductSearch from "../../pages/ProductSearch";
import ProductDetail from "../../pages/ProductDetail";
import Dashboard from "../../pages/Dashboard";
import CreativeStore from "../../pages/CreativeStore";
import AddStore from "../../pages/AddStore";
import ErrorHandling from "../../pages/ErrorHandling";
import AddProduct from "../../pages/AddProduct";
import TransactionCart from "../../pages/TransactionCart";
import TransactionPayment from "../../pages/TransactionPayment";
import TermsAndConditions from "../../pages/TermsAndConditions";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import ConsentScreen from "../../pages/ConsentScreen";

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
    path: "/creative-store/consent-screen",
    component: <ConsentScreen />,
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
    path: "/tnc",
    component: <TermsAndConditions />,
  },
  {
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    path: "/error500",
    component: <Error500 />,
  },
  {
    path: "/error",
    component: <ErrorHandling />,
  },
  {
    path: "*",
    component: <Error404 />,
  },
];
