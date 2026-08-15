import { UploadLocalFileInput } from "@/core/application/port/FileService";
import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "uuidService"
  | "fileService"
  | "tokenService"
  | "shaderRepository"
>;

export class AddShaderImageUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      shaderId: string;
    },
  ): Promise<void> {
    const {
      fileService,
      userRepository,
      uuidService,
      tokenService,
      shaderRepository,
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
    const uuid = await uuidService.generate();
    const imageFile = await fileService.upload(
      "shader_image",
      `${args.shaderId}_${uuid}`,
      data,
    );
    await shaderRepository.update(args.shaderId, {
      iconId: imageFile.id,
    });
  }
}
