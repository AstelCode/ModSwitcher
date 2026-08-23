import { ErrorBase } from "./ErrorBase";

export class UserNotFoundError extends ErrorBase {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}
