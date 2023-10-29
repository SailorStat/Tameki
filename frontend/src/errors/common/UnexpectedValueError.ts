import { Text } from "../utils";

interface UnexpectedValueErrorPayload {
  expectedValue: string;
  name: string;
  tip?: string;
  value: unknown;
}

export default class UnexpectedValueError extends Error {
  public constructor({ name, value, tip, expectedValue }: UnexpectedValueErrorPayload) {
    const text = new Text(
      `"${name}" has unexpected value. Expected value: ${expectedValue}. Received value: "${JSON.stringify(value)}"`
    );

    tip && text.addLine(tip);

    super(text.toString());

    Error.captureStackTrace(this, UnexpectedValueError);
  }
}
