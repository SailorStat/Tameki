import React from "react";
import { LinearProgress } from "@mui/material";
import { RouteObject } from "react-router/dist/lib/context";
import { Outlet } from "react-router-dom";

import NAVIGATION_ROUTES from "./navigationRoutes";
import Paths from "./Paths";

const LayoutWithMenu = React.lazy(async () => import("../layouts/LayoutWithMenu"));

const Greet = React.lazy(async () => import("../pages/Greet"));
const Order = React.lazy(async () => import("../pages/Order"));
const SiteTree = React.lazy(async () => import("../pages/SiteTree"));

const ROUTES: RouteObject[] = [
  {
    children: [
      {
        element: <Greet />,
        id: "greet",
        path: Paths.base(),
      },
      {
        element: <SiteTree />,
        id: "siteTree",
        path: Paths.siteTree(),
      },
      {
        children: [
          {
            element: <Greet />,
            id: "greetTameki",
            path: Paths.greet(Paths.tameki()),
          },
          {
            element: <Order />,
            id: "order",
            path: Paths.order(Paths.tameki()),
          },
        ],
        element: <Outlet />,
        path: Paths.tameki(),
      },
      ...NAVIGATION_ROUTES,
    ],
    element: <LayoutWithMenu />,
  },
].map((route) => ({
  ...route,
  element: <React.Suspense fallback={<LinearProgress />}>{route.element}</React.Suspense>,
}));

export default ROUTES;
