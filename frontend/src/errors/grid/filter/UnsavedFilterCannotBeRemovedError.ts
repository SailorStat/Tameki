export default class UnsavedFilterCannotBeRemovedError extends Error {
  public constructor(filterId: string) {
    super(`An unsaved ${filterId} filter cannot be removed`);

    Error.captureStackTrace(this, UnsavedFilterCannotBeRemovedError);
  }
}
