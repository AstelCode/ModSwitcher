import { CommentJson, CommentModel } from "@/core/domain/model/Comment";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "commentRepository"
>;
export class ListCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      modId?: string;
      packId?: string;
      shaderId?: string;
      content?: string;
      createdAt?: Date;
      updatedAt?: Date;
    },
  ): Promise<CommentJson[]> {
    const { userRepository, tokenService, commentRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const comments = await commentRepository.getAll({
      filter: {
        ...args,
        authorId: user.getId(),
      },
      include: {
        shader: true,
        mod: true,
        pack: true,
      },
    });

    return comments.map((comment) => comment.toJson());
  }
}
