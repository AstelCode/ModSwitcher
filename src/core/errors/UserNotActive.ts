import { ErrorBase } from "./ErrorBase";

export class UserNotActiveError extends ErrorBase {
  constructor() {
    super("User not active");
    this.name = "UserNotActiveError";
  }
}
