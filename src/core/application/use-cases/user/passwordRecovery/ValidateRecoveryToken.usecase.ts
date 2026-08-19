import { UserNotFoundError } from "@/core/application/Errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class ValidateRecoveryTokenUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string) {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError("User not found");
    if (!user.recoveryTokenHash) throw new Error("User not recovered");
    if (user.recoveryTokenHash != token) {
      throw new Error("Invalid token");
    }
    return true;
  }
}
