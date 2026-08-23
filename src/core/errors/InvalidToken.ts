import { ErrorBase } from "./ErrorBase";

export class InvalidTokenError extends ErrorBase{
  constructor() {
    super("Invalid token");
    this.name = "InvalidTokenError";
  }
}
