import { PackShader } from "@/core/domain/model/pack/PackShader";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packShaderRepository"
>;

export class AddPackShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      packId: string;
      packVersionId: string;
      shaderFileId: string;
    },
  ): Promise<void> {
    //TODO: validar tiene la misma version que el packversion
    const {
      userRepository,
      tokenService,
      packRepository,
      packShaderRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    const packShader = new PackShader({
      packVersionId: args.packVersionId,
      shaderFileId: args.shaderFileId,
    });
    await packShaderRepository.create(packShader);
  }
}
