import Navigation from "@components/Navigation";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const LayoutWithMenu = () => (
  <Stack display="grid" gridTemplateRows="max-content 1fr" minHeight="100vh">
    <Navigation />
    <Outlet />
  </Stack>
);

export default LayoutWithMenu;
