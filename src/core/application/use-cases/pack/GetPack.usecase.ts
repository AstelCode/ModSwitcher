import { PackJson } from "@/core/domain/model/pack/Pack";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository"
>;

export class GetPackUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { packId: string }): Promise<PackJson> {
    const { userRepository, tokenService, packRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId, {
      icon: true,
      images: true,
      packVersions: true,
    });
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    return pack.toJson();
  }
}
