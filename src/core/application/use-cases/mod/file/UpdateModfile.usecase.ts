import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "modFileRepository"
>;

export class UpdateModfileUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      modFileId: string;
      version: string;
      minecraftVersionId: string;
      loaderId: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, modFileRepository, fileService } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    let data: string | UploadLocalFileInput;
    if (args.file) {
      data = args.file;
    } else if (args.url) {
      data = args.url;
    } else {
      throw new Error("No file or url provided");
    }
    const modFile = await modFileRepository.getById(args.modFileId);
    if (!modFile) throw new Error("ModFile not found");
    if (modFile.authorId != user.getId()) throw new Error("Unauthorized");
    await fileService.update(modFile.getFileId(), data);
    await modFileRepository.update(args.modFileId, {
      version: args.version,
      minecraftVersionId: args.minecraftVersionId,
      loaderId: args.loaderId,
    });
  }
}
