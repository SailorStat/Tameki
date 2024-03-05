import { getDispatchedActions } from "@utils";

import userSlice from "./slice";

const dispatchedUserActions = getDispatchedActions(userSlice.actions);

export { dispatchedUserActions };
