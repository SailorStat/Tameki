import { Shop as ShopIcon } from "@mui/icons-material";
import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { NAVIGATION_ROUTES } from "@router";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={1}>
          <IconButton color="inherit">
            <ShopIcon />
          </IconButton>
          {NAVIGATION_ROUTES.map(({ id, path }) => (
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
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
