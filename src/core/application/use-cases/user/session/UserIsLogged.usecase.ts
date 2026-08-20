import { ServiceContext } from "@/core/application/port";

type Deps = Pick<ServiceContext, "userRepository">;

export class UserIsLoggedUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(userId: string): Promise<boolean> {
    const { userRepository } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user || user.status != "active") return false;
    return true;
  }
}
