import { ShaderFileJson } from "@/core/domain/model/shader/ShaderFile";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "shaderFileRepository"
>;

export class ListShaderFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      shaderId: string;
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<ShaderFileJson[]> {
    const { userRepository, tokenService, shaderFileRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shaderFile = await shaderFileRepository.getAll({
      filter: {
        shaderId: args.shaderId,
      },
      pagination: args.pagination,
      include: {
        file: true,
      },
    });
    return shaderFile.map((shaderFile) => shaderFile.toJson());
  }
}
