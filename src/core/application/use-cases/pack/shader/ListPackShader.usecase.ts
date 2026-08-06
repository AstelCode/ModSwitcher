import { PackShaderJson } from "@/core/domain/model/pack/PackShader";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packShaderRepository"
>;

export class ListPackShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      packVersionId: string;
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<PackShaderJson[]> {
    const { userRepository, tokenService, packShaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const packShader = await packShaderRepository.getAll({
      pagination: args.pagination,
      filter: {
        packVersionId: args.packVersionId,
      },
      include: {
        packVersion: true,
        shaderFile: true,
      },
    });
    return packShader.map((packShader) => packShader.toJson());
  }
}
