import { ServiceContext } from "../../../port/ServiceContext";
type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "shaderFileRepository"
>;
export class DeleteShaderFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { shaderFileId: string }): Promise<void> {
    const { userRepository, tokenService, fileService, shaderFileRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shaderFile = await shaderFileRepository.getById(args.shaderFileId);
    if (!shaderFile) throw new Error("ShaderFile not found");
    if (shaderFile.shaderId != user.getId()) throw new Error("Unauthorized");
    await fileService.delete(shaderFile.getFileId());
    await shaderFileRepository.delete(args.shaderFileId);
  }
}
