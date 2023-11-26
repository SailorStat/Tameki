import React from "react";
import { useActions, useSelector } from "@hooks";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button, Card, CardContent, CardMedia, inputBaseClasses, TextField, Typography } from "@mui/material";
import { shoppingListActions, shoppingListProductSelectedSelector } from "@slices/shoppingList";
import { Product } from "@store";
import { formatPrice } from "@utils";

import ShoppingListProductInfo from "./ShoppingListProductInfo";

interface ShoppingTileProps {
  product: Product;
}

const ShoppingTile = ({ product }: ShoppingTileProps) => {
  const { title, images, price, id } = product;
  const productSelectedCount = useSelector(shoppingListProductSelectedSelector(id));
  const { changeProductCount, incrementProductCount, decrementProductCount } = useActions(shoppingListActions);

  const handleAddProductToShoppingList = React.useCallback(() => {
    incrementProductCount({ productId: id });
  }, [id, incrementProductCount]);

  return (
    <Card sx={{ display: "grid", gridTemplateColumns: "25% 1fr 180px", height: 120 }}>
      <CardMedia alt={title} component="img" height="120" image={images[0]} />
      <ShoppingListProductInfo product={product} />
      <CardContent>
        <Typography component="div" variant="h6">
          {formatPrice(price * (productSelectedCount || 1))}
        </Typography>
        <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 48px" }}>
          <Button sx={{ minWidth: 30 }} variant="contained">
            <RemoveIcon />
          </Button>
          <TextField
            size="small"
            sx={{
              [`& .${inputBaseClasses.input}`]: { padding: "8px 8px", textAlign: "center" },
              [`& .${inputBaseClasses.input}::-webkit-outer-spin-button, & .${inputBaseClasses.input}::-webkit-inner-spin-button`]:
                { margin: 0, WebkitAppearance: "none" },
            }}
            type="number"
            value={productSelectedCount}
            variant="standard"
          />
          <Button sx={{ minWidth: 30 }} variant="contained" onClick={handleAddProductToShoppingList}>
            <AddIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingTile;
