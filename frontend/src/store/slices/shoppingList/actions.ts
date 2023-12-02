import { getDispatchedActions } from "@utils";

import shoppingListSlice from "./shoppingListSlice";

const dispatchedShoppingListActions = getDispatchedActions(shoppingListSlice.actions);

export { dispatchedShoppingListActions };
