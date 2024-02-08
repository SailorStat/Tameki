import { Transform } from "class-transformer";

export function TransformBoolean() {
  return Transform(({ value }) =>
    typeof value === "string" && ["true", "false"].includes(value) ? value === "true" : value,
  );
}
