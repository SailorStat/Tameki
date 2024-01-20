import { Shop as ShopIcon } from "@mui/icons-material";
import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { Paths, PathVariable } from "@router";
import { useNavigate, useParams } from "react-router-dom";

import ShoppingListTrigger from "./ShoppingListTrigger";

const Navigation = () => {
  const navigate = useNavigate();
  const { shopId } = useParams<{ [PathVariable.ShopId]: string }>();
  const shopPath = `/${shopId}`;

  const navigationButtons = [
    { id: "greet", path: Paths.getGreet(shopPath) },
    { id: "shop", path: shopPath },
    { id: "about", path: Paths.getAbout(shopPath) },
  ] satisfies { id: string; path: string }[];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" spacing={1}>
          <IconButton color="inherit">
            <ShopIcon />
          </IconButton>
          {navigationButtons.map(({ id, path }) => (
            <Button
              color="inherit"
              disabled={path === location.pathname}
              key={id}
              variant="text"
              onClick={() => path && navigate(path)}
            >
              {id}
            </Button>
          ))}
        </Stack>
        <div style={{ flex: 1 }} />
        {shopId && (
          <Stack direction="row" spacing={1}>
            <ShoppingListTrigger shopPath={shopPath} />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
