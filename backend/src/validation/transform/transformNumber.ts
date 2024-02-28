import { Transform } from "class-transformer";

export function TransformNumber() {
  return Transform(({ value }) => {
    console.log(value);

    return typeof value === "string" && !Number.isNaN(+value) ? +value : value;
  });
}
