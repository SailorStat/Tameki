import { Text } from "../utils";

interface UnexpectedTypeErrorPayload {
  name: string;
  tip?: string;
  type: string;
  value: unknown;
}

export default class UnexpectedTypeError extends Error {
  public constructor({ name, value, tip, type }: UnexpectedTypeErrorPayload) {
    const text = new Text(
      `"${name}" has unexpected type. Expected type: ${type}. Received value: '${JSON.stringify(value)}'`
    );

    tip && text.addLine(tip);

    super(text.toString());

    Error.captureStackTrace(this, UnexpectedTypeError);
  }
}
