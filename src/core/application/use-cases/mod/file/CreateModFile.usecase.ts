import { ModFile } from "@/core/domain/model/mod/ModFile";
import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "modFileRepository" | "tokenService" | "fileService"
>;

export class CreateModFileUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      modId: string;
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
    if (user.role == "user") throw new Error("Unauthorized");
    let data: string | UploadLocalFileInput;
    if (args.file) {
      data = args.file;
    } else if (args.url) {
      data = args.url;
    } else {
      throw new Error("No file or url provided");
    }

    const file = await fileService.upload(
      "mod",
      `${args.modId}_${args.version}_${args.loaderId}`,
      data,
    );

    const modFile = new ModFile({
      fileId: file.getId(),
      modId: args.modId,
      version: args.version,
      minecraftVersionId: args.minecraftVersionId,
      loaderId: args.loaderId,
      authorId: user.getId(),
    });
    await modFileRepository.create(modFile);
  }
}
