import { ShaderFile } from "@/core/domain/model/shader/ShaderFile";
import { UploadLocalFileInput } from "../../port/FileService";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "shaderFileRepository"
>;

export class CreateShaderFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      shaderId: string;
      version: string;
      minecraftVersionId: string;
      loaderId: string;
      file?: UploadLocalFileInput;
      url?: string;
    },
  ): Promise<void> {
    const { fileService, userRepository, tokenService, shaderFileRepository } =
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
    const shaderFileInfo = await fileService.upload(
      "shader_file",
      `${args.shaderId}_${args.version}_${args.loaderId}_${args.minecraftVersionId}`,
      data,
    );
    const shaderFile = new ShaderFile({
      shaderId: args.shaderId,
      version: args.version,
      minecraftVersionId: args.minecraftVersionId,
      loaderId: args.loaderId,
      fileId: shaderFileInfo.id,
    });
    await shaderFileRepository.create(shaderFile);
  }
}
