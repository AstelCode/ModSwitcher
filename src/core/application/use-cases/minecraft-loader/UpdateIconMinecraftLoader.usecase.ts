import { UploadLocalFileInput } from "../../port/FileService";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileService"
  | "tokenService"
  | "minecraftLoaderRepository"
>;
export class UpdateIconMinecraftLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      loaderId: string;
    },
  ): Promise<void> {
    const {
      userRepository,
      tokenService,
      fileService,
      minecraftLoaderRepository,
    } = this.deps;
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
    const loader = await minecraftLoaderRepository.getById(args.loaderId);
    if (!loader) throw new Error("Loader not found");
    const iconFile = await fileService.upload(
      "loader_icon",
      `loader_${loader.name}`,
      data,
    );
    await minecraftLoaderRepository.update(args.loaderId, {
      iconId: iconFile.id,
    });
  }
}
