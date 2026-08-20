import { UserJson } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;
export class GetUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(userId: string): Promise<UserJson> {
    const { userRepository } = this.deps;
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
