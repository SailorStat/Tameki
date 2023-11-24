import React from "react";
import { LinearProgress } from "@mui/material";
import { RouteObject } from "react-router/dist/lib/context";
import { Navigate } from "react-router-dom";

import NAVIGATION_ROUTES from "./navigationRoutes";
import Paths from "./Paths";

const LayoutWithNavigation = React.lazy(async () => import("../layouts/LayoutWithMenu"));

const Greet = React.lazy(async () => import("../pages/Greet"));
const MakingOrder = React.lazy(async () => import("../pages/MakingOrder"));

const ROUTES: RouteObject[] = [
  {
    element: <Navigate to={Paths.base()} />,
    path: "/",
  },
  {
    children: [
      {
        element: <Greet />,
        id: "greet",
        path: Paths.base(),
      },
      {
        element: <MakingOrder />,
        id: "makingOrder",
        path: Paths.shoppingList(),
      },
      ...NAVIGATION_ROUTES,
    ],
    element: <LayoutWithNavigation />,
    path: Paths.base(),
  },
].map((route) => ({
  ...route,
  element: <React.Suspense fallback={<LinearProgress />}>{route.element}</React.Suspense>,
}));

export default ROUTES;
