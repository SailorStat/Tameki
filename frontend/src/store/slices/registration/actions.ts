import { getDispatchedActions } from "@utils";

import registrationSlice from "./slice";

const dispatchedRegistrationActions = getDispatchedActions(registrationSlice.actions);

export { dispatchedRegistrationActions };
