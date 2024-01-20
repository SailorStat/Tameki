import { Button } from "@mui/material";
import { Paths, PathVariable } from "@router";
import { useNavigate, useParams } from "react-router-dom";

const AppBarButtons = () => {
  const navigate = useNavigate();
  const { shopId } = useParams<{ [PathVariable.ShopId]: string }>();
  const shopPath = `/${shopId}`;

  const appBarButtons = shopId
    ? ([
        { id: "greet", pathname: Paths.getGreet(shopPath) },
        { id: "shop", pathname: shopPath },
        { id: "about", pathname: Paths.getAbout(shopPath) },
      ] satisfies { id: string; pathname: string }[])
    : [];

  return appBarButtons.map(({ id, pathname }) => (
    <Button color="inherit" disabled={pathname === location.pathname} key={id} onClick={() => navigate(pathname)}>
      {id}
    </Button>
  ));
};

export default AppBarButtons;
