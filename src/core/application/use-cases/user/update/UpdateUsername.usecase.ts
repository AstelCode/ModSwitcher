import { User } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService"
>;
export class UpdateUsernameUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    userId: string,
    args: {
      password: string;
      newUsername: string;
    },
  ): Promise<void> {
    const { userRepository, hashService } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const isValid = await hashService.compare(user.password, args.password);
    if (!isValid) throw new Error("The password is incorrect");
    await userRepository.update(userId, {
      username: args.newUsername,
    });
  }
}
