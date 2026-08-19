import { UserNotFoundError } from "@/core/application/Errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";

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
    if (!user) throw new UserNotFoundError("User not found");
    if (!user.recoveryTokenHash) throw new Error("User not recovered");
    if (user.recoveryTokenHash != token) {
      await userRepository.update(userId, { recoveryTokenHash: null });
      throw new Error("Invalid token");
    }
    const hash = await hashService.hash(newPassword);
    await userRepository.update(userId, {
      password: hash,
      recoveryTokenHash: null,
    });
  }
}
