import StartShoppingButton from "@components/StartShoppingButton";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import localization from "@localization";
import { Stack, Typography } from "@mui/material";

const Greet = () => {
  return (
    <LayoutWithAppBar>
      <Stack alignItems="center" height="100%" justifyContent="center" textAlign="center" width="100vw">
        <Typography variant="h2">{localization.welcome}</Typography>
        {/* todo: need change to loaded name */}
        <Typography variant="h1">{"Tameki"}</Typography>
        <div>
          <StartShoppingButton />
        </div>
      </Stack>
    </LayoutWithAppBar>
  );
};

export default Greet;
