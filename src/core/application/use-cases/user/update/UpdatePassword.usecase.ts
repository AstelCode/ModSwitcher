import { User } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService"
>;
export class UpdatePasswordUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    userId: string,
    args: { lastPassword: string; password: string },
  ): Promise<User> {
    const { userRepository, hashService } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const isValid = await hashService.compare(user.password, args.lastPassword);
    if (!isValid) throw new Error("Invalid password");
    user.password = await hashService.hash(args.password);
    await userRepository.update(userId, {
      password: user.password,
    });
    return user;
  }
}
