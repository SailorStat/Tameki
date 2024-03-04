import { getDispatchedActions } from "@utils";

import userCreateSlice from "./slice";

const dispatchedUserActions = getDispatchedActions(userCreateSlice.actions);

export { dispatchedUserActions };
