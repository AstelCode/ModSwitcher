import { User } from "@/core/domain/model/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class UpdateUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      username?: string;
      avatarId?: string;
      role?: string;
    },
  ): Promise<User> {
    const { userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (args.username) user.username = args.username;
    if (args.avatarId) user.avatarId = args.avatarId;
    await userRepository.update(userId, user);
    return user;
  }
}
