import { ModUpdateData } from "@/core/domain/port/mod/ModRepository";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "modRepository"
>;

export class UpdateModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { modId: string; mod: ModUpdateData },
  ): Promise<void> {
    const { userRepository, tokenService, modRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId);
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");
    await modRepository.update(args.modId, args.mod);
  }
}
