import { getDispatchedActions } from "@utils";

import productsSlice from "./productsSlice";

const dispatchedProductActions = getDispatchedActions(productsSlice.actions);

export { dispatchedProductActions };
