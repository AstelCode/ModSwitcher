import { PackVersionJson } from "@/core/domain/model/pack/PackVersion";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "packRepository" | "tokenService" | "packVersionRepository"
>;

export class GetPackVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { packId: string; packVersionId: string },
  ): Promise<PackVersionJson> {
    const {
      packRepository,
      userRepository,
      tokenService,
      packVersionRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    const packVersion = await packVersionRepository.getById(args.packVersionId);
    if (!packVersion) throw new Error("PackVersion not found");
    if (packVersion.packId != args.packId) throw new Error("Unauthorized");
    packVersion.pack = pack;
    return packVersion.toJson();
  }
}
