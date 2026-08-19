import { ServiceContext } from "@/core/application/port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;
export class UserIsLoggedUseCase {
  constructor(private readonly deps: Deps) {}
  async execute() {
    const { userRepository, tokenService, tokenStorageService } = this.deps;
    const token = await tokenStorageService.get();
    if (!token) return false;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);

    if (!user || user.status != "active") return false;
    return true;
  }
}
