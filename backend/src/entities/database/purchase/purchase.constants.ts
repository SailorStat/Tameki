export const PURCHASE_BASE_URL = "/api/purchases";
export const URL_PURCHASE_ID_PARAM = "purchaseId";

export enum PurchaseStatus {
  Cancelled = "cancelled",
  Completed = "completed",
  Confirmed = "confirmed",
  InProgress = "inProgress",
  OnWay = "onWay",
  Preparation = "preparation",
}

export enum PaymentStatus {
  NotPaided = "notPaided",
  Paided = "paided",
  Refund = "refund",
}
