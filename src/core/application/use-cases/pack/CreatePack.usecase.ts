import { Pack } from "@/core/domain/model/pack/Pack";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "packRepository"
>;

export class CreatePackUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      name: string;
      description: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, packRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = new Pack({
      name: args.name,
      description: args.description,
      authorId: user.getId(),
    });
    await packRepository.create(pack);
  }
}
