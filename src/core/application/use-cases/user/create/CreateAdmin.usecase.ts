import { User } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "hashService"
  | "activationCodeService"
  | "emailService"
  | "tokenService"
>;

export class CreateAdminUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    superAdminToken: string,
    args: { name: string; email: string; password: string },
  ): Promise<string> {
    const {
      emailService,
      userRepository,
      hashService,
      activationCodeService,
      tokenService,
    } = this.deps;

    const { userId: superAdminId } = await tokenService.verify(superAdminToken);
    const superUser = await userRepository.getById(superAdminId);
    if (!superUser || superUser.role != "superuser")
      throw new Error("Unauthorized");
    const code = await activationCodeService.generate(args.email);
    const user = new User({
      username: args.name,
      password: await hashService.hash(args.password),
      email: args.email,
      role: "admin",
      activationCode: code,
      status: "inactive",
    });
    await userRepository.create(user);
    await emailService.sendActivationEmail(args.email, code);
    return user.getId();
  }
}
