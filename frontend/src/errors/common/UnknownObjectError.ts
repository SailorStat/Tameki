import { Text } from "../utils";

interface UnknownObjectErrorPayload {
  name: string;
  tip?: string;
  value: unknown;
}

export default class UnknownObjectError extends Error {
  public constructor({ name, value, tip }: UnknownObjectErrorPayload) {
    const text = new Text(`Unknown ${name}: '${JSON.stringify(value)}'`);

    tip && text.addLine(tip);

    super(text.toString());

    Error.captureStackTrace(this, UnknownObjectError);
  }
}
