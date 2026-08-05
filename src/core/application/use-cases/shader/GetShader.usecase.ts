import { ShaderJson } from "@/core/domain/model/shader/Shader";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "shaderRepository"
>;

export class GetShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { shaderId: string },
  ): Promise<ShaderJson> {
    const { userRepository, tokenService, shaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shader = await shaderRepository.getById(args.shaderId);
    if (!shader) throw new Error("Shader not found");
    if (shader.authorId != user.getId()) throw new Error("Unauthorized");
    return shader.toJson();
  }
}
