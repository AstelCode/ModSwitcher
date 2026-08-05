import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "fileRepository" | "userRepository" | "tokenService" | "modFileRepository"
>;

export class DeleteModFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, id: string): Promise<void> {
    const { userRepository, fileRepository, tokenService, modFileRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const modFile = await modFileRepository.getById(id);
    if (!modFile) throw new Error("ModFile not found");
    await fileRepository.delete(modFile.getFileId());
    await modFileRepository.delete(id);
  }
}
