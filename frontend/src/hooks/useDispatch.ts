import store from "@store";
import { useDispatch as useReduxDispatch } from "react-redux";

const useDispatch: () => typeof store.dispatch = useReduxDispatch;

export default useDispatch;
