import "./index.css";
import React from "react";
import { RequireError } from "@errors/common";
import { ThemeProvider } from "@mui/material";
import router from "@router";
import Tips from "@tips";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import theme from "./theme";

const domRoot = document.getElementById("root");

if (!domRoot) {
  throw new RequireError({ name: "domRoot", tip: Tips.addRootToDocument(), value: domRoot });
}

const root = ReactDOM.createRoot(domRoot);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
