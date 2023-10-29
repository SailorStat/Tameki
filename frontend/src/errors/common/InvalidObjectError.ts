import { Text } from "../utils";

interface UnknownIssuePriorityErrorPayload {
  name: string;
  tip?: string;
  value: unknown;
}

export default class InvalidObjectError extends Error {
  public objectName: string;

  public invalidValue: unknown;

  public constructor({ name, value, tip }: UnknownIssuePriorityErrorPayload) {
    const text = new Text(`The ${name} is invalid: '${JSON.stringify(value)}'`);

    tip && text.addLine(tip);

    super(text.toString());

    this.objectName = name;
    this.invalidValue = value;

    Error.captureStackTrace(this, InvalidObjectError);
  }
}
