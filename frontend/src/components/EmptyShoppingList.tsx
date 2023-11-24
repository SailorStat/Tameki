import localization from "@localization";
import { capitalize, Stack, Typography } from "@mui/material";

import StartShoppingButton from "./StartShoppingButton";

const EmptyShoppingList = () => {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="35vh" spacing={2}>
      <Typography textAlign="center" variant="h3">
        {capitalize(localization.emptyShoppingList)}
      </Typography>
      <StartShoppingButton />
    </Stack>
  );
};

export default EmptyShoppingList;
