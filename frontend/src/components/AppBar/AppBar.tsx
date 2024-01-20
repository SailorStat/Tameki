import * as React from "react";
import GiteIcon from "@mui/icons-material/Gite";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar as MuiAppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { Paths, PathVariable } from "@router";
import { useNavigate, useParams } from "react-router-dom";

import AppBarButtons from "./AppBarButtons";
import ShoppingListTrigger from "./ShoppingListTrigger";

const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { shopId } = useParams<{ [PathVariable.ShopId]: string }>();
  const shopPath = `/${shopId}`;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { md: "none", xs: "flex" } }}>
            <IconButton color="inherit" size="large" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              keepMounted
              open={Boolean(anchorElNav)}
              sx={{ display: { md: "none", xs: "block" } }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              onClose={handleCloseNavMenu}
            >
              <AppBarButtons />
            </Menu>
          </Box>

          <Stack
            alignItems="center"
            direction="row"
            gap={1}
            margin={{ md: 0, xs: "0 auto" }}
            onClick={() => navigate("/")}
          >
            <GiteIcon />
            <Typography
              noWrap
              sx={{ fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", mr: 2, textDecoration: "none" }}
              variant="h5"
            >
              {"Sailor's friends"}
            </Typography>
          </Stack>
          <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
            <AppBarButtons />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {shopId && (
              <Stack direction="row" spacing={1}>
                <ShoppingListTrigger shopPath={shopPath} />
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
