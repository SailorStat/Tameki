import { Text } from "../utils";

interface RequireErrorPayload {
  name: string;
  tip?: string;
  value: unknown;
}

export default class RequireError extends Error {
  public constructor({ name, value, tip }: RequireErrorPayload) {
    const text = new Text(`"${name}" is required. Received: '${JSON.stringify(value)}'`);

    tip && text.addLine(tip);

    super(text.toString());

    Error.captureStackTrace(this, RequireError);
  }
}
