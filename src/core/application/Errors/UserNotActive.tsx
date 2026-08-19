export class UserNotActiveError extends Error {
  constructor(message: string) {
    super(message);
  }
}
