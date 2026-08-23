import { ServiceContext } from "@/core/application/port";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;

export class LogoutUseCase {
  constructor(private readonly deps: Deps) {}
  async execute() {
    const { tokenStorageService } = this.deps;
    await tokenStorageService.delete();
  }
}
