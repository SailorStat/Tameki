import { Text } from "../utils";

interface UncorrectChangeErrorPayload {
  currentValue: string;
  name: string;
  newValue: string;
  tip?: string;
}

export default class UncorrectChangeError extends Error {
  public constructor({ name, currentValue, newValue, tip }: UncorrectChangeErrorPayload) {
    const text = new Text(`Uncorrected change "${name}" from "${currentValue}" to "${newValue}"`);

    tip && text.addLine(tip);

    super(text.toString());

    Error.captureStackTrace(this, UncorrectChangeError);
  }
}
