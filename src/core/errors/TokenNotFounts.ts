import { ErrorBase } from "./ErrorBase";

export class TokenNotFoundError extends ErrorBase {
  constructor() {
    super("Token not found");
    this.name = "TokenNotFoundError";
  }
}
