import React from "react";
import { RouteObject } from "react-router-dom";

import PATHS from "./Paths";

const Shop = React.lazy(async () => import("../pages/Shop"));

const NAVIGATION_ROUTES: RouteObject[] = [
  {
    element: <Shop />,
    id: "Shop",
    path: PATHS.shop,
  },
];

export default NAVIGATION_ROUTES;
