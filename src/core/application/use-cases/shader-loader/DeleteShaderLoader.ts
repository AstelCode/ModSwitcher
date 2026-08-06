import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "shaderLoaderRepository"
>;
export class DeleteShaderLoaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, args: { loaderId: string }): Promise<void> {
    const { userRepository, tokenService, shaderLoaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const loader = await shaderLoaderRepository.getById(args.loaderId);
    if (!loader) throw new Error("Loader not found");
    await shaderLoaderRepository.delete(args.loaderId);
  }
}
