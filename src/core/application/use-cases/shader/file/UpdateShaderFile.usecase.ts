import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "shaderFileRepository"
>;

export class UpdateShaderFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      shaderFileId: string;
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
    const shaderFile = await shaderFileRepository.getById(args.shaderFileId);
    if (!shaderFile) throw new Error("ShaderFile not found");
    if (shaderFile.shaderId != user.getId()) throw new Error("Unauthorized");
    await fileService.update(shaderFile.getFileId(), data);
  }
}
