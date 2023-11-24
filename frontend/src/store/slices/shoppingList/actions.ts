import shoppingListSlice from "./shoppingListSlice";

export const addProductToShoppingList = shoppingListSlice.actions.addProduct;

export const changeProductCountFromShoppingList = shoppingListSlice.actions.changeProductCount;

export const hideProductFromShoppingList = shoppingListSlice.actions.hideProduct;

export const removeProductFromShoppingList = shoppingListSlice.actions.removeProduct;

export const toggleProductToOrderFromShoppingList = shoppingListSlice.actions.toggleProductToOrder;
