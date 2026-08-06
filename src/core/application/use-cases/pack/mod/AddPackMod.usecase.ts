import { PackMod } from "@/core/domain/model/pack/PackMod";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository" | "packModRepository"
>;

export class AddPackModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      packId: string;
      packVersionId: string;
      modFileId: string;
      optional: boolean;
    },
  ): Promise<void> {
    //TODO: validar tiene la misma version que el packversion
    const { userRepository, tokenService, packRepository, packModRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    const packMod = new PackMod({
      packVersionId: args.packVersionId,
      modFileId: args.modFileId,
      optional: args.optional,
    });

    await packModRepository.create(packMod);
  }
}
