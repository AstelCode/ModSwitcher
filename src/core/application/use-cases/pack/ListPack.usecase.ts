import { PackJson } from "@/core/domain/model/pack/Pack";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository"
>;

export class ListPackUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<PackJson[]> {
    const { userRepository, tokenService, packRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const packs = await packRepository.getAll({
      pagination: args.pagination,
      include: {
        author: true,
        images: true,
        icon: true,
      },
    });
    return packs.map((pack) => pack.toJson());
  }
}
