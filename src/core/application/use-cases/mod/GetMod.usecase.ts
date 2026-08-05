import { ModJson } from "@/core/domain/model/Mod/Mod";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileRepository"
  | "tokenService"
  | "fileService"
  | "modRepository"
>;

export class GetModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { modId: string }): Promise<ModJson> {
    const { userRepository, tokenService, modRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId);
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");
    return mod.toJson();
  }
}
