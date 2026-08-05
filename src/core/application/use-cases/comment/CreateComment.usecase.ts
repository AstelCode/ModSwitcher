import { ServiceContext } from "../../port/ServiceContext";
import { CommentModel } from "@/core/domain/model/Comment";
type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "commentRepository"
>;
export class CreateCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      modId?: string;
      packId?: string;
      shaderId?: string;
      comment: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, commentRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const comment = new CommentModel({
      authorId: user.getId(),
      modId: args.modId,
      packId: args.packId,
      shaderId: args.shaderId,
      content: args.comment,
    });

    await commentRepository.create(comment);
  }
}
