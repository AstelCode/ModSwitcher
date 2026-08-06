import { ShaderUpdateData } from "@/core/domain/port/shader/ShaderRepository";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "shaderRepository"
>;

export class UpdateShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { shaderId: string; shader: ShaderUpdateData },
  ): Promise<void> {
    const { userRepository, tokenService, shaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shader = await shaderRepository.getById(args.shaderId);
    if (!shader) throw new Error("Shader not found");
    if (shader.authorId != user.getId()) throw new Error("Unauthorized");
    await shaderRepository.update(args.shaderId, args.shader);
  }
}
