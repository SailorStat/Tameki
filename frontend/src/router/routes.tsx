import React from "react";
import { LinearProgress } from "@mui/material";
import { RouteObject } from "react-router/dist/lib/context";

import Paths from "./Paths";

const Greet = React.lazy(async () => import("../pages/Greet"));
const Shop = React.lazy(async () => import("../pages/Shop"));
const ShoppingList = React.lazy(async () => import("../pages/ShoppingList"));
const SiteTree = React.lazy(async () => import("../pages/SiteTree"));
const Registration = React.lazy(async () => import("../pages/Registration"));

const ROUTES: RouteObject[] = [
  // Общие
  {
    element: <Greet />,
    id: "greet",
    path: Paths.base,
  },
  {
    element: <SiteTree />,
    id: "siteTree",
    path: Paths.siteTree,
  },
  {
    element: <SiteTree />,
    id: "login",
    path: Paths.login,
  },
  {
    element: <Registration />,
    id: "registration",
    path: Paths.registration,
  },

  // Магазин
  {
    element: <Greet />,
    id: "greetTameki",
    path: Paths.greet,
  },
  {
    element: <Greet />,
    id: "about",
    path: Paths.about,
  },
  {
    element: <ShoppingList />,
    id: "shoppingList",
    path: Paths.shoppingList,
  },
  {
    element: <Shop />,
    id: "shop",
    path: Paths.shop,
  },
].map((route) => ({
  ...route,
  element: <React.Suspense fallback={<LinearProgress />}>{route.element}</React.Suspense>,
}));

export default ROUTES;
