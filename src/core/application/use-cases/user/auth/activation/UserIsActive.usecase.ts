import { UserNotActiveError } from "@/core/errors/UserNotActive";
import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class UserIsActiveUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string) {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    if (user.status != "active")
      throw new UserNotActiveError();
    return true;
  }
}
