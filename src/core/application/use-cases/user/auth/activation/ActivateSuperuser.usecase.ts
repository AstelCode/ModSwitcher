import { ServiceContext } from "@/core/application/port";
import { ErrorBase } from "@/core/errors/ErrorBase";
import { InvalidActivationCodeError } from "@/core/errors/InvalidActivationCode";
import { UserNotFoundError } from "@/core/errors/UserNotFound";

type Deps = Pick<
  ServiceContext,
  "tokenService" | "secretKeyService" | "userRepository" | "tokenStorageService"
>;
export class ActivateSuperuserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, code: string, secretKey: string) {
    const {
      tokenService,
      secretKeyService,
      userRepository,
      tokenStorageService,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    const isValidSecretKey = await secretKeyService.verify(secretKey);
    if (!isValidSecretKey) throw new ErrorBase("Invalid secret key");
    if (user.activationCode != code && user.activationCode) {
      await userRepository.update(userId, { activationCode: undefined });
      throw new InvalidActivationCodeError();
    }

    await userRepository.update(userId, {
      role: "superuser",
      status: "active",
      activationCode: null,
    });
    const sessionToken = await tokenService.generate(userId, user.email);
    await tokenStorageService.set(sessionToken);
  }
}
