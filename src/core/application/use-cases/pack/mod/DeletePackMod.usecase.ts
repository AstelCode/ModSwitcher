import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packModRepository"
>;
export class DeletePackModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { packModId: string }): Promise<void> {
    const { userRepository, tokenService, packModRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const packMod = await packModRepository.getById(args.packModId, {
      packVersion: true,
    });
    if (!packMod) throw new Error("PackMod not found");
    if (packMod.packVersion?.packId != user.getId())
      throw new Error("Unauthorized");
    await packModRepository.delete(args.packModId);
  }
}
