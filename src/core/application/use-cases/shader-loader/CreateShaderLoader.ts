import { ShaderLoader } from "@/core/domain/model/loaders/ShaderLoader";
import { ServiceContext } from "../../port/ServiceContext";
import { UploadLocalFileInput } from "../../port/FileService";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "fileService" | "shaderLoaderRepository"
>;

export class CreateShaderLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      name: string;
      url?: string;
      file?: UploadLocalFileInput;
    },
  ): Promise<void> {
    const {
      userRepository,
      tokenService,
      fileService,
      shaderLoaderRepository,
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
        "shader_loader_icon",
        `shader_loader_${args.name}`,
        data,
      );
      iconFileId = iconFile.getId();
    }

    const loader = new ShaderLoader({
      name: args.name,
      iconId: iconFileId,
    });

    await shaderLoaderRepository.create(loader);
  }
}
