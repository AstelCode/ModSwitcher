import { ServiceContext } from "@/core/application/port/ServiceContext";
type Deps = Pick<
  ServiceContext,
  "emailService" | "tokenService" | "userRepository" | "activationCodeService"
>;
export class ResendActivationEmailUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string) {
    const { userRepository, tokenService, activationCodeService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User don't found");
    const newActivationCode = await activationCodeService.generate(userId);
    await userRepository.update(userId, {
      activationCode: newActivationCode,
    });
    // TODO: activar email service
    //await emailService.sendActivationEmail(user.email, newActivationCode);
  }
}
