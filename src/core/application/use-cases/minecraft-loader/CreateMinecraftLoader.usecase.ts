import { MinecraftLoader } from "@/core/domain/model/loaders/MinecraftLoader";
import { ServiceContext } from "../../port/ServiceContext";
import { UploadLocalFileInput } from "../../port/FileService";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileService"
  | "tokenService"
  | "minecraftLoaderRepository"
>;

export class CreateMinecraftLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      name: string;
      file?: UploadLocalFileInput;
      url?: string;
    },
  ): Promise<void> {
    const {
      userRepository,
      fileService,
      tokenService,
      minecraftLoaderRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");

    let data: undefined | string | UploadLocalFileInput = undefined;
    if (args.file) {
      data = args.file;
    } else if (args.url) {
      data = args.url;
    }
    let iconFileId: string | undefined = undefined;
    if (data != undefined) {
      const iconFile = await fileService.upload(
        "loader_icon",
        `loader_${args.name}`,
        data,
      );
      iconFileId = iconFile.getId();
    }
    const loader = new MinecraftLoader({
      name: args.name,
      iconId: iconFileId,
    });
    await minecraftLoaderRepository.create(loader);
  }
}
