import { Transform } from "class-transformer";
import { isJsonString } from "src/utils/isJSON";

export function TransformJSON() {
  return Transform(({ value }) => (typeof value === "string" && isJsonString(value) ? JSON.parse(value) : value));
}
