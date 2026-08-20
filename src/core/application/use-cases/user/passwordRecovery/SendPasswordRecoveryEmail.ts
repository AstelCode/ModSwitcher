import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "emailService" | "userRepository" | "tokenService"
>;
export class SendPasswordRecoveryEmailUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(email: string) {
    const { userRepository, emailService, tokenService } = this.deps;
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error("User not found");
    if (user.recoveryTokenHash) {
      return;
    }
    const token = await tokenService.generate(user.id!, email);
    await userRepository.update(user.id!, { recoveryTokenHash: token });
    //TODO: await emailService.sendPasswordRecoveryEmail(email, token);
  }
}
