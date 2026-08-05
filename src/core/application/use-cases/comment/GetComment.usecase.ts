import { CommentJson } from "@/core/domain/model/Comment";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<ServiceContext, "commentRepository">;
export class GetCommentUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(id: string): Promise<CommentJson> {
    const { commentRepository } = this.deps;
    const comment = await commentRepository.getById(id, {
      author: true,
      shader: true,
      mod: true,
      pack: true,
    });
    if (!comment) throw new Error("Comment not found");
    return comment.toJson();
  }
}
