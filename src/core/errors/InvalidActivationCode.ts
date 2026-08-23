import { ErrorBase } from "./ErrorBase";

export class InvalidActivationCodeError extends ErrorBase {
  constructor() {
    super("Invalid activation code");
    this.name = "InvalidActivationCodeError";
  }
}
