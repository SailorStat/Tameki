import StartShoppingButton from "@components/StartShoppingButton";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import localization from "@localization";
import { Button, Stack, Typography } from "@mui/material";
import { dispatchedUserActions } from "@slices/userCreate";

const Greet = () => {
  return (
    <LayoutWithAppBar>
      <Stack alignItems="center" height="100%" justifyContent="center" textAlign="center" width="100vw">
        <Typography variant="h2">{localization.welcome}</Typography>
        {/* todo: need change to loaded name */}
        <Button onClick={() => dispatchedUserActions.login({ asdf: 1234 })}>{"1423"}</Button>
        <Typography variant="h1">{"Tameki"}</Typography>
        <div>
          <StartShoppingButton />
        </div>
      </Stack>
    </LayoutWithAppBar>
  );
};

export default Greet;
