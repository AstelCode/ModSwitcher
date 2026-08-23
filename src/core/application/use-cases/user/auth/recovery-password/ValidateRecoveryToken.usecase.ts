import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";
import { InvalidTokenError } from "@/core/errors/InvalidToken";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class ValidateRecoveryTokenUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string) {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    if (!user.recoveryTokenHash || user.recoveryTokenHash != token ) {
      throw new InvalidTokenError();
    }
    return true;
  }
}
