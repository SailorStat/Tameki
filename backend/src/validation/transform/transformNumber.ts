import { Transform } from "class-transformer";

export function TransformNumber() {
  return Transform(({ value }) => (typeof value === "string" && !Number.isNaN(+value) ? +value : value));
}
