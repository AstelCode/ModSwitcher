import { ServiceContext } from "../../../port";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "tokenStorageService"
>;

export class GetSessionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(): Promise<{ userId: string; email: string }> {
    const { tokenService, tokenStorageService } = this.deps;
    const token = await tokenStorageService.get();
    if (!token) throw new Error("No token found");
    const payload = await tokenService.verify(token);
    return payload;
  }
}
