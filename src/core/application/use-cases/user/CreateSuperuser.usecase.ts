import { User } from "@/core/domain/model/User";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "hashService"
  | "activationCodeService"
  | "emailService"
  | "tokenService"
  | "secretKeyService"
>;
export class CreateSuperuserUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    key: string,
    args: {
      name: string;
      email: string;
      password: string;
    },
  ): Promise<string> {
    if (!(await this.deps.secretKeyService.verify(key)))
      throw new Error("Unauthorized");

    const { emailService, userRepository, hashService, activationCodeService } =
      this.deps;

    const code = await activationCodeService.generate(args.email);
    const user = new User({
      username: args.name,
      password: await hashService.hash(args.password),
      email: args.email,
      role: "superuser",
      activationCode: code,
      status: "inactive",
    });
    await userRepository.create(user);
    await emailService.sendActivationEmail(args.email, code);
    return user.getId();
  }
}
