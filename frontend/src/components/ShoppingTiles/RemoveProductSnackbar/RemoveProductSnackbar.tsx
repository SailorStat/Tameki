import React from "react";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Alert, AlertTitle, Button, CircularProgress, Snackbar, Typography } from "@mui/material";
import { shoppingListProductToRemoveSelector } from "@slices/shoppingList";
import { dispatchedShoppingListActions } from "@slices/shoppingList/actions";

import { DivCountdown } from "./RemoveProductSnackbar.styles";

const defaultCountdown = 5000;

const RemoveProductSnackbar = () => {
  const productToRemove = useSelector(shoppingListProductToRemoveSelector);
  const [countdown, setCountdown] = React.useState(defaultCountdown);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleCancelDelete = React.useCallback(() => {
    productToRemove && dispatchedShoppingListActions.addProduct(productToRemove);
    setCountdown(0);
  }, [productToRemove]);

  React.useEffect(() => {
    if (!productToRemove) {
      return;
    }

    setCountdown(defaultCountdown);

    timerRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1000);
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [productToRemove]);

  React.useEffect(() => {
    if (!countdown) {
      clearInterval(timerRef.current!);
      dispatchedShoppingListActions.removeProduct();
    }
  }, [countdown]);

  return (
    <Snackbar anchorOrigin={{ horizontal: "right", vertical: "bottom" }} open={!!productToRemove}>
      <Alert
        action={
          <Button color="inherit" onClick={handleCancelDelete}>
            {localization.cancel}
          </Button>
        }
        icon={
          <DivCountdown>
            <CircularProgress size={36} value={(countdown / defaultCountdown) * 100} variant="determinate" />
            <Typography position="absolute">{countdown / 1000}</Typography>
          </DivCountdown>
        }
        severity="warning"
      >
        <AlertTitle>{localization.productWasDeletedFromShoppingList}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export default RemoveProductSnackbar;
