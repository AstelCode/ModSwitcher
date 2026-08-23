import { InvalidActivationCodeError } from "@/core/errors/InvalidActivationCode";
import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;


export class ActivateUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, code: string): Promise<void> {
    const { userRepository, tokenService, tokenStorageService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    if (user.activationCode != code && user.activationCode) {
      await userRepository.update(userId, { activationCode: undefined });
      throw new InvalidActivationCodeError();
    }
    await userRepository.update(userId, {
      status: "active",
      activationCode: null,
    });
    const sessionToken = await tokenService.generate(userId, user.email);
    await tokenStorageService.set(sessionToken);
  }
}
