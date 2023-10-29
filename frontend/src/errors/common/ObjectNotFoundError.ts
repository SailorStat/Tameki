import { Text } from "../utils";

interface ObjectNotFoundErrorPayloadSelector {
  name: string;
  value: unknown;
}

interface ObjectNotFoundErrorPayload {
  name: string;
  selector: ObjectNotFoundErrorPayloadSelector;
  tip?: string;
}

export default class ObjectNotFoundError extends Error {
  public objectValue: string;

  public selectorName: string;

  public selectorValue: unknown;

  public constructor({ name, selector, tip }: ObjectNotFoundErrorPayload) {
    const text = new Text(`The ${name} not found by '${JSON.stringify(selector.value)}' ${selector.name}`);

    tip && text.addLine(tip);

    super(text.toString());

    this.objectValue = name;
    this.selectorName = selector.name;
    this.selectorValue = selector.value;

    Error.captureStackTrace(this, ObjectNotFoundError);
  }
}
