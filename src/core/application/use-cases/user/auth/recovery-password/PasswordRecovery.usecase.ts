import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";
import { InvalidTokenError } from "@/core/errors/InvalidToken";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService"
>;
export class PasswordRecoveryUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, newPassword: string) {
    const { userRepository, tokenService, hashService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    if (!user.recoveryTokenHash || user.recoveryTokenHash != token) {
      await userRepository.update(userId, { recoveryTokenHash: null });
      throw new InvalidTokenError();
    }
    const hash = await hashService.hash(newPassword);
    await userRepository.update(userId, {
      password: hash,
      recoveryTokenHash: null,
    });
  }
}
