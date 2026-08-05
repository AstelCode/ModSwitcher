import { Mod } from "@/core/domain/model/Mod/Mod";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "modRepository"
>;

export class CreateModUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      name: string;
      description: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, modRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = new Mod({
      name: args.name,
      description: args.description,
      authorId: user.getId(),
      status: "draft",
    });
    await modRepository.create(mod);
  }
}
