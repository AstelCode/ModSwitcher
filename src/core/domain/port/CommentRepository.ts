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
export interface CommentRepository {
  getAll(data?: {
    filter?: CommentFilter;
    pagination?: CommentPagination;
  }): Promise<Comment[]>;
  getById(id: string): Promise<Comment | undefined>;
  create(comment: Comment): Promise<Comment>;
  update(id: string, comment: CommentUpdateData): Promise<Comment>;
  delete(id: string): Promise<void>;
}
