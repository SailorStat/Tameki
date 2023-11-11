import React from "react";
import { RouteObject } from "react-router-dom";

import PATHS from "./Paths";

const Example = React.lazy(async () => import("../pages/Example"));

const NAVIGATION_ROUTES: RouteObject[] = [
  {
    element: <Example />,
    id: "Example",
    path: PATHS.example,
  },
];

export default NAVIGATION_ROUTES;
