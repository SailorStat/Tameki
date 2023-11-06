import React from "react";
import { RouteObject } from "react-router-dom";

import PATHS from "./Paths";

const Start = React.lazy(async () => import("../pages/Start"));
const Example = React.lazy(async () => import("../pages/Example"));

const NAVIGATION_ROUTES: RouteObject[] = [
  {
    element: <Start />,
    id: "Start",
    path: PATHS.base,
  },
  {
    element: <Example />,
    id: "Example",
    path: PATHS.example,
  },
];

export default NAVIGATION_ROUTES;
