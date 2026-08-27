import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "../../port";
import { UserRole } from "@/core/infrastructure/repositories/prisma/connection/client";
import { UnauthorizedError } from "@/core/errors/Unauthorized";

type Deps = Pick<ServiceContext, "userRepository">;

export class UpdateRoleUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(adminId: string, userId: string, role: UserRole) {
    const { userRepository } = this.deps;
    const admin = await userRepository.getById(adminId);
    if (!admin) throw new UserNotFoundError();
    if (admin.role != "superuser") throw new UnauthorizedError();
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    await userRepository.update(userId, { role });
  }
}
