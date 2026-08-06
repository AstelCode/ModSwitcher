import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "minecraftVersionRepository"
>;
export class DeleteMinecraftVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { versionId: string }): Promise<void> {
    const { userRepository, tokenService, minecraftVersionRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const version = await minecraftVersionRepository.getById(args.versionId);
    if (!version) throw new Error("Version not found");
    await minecraftVersionRepository.delete(args.versionId);
  }
}
