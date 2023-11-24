import React from "react";
import { RouteObject } from "react-router-dom";

import Paths from "./Paths";

const Shop = React.lazy(async () => import("../pages/Shop"));

const NAVIGATION_ROUTES: RouteObject[] = [
  {
    element: <Shop />,
    id: "Shop",
    path: Paths.shop(),
  },
];

export default NAVIGATION_ROUTES;
