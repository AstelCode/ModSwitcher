import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileRepository" | "tokenService"
>;
export class DeleteUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string): Promise<void> {
    const { fileRepository, userRepository, tokenService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    await fileRepository.delete(user.getAvatarId());
    await userRepository.delete(userId);
  }
}
