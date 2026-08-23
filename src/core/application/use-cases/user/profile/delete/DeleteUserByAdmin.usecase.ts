import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "../../../../port/ServiceContext";
import { UnauthorizedError } from "@/core/errors/Unauthorized";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class DeleteUserByAdminUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, userId: string): Promise<void> {
    const { userRepository, tokenService } = this.deps;
    const { userId: adminId } = await tokenService.verify(token);
    const user = await userRepository.getById(adminId);
    if (!user) throw new UserNotFoundError();
    if (user.role == "user") throw new UnauthorizedError();
    await userRepository.delete(userId);
  }
}
