import React from "react";
import { getDispatchedActions } from "@utils";

import shoppingListSlice from "./shoppingListSlice";

const useDispatchedShoppingListActions = () => React.useMemo(() => getDispatchedActions(shoppingListSlice.actions), []);

export { useDispatchedShoppingListActions };
