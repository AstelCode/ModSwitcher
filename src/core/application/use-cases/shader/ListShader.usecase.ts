import { ShaderJson } from "@/core/domain/model/shader/Shader";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "shaderRepository"
>;

export class ListShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<ShaderJson[]> {
    const { userRepository, tokenService, shaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shaders = await shaderRepository.getAll({
      pagination: args.pagination,
      include: {
        author: true,
        images: true,
        icon: true,
      },
    });
    return shaders.map((shader) => shader.toJson());
  }
}
