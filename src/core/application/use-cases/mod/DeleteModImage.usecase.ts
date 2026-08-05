import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileRepository"
  | "tokenService"
  | "fileService"
  | "modRepository"
>;
export class DeleteModImageUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { modId: string; imageId: string },
  ): Promise<void> {
    const { userRepository, tokenService, fileService, modRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId);
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");
    await fileService.delete(args.imageId);
  }
}
