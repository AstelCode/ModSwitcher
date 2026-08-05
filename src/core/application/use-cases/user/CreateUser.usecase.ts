import { User } from "@/core/domain/model/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "hashService" | "activationCodeService" | "emailService"
>;
export class CreateUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(args: {
    username: string;
    password: string;
    email: string;
  }): Promise<string> {
    const { emailService, userRepository, hashService, activationCodeService } =
      this.deps;
    const code = await activationCodeService.generate(args.email);
    const user = new User({
      username: args.username,
      password: await hashService.hash(args.password),
      email: args.email,
      role: "user",
      activationCode: code,
      status: "inactive",
    });
    await userRepository.create(user);
    await emailService.sendActivationEmail(args.email, code);
    return user.getId();
  }
}
