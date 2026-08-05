import { UserFilter, UserPagination } from "@/core/domain/port/UserRepository";
import { ServiceContext } from "../../port/ServiceContext";
import { UserJson } from "@/core/domain/model/User";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService"
>;

export class ListUsersUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    userFilter?: UserFilter,
    pagination?: UserPagination,
  ): Promise<UserJson[]> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");

    const users = await userRepository.getAll({
      filter: {
        ...userFilter,
        role: user.role == "superuser" ? ["admin", "superuser"] : "user",
      },
      pagination,
      include: {
        avatar: true,
      },
    });
    return users.map((user) => user.toJson());
  }
}
