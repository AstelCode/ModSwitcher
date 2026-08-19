import { UserNotActiveError } from "@/core/application/Errors/UserNotActive";
import { UserNotFoundError } from "@/core/application/Errors/UserNotFound";
import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class UserAlreadyActiveUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string) {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError("User not found");
    if (user.status != "active")
      throw new UserNotActiveError("User not active");
    return true;
  }
}
