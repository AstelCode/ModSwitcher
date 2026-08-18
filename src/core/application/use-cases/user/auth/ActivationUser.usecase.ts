import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;

export class ActivationUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, code: string): Promise<void> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.activationCode != code) throw new Error("Invalid activation code");
    await userRepository.update(userId, { status: "active" });
  }
}
