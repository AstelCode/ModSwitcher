import { User } from "@/core/domain/model/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService"
>;
export class UpdatePasswordUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    token: string,
    args: { lastPassword: string; password: string },
  ): Promise<User> {
    const { userRepository, tokenService, hashService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const isValid = await hashService.compare(user.password, args.lastPassword);
    if (!isValid) throw new Error("Invalid password");
    user.password = await hashService.hash(args.password);
    await userRepository.update(userId, user);
    return user;
  }
}
