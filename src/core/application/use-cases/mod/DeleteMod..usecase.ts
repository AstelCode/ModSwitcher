import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileRepository"
  | "tokenService"
  | "fileService"
  | "modRepository"
  | "modFileRepository"
>;
export class DeleteModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { modId: string }): Promise<void> {
    //TODO: validar si esta contenido en pack
    const {
      modFileRepository,
      userRepository,
      tokenService,
      fileService,
      modRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId, { images: true });
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");

    const modFiles = await modFileRepository.getAll({
      filter: {
        modId: args.modId,
      },
      include: {
        file: true,
      },
    });

    for (const modFile of modFiles) {
      await fileService.delete(modFile.getFileId());
    }
    await fileService.deleteList(mod.getImagesIds());
    await fileService.delete(mod.getIconId());
    await modRepository.delete(args.modId);
  }
}
