import localization from "@localization";
import { Button, Stack, Typography } from "@mui/material";
import { Paths } from "@router";
import { useNavigate } from "react-router-dom";

const Greet = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => navigate(Paths.shop);

  return (
    <Stack alignItems="center" height="100%" justifyContent="center" textAlign="center" width="100vw">
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
