import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from "@reduxjs/toolkit";
import store from "@store";

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key];
};

const getDispatchedActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => bindActionCreators(actions, store.dispatch);

export default getDispatchedActions;
