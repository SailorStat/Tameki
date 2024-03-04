import { RootState } from "@src/store";

const countSelector = (state: RootState) => state.counter.count;

export { countSelector };
