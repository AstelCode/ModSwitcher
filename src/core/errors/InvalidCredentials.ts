import { ErrorBase } from "./ErrorBase";

export class InvalidCredentialsError extends ErrorBase {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentials";
  }
}
