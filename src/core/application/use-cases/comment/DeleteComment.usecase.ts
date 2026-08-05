import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "commentRepository" | "tokenService"
>;
export class DeleteCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, id: string): Promise<void> {
    const { userRepository, tokenService, commentRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const comment = await commentRepository.getById(id, {
      author: true,
    });
    if (user.role == "user" && comment?.authorId != user.getId())
      throw new Error("Unauthorized");
    await commentRepository.delete(id);
  }
}
