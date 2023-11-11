import { RootState } from "@store";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default useSelector;
