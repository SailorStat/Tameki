import Navigation from "@components/Navigation";
import { Outlet } from "react-router-dom";

const LayoutWithMenu = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

export default LayoutWithMenu;
