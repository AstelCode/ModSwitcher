import { CommentModel } from "../model/Comment";

export interface CommentFilter {
  authorId?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  shaderId?: string;
  modId?: string;
  packId?: string;
}
export interface CommentPagination {
  limit?: number;
  offset?: number;
}
export interface CommentUpdateData {
  authorId?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  shaderId?: string;
  modId?: string;
  packId?: string;
}

export interface CommentInclude {
  author?: boolean;
  shader?: boolean;
  mod?: boolean;
  pack?: boolean;
}
export interface CommentRepository {
  getAll(data?: {
    filter?: CommentFilter;
    pagination?: CommentPagination;
    include?: CommentInclude;
  }): Promise<CommentModel[]>;
  getById(
    id: string,
    include?: CommentInclude,
  ): Promise<CommentModel | undefined>;
  create(comment: CommentModel): Promise<CommentModel>;
  update(id: string, comment: CommentUpdateData): Promise<CommentModel>;
  delete(id: string): Promise<void>;
}
