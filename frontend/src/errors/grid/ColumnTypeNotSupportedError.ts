export default class ColumnTypeNotSupportedError extends Error {
  public constructor(columnType: string) {
    super(`The ${columnType} column type is not supported`);

    Error.captureStackTrace(this, ColumnTypeNotSupportedError);
  }
}
