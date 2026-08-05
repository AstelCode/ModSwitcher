import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "activationCodeService" | "tokenService" | "emailService"
>;
export class ResendActivationCodeUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string): Promise<void> {
    const {
      userRepository,
      tokenService,
      emailService,
      activationCodeService,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const newActivationCode = await activationCodeService.generate(user.email);
    await emailService.sendActivationEmail(user.email, newActivationCode);
    await userRepository.update(userId, { activationCode: newActivationCode });
  }
}
