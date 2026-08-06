import { ModConflict } from "@/core/domain/model/Mod/ModConflict";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "modRepository" | "tokenService" | "modConflictRepository"
>;
export class CreateModConlictUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      modId: string;
      conflictModId: string;
      comment: string;
    },
  ): Promise<void> {
    const {
      userRepository,
      tokenService,
      modRepository,
      modConflictRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId);
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");
    const conflictMod = await modRepository.getById(args.conflictModId);
    if (!conflictMod) throw new Error("ConflictMod not found");
    if (conflictMod.authorId != user.getId()) throw new Error("Unauthorized");
    await modConflictRepository.create(
      new ModConflict({
        modId: args.modId,
        conflictModId: args.conflictModId,
        comment: args.comment,
      }),
    );
  }
}
