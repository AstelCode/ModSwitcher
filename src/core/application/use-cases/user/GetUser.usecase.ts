import { UserJson } from "@/core/domain/model/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class GetUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string): Promise<UserJson> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId, {
      avatar: true,
      shaders: true,
      packs: true,
      mods: true,
    });
    if (!user) throw new Error("User not found");
    return user.toJson();
  }
}
