import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileService"
  | "tokenService"
  | "minecraftLoaderRepository"
>;
export class DeleteMinecraftLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { loaderId: string }): Promise<void> {
    const {
      userRepository,
      fileService,
      tokenService,
      minecraftLoaderRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const loader = await minecraftLoaderRepository.getById(args.loaderId);
    if (!loader) throw new Error("Loader not found");

    if (loader.iconId != undefined)
      await fileService.delete(loader.getIconId());

    await minecraftLoaderRepository.delete(args.loaderId);
  }
}
