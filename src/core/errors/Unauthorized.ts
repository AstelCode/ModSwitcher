import { ErrorBase } from "./ErrorBase";

export class UnauthorizedError extends ErrorBase {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
