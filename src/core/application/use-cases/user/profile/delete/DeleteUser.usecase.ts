import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { ServiceContext } from "../../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileRepository" | "tokenService"
>;

export class DeleteUserUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(userId: string): Promise<void> {
    const { fileRepository, userRepository } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    await fileRepository.delete(user.getAvatarId());
    await userRepository.delete(userId);
  }
}
