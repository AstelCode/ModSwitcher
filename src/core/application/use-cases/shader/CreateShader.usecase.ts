import { Shader } from "@/core/domain/model/shader/Shader";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "shaderRepository"
>;

export class CreateShaderUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      name: string;
      description: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, shaderRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const shader = new Shader({
      name: args.name,
      description: args.description,
      authorId: user.getId(),
    });
    await shaderRepository.create(shader);
  }
}
