import { ErrorBase } from "./ErrorBase";

export class UserAlreadyExistsError extends ErrorBase {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
}
