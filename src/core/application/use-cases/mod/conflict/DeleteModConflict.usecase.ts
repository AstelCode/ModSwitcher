import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "modRepository" | "tokenService" | "modConflictRepository"
>;
export class DeleteModConflictUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { modConflictId: string }): Promise<void> {
    const { userRepository, tokenService, modConflictRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const modConflict = await modConflictRepository.getById(args.modConflictId);
    if (!modConflict) throw new Error("ModConflict not found");
    if (modConflict.modId != user.getId()) throw new Error("Unauthorized");
    await modConflictRepository.delete(args.modConflictId);
  }
}
