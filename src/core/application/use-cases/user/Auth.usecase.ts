import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "hashService" | "tokenStorageService"
>;

export class AuthUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(email: string, password: string): Promise<void> {
    const { userRepository, tokenService, hashService, tokenStorageService } =
      this.deps;

    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error("User not found");
    const isValid = await hashService.compare(user.password, password);
    if (isValid) {
      const token = await tokenService.generate(user.getId(), user.email);
      tokenStorageService.set(token);
      return;
    }
    throw new Error("Invalid credentials");
  }
}
