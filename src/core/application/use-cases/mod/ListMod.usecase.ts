import { ModJson } from "@/core/domain/model/mod/Mod";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "modRepository" | "tokenService"
>;

export class ListModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    args: {
      name?: string;
      description?: string;
      authorId?: string;
      imagesId?: string;
      iconId?: string;
      externalIdsId?: string;
      createdAt?: Date;
      updatedAt?: Date;
    },
    token?: string,
  ): Promise<ModJson[]> {
    const { modRepository } = this.deps;
    let userId: string | undefined;

    if (token) {
      userId = (await this.deps.tokenService.verify(token)).userId;
      const user = await this.deps.userRepository.getById(userId);
      if (!user) throw new Error("User not found");
      if (user.role == "user") throw new Error("Unauthorized");
    }

    const mods = await modRepository.getAll({
      filter: {
        ...args,
        status: userId == undefined ? undefined : "published",
        authorId: userId,
      },
      include: {
        author: userId == undefined ? true : true,
        images: true,
        icon: true,
        externalIds: true,
      },
    });
    return mods.map((mod) => mod.toJson());
  }
}
