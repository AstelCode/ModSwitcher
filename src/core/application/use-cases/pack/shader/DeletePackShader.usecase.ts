import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packShaderRepository"
>;
export class DeletePackShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { packShaderId: string }): Promise<void> {
    const { userRepository, tokenService, packShaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const packShader = await packShaderRepository.getById(args.packShaderId, {
      packVersion: true,
    });
    if (!packShader) throw new Error("PackShader not found");
    if (packShader.packVersion?.packId != user.getId())
      throw new Error("Unauthorized");
    await packShaderRepository.delete(args.packShaderId);
  }
}
