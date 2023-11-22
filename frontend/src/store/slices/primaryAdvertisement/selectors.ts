import { RootState } from "@src/store";

const primaryAdvertisementsSelector = (state: RootState) => state.primaryAdvertisement;

export { primaryAdvertisementsSelector };
