import React from "react";
import { LinearProgress } from "@mui/material";
import { RouteObject } from "react-router/dist/lib/context";
import { Navigate } from "react-router-dom";

import NAVIGATION_ROUTES from "./navigationRoutes";
import PATHS from "./Paths";

const LayoutWithNavigation = React.lazy(async () => import("../layouts/LayoutWithNavigation"));

const ROUTES: RouteObject[] = [
  {
    element: <Navigate to={PATHS.base} />,
    path: "/",
  },
  {
    children: NAVIGATION_ROUTES,
    element: <LayoutWithNavigation />,
    path: PATHS.base,
  },
].map((route) => ({
  ...route,
  element: <React.Suspense fallback={<LinearProgress />}>{route.element}</React.Suspense>,
}));

export default ROUTES;
