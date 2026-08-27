import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "../../../../port/ServiceContext";
import { UnauthorizedError } from "@/core/errors/Unauthorized";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "fileService"
>;
export class DeleteUserByAdminUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(adminId: string, userId: string): Promise<void> {
    const { userRepository, fileService } = this.deps;
    const adminUser = await userRepository.getById(adminId);
    if (!adminUser) throw new UserNotFoundError();
    if (adminUser.role == "user") throw new UnauthorizedError();
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    if (user.role == "admin" && adminUser.role == "admin")
      throw new UnauthorizedError();
    if (user.avatarId) await fileService.delete(user.avatarId);
    await userRepository.delete(userId);
  }
}
