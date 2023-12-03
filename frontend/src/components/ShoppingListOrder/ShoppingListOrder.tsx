import localization from "@localization";
import { Telegram } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { shoppingListTotalCostSelector } from "@slices/shoppingList";
import TextFieldCopy from "@ui/TextFieldCopy";
import { formatPrice } from "@utils";
import { useSelector } from "react-redux";

const ShoppingListOrder = () => {
  const totalCost = useSelector(shoppingListTotalCostSelector);

  const handleOrder = () => {
    // Логика для размещения заказа
  };

  const paperStyle = {
    borderRadius: "8px",
    height: "min-content",
    padding: "16px",
  };

  return (
    <Paper elevation={8} style={paperStyle}>
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
        <TextFieldCopy
          value={`сообщение
для
заказа`}
        />
        <Button disabled={!totalCost} startIcon={<Telegram />} variant="contained" onClick={handleOrder}>
          {"Заказать"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default ShoppingListOrder;
