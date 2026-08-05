import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "shaderFileRepository"
  | "userRepository"
  | "fileService"
  | "tokenService"
  | "shaderRepository"
>;

export class DeleteShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { shaderId: string }): Promise<void> {
    const {
      userRepository,
      shaderFileRepository,
      tokenService,
      fileService,
      shaderRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shader = await shaderRepository.getById(args.shaderId);
    if (!shader) throw new Error("Shader not found");
    if (shader.authorId != user.getId()) throw new Error("Unauthorized");
    const shaderFiles = await shaderFileRepository.getAll({
      filter: {
        shaderId: args.shaderId,
      },
      include: {
        file: true,
      },
    });
    for (const shaderFile of shaderFiles) {
      await fileService.delete(shaderFile.getFileId());
    }
    await fileService.deleteList(shader.getImagesIds());
    await fileService.delete(shader.getIconId());
    await shaderRepository.delete(args.shaderId);
  }
}
