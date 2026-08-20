import { UserJson } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;
export class GetUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(): Promise<UserJson> {
    const { userRepository, tokenService, tokenStorageService } = this.deps;
    const token = await tokenStorageService.get();
    if (!token) throw new Error("No token found");
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
