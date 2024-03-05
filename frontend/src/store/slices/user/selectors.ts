import { RootState } from "@src/store";

const isUserLoggedInSelector = (state: RootState) => !!state.user.data.id;

export { isUserLoggedInSelector };
