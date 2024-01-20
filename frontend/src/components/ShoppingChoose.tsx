import React from "react";
import { Stack } from "@mui/material";

import ShoppingListOrder from "./ShoppingList";
import ShoppingTiles from "./ShoppingTiles";

const ShoppingChoose = () => {
  return (
    <Stack
      direction={{ lg: "row", md: "column" }}
      display="grid"
      gap={2}
      gridTemplateColumns={{ lg: "1fr 300px", md: "1fr" }}
    >
      <ShoppingTiles />
      <ShoppingListOrder />
    </Stack>
  );
};

export default React.memo(ShoppingChoose);
