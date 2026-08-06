import { MinecraftLoaderJson } from "@/core/domain/model/loaders/MinecraftLoader";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "minecraftLoaderRepository"
>;
export class ListShaderLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<MinecraftLoaderJson[]> {
    const { userRepository, tokenService, minecraftLoaderRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const loaders = await minecraftLoaderRepository.getAll({
      pagination: args.pagination,
      include: {
        icon: true,
      },
    });
    return loaders.map((loader) => loader.toJson());
  }
}
