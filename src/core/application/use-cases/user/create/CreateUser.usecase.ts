import { User } from "@/core/domain/model/user/User";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "tokenService"
  | "hashService"
  | "activationCodeService"
  | "emailService"
>;
export class CreateUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(args: {
    username: string;
    password: string;
    email: string;
  }): Promise<string> {
    const {
      emailService,
      userRepository,
      hashService,
      activationCodeService,
      tokenService,
    } = this.deps;

    const user = await userRepository.getByEmail(args.email);
    if (user) throw new Error("User already exists");
    const code = await activationCodeService.generate(args.email);
    let newUser = new User({
      username: args.username,
      password: await hashService.hash(args.password),
      email: args.email,
      role: "user",
      activationCode: code,
      status: "inactive",
    });
    newUser = await userRepository.create(newUser);
    // TODO activade email servise
    // await emailService.sendActivationEmail(args.email, code);
    const token = await tokenService.generate(newUser.getId(), args.email);
    return token;
  }
}
