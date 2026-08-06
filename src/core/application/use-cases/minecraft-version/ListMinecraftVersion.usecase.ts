import { MinecraftVersionJson } from "@/core/domain/model/loaders/MinecraftVersion";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "minecraftVersionRepository"
>;

export class ListMinecraftVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<MinecraftVersionJson[]> {
    const { userRepository, tokenService, minecraftVersionRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const versions = await minecraftVersionRepository.getAll({
      pagination: args.pagination,
    });
    return versions.map((version) => version.toJson());
  }
}
