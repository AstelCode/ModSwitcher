import { PackVersion } from "@/core/domain/model/pack/PackVersion";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packVersionRepository"
>;

export class CreatePackVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      packId: string;
      version: string;
      minecraftVersionId: string;
      minecraftLoaderId: string;
    },
  ): Promise<void> {
    const {
      userRepository,
      tokenService,
      packVersionRepository,
      packRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");

    const packVersion = new PackVersion({
      packId: args.packId,
      version: args.version,
      minecraftVersionId: args.minecraftVersionId,
      minecraftLoaderId: args.minecraftLoaderId,
    });
    await packVersionRepository.create(packVersion);
  }
}
