import "./index.css";
import React from "react";
import { RequireError } from "@errors/common";
import { ThemeProvider } from "@mui/material";
import router from "@router";
import store from "@store";
import Tips from "@tips";
import ReactDOM from "react-dom/client";
import { Provider as ReactReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import theme from "./theme";

const domRoot = document.getElementById("root");

if (!domRoot) {
  throw new RequireError({ name: "domRoot", tip: Tips.addRootToDocument(), value: domRoot });
}

const root = ReactDOM.createRoot(domRoot);

root.render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReactReduxProvider>
  </React.StrictMode>
);
