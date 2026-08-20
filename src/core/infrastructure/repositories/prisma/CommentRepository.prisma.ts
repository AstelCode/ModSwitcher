import {
  CommentFilter,
  CommentPagination,
  CommentRepository,
  CommentUpdateData,
} from "@/core/domain/port/CommentRepository";
import { CommentInclude } from "./connection/models";
import { PrismaClient } from "./connection/client";
import { CommentModel } from "@/core/domain/model/Comment";
import { Mod } from "@/core/domain/model/mod/Mod";
import { Pack } from "@/core/domain/model/pack/Pack";
import { Shader } from "@/core/domain/model/shader/Shader";
import { User } from "@/core/domain/model/user/User";

export class CommentRepositoryPrisma implements CommentRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: CommentFilter;
    pagination?: CommentPagination;
    include?: CommentInclude;
  }): Promise<CommentModel[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        authorId: data?.filter?.authorId,
        content: data?.filter?.content,
        createdAt: data?.filter?.createdAt,
        updatedAt: data?.filter?.updatedAt,
        shaderId: data?.filter?.shaderId,
        modId: data?.filter?.modId,
        packId: data?.filter?.packId,
      },
      include: {
        author: data?.include?.author,
        shader: data?.include?.shader,
        mod: data?.include?.mod,
        pack: data?.include?.pack,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return comments.map(
      (comment) =>
        new CommentModel({
          ...comment,
          shader: comment.shader ? new Shader(comment.shader) : null,
          mod: comment.mod ? new Mod(comment.mod) : null,
          pack: comment.pack ? new Pack(comment.pack) : null,
          author: comment.author ? new User(comment.author) : null,
        }),
    );
  }
  async getById(
    id: string,
    include?: CommentInclude,
  ): Promise<CommentModel | undefined> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
      include: {
        author: include?.author,
        shader: include?.shader,
        mod: include?.mod,
        pack: include?.pack,
      },
    });
    if (!comment) return;
    return new CommentModel({
      ...comment,
      shader: comment.shader ? new Shader(comment.shader) : null,
      mod: comment.mod ? new Mod(comment.mod) : null,
      pack: comment.pack ? new Pack(comment.pack) : null,
      author: comment.author ? new User(comment.author) : null,
    });
  }

  async create(comment: CommentModel): Promise<CommentModel> {
    const commentPersistence = comment.toPersistence();
    const createdComment = await this.prisma.comment.create({
      data: commentPersistence,
    });
    return new CommentModel({
      ...createdComment,
    });
  }
  async update(id: string, comment: CommentUpdateData): Promise<CommentModel> {
    const updatedComment = await this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        authorId: comment.authorId,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        shaderId: comment.shaderId,
        modId: comment.modId,
        packId: comment.packId,
      },
    });
    return new CommentModel({
      ...updatedComment,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
