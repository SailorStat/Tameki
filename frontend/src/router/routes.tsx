import React from "react";
import { RouteObject } from "react-router/dist/lib/context";
import { Navigate } from "react-router-dom";

import PATHS from "./Paths";

const Start = React.lazy(async () => import("../pages/Start"));

const ROUTES: RouteObject[] = [
  {
    element: <Navigate to={PATHS.base} />,
    path: "/",
  },
  {
    element: <Start />,
    path: PATHS.base,
  },
];

export default ROUTES;
