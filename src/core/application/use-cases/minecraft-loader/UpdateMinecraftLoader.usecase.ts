import { MinecraftLoaderUpdateData } from "@/core/domain/port/loaders/MinecraftLoaderRepository";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileService"
  | "tokenService"
  | "minecraftLoaderRepository"
>;

export class UpdateMinecraftLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { loaderId: string; loader: MinecraftLoaderUpdateData },
  ): Promise<void> {
    const { userRepository, tokenService, minecraftLoaderRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const loader = await minecraftLoaderRepository.getById(args.loaderId);
    if (!loader) throw new Error("Loader not found");
    await minecraftLoaderRepository.update(args.loaderId, args.loader);
  }
}
