import { IssueStatusId } from "@src/api/IssueAPI";

export default class IssueStatusNotChangeableError extends Error {
  public constructor(issueStatus: IssueStatusId) {
    super(`The ${issueStatus} issue status is not changeable`);

    Error.captureStackTrace(this, IssueStatusNotChangeableError);
  }
}
