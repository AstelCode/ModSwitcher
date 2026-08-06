import { MinecraftVersion } from "@/core/domain/model/loaders/MinecraftVersion";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "minecraftVersionRepository"
>;

export class CreateMinecraftVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      minor: number;
      major: number;
      patch: number;
    },
  ): Promise<void> {
    const { userRepository, tokenService, minecraftVersionRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const version = new MinecraftVersion({
      minor: args.minor,
      major: args.major,
      patch: args.patch,
    });
    await minecraftVersionRepository.create(version);
  }
}
