import localization from "@localization";
import { Telegram } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { shoppingListSelectedToOrderSelector, shoppingListTotalCostSelector } from "@slices/shoppingList";
import TextFieldCopy from "@ui/TextFieldCopy";
import { formatPrice } from "@utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import getOrderMessage from "./getOrderMessage";

const ShoppingListOrder = () => {
  const selectedToOrder = useSelector(shoppingListSelectedToOrderSelector);
  const totalCost = useSelector(shoppingListTotalCostSelector);

  const handleOrder = () => {
    // Логика для размещения заказа
  };

  return (
    <Paper elevation={8} style={{ borderRadius: "8px", height: "min-content", padding: "16px" }}>
      <Stack spacing={1}>
        <Typography variant="caption">
          {localization.totalCostOmitDelivery}
          {": "}
        </Typography>
        <Typography textAlign="right" variant="h4">
          {formatPrice(totalCost)}
        </Typography>
        <Typography variant="caption">
          {localization.copyMessageToOrder}
          {": "}
        </Typography>
        <TextFieldCopy value={getOrderMessage(selectedToOrder)} />
        <Link style={{ display: "block" }} target="_blank" to="https://t.me/XenUx">
          <Button
            disabled={!totalCost}
            startIcon={<Telegram />}
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleOrder}
          >
            {"Заказать"}
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default ShoppingListOrder;
