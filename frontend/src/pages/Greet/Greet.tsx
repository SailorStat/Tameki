import localization from "@localization";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Paths } from "@router";
import { useNavigate } from "react-router-dom";

const Greet = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => navigate(Paths.example);

  console.log(useTheme());

  return (
    <Stack minWidth={(theme) => `calc(100vh - ${theme.components?.MuiAppBar?.width})`} textAlign="center" width="100%">
      <Typography variant="h2">{localization.welcome}</Typography>
      {/* todo: need change to loaded name */}
      <Typography variant="h1">{"Tameki"}</Typography>
      <div>
        <Button variant="contained" onClick={handleStartShopping}>
          {localization.startShopping}
        </Button>
      </div>
    </Stack>
  );
};

export default Greet;
