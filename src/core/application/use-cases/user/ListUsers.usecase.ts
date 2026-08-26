import { UserFilter, UserPagination } from "@/core/domain/port/UserRepository";
import { ServiceContext } from "../../port/ServiceContext";
import { UserJson } from "@/core/domain/model/user/User";
import { UserRole } from "@/core/infrastructure/repositories/prisma/connection/enums";

type Deps = Pick<ServiceContext, "userRepository">;

export class ListUsersUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    userId: string,
    userFilter?: UserFilter,
    pagination?: UserPagination,
  ): Promise<UserJson[]> {
    const { userRepository } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    let roles: UserRole[] = [];
    if (user.role == "superuser") roles = ["admin", "superuser", "user"];
    if (user.role == "admin") roles = ["user"];

    const users = await userRepository.getAll({
      filter: {
        ...userFilter,
        role: roles,
      },
      pagination,
      include: {
        avatar: true,
      },
    });

    return users
      .filter((item) => item.id != user.id!)
      .map((user) => user.toJson());
  }
}
