import { Mod, ModJson } from "./Mod/Mod";
import { Pack, PackJson } from "./pack/Pack";
import { Shader, ShaderJson } from "./shader/Shader";
import { User, UserJson } from "./User";

export interface CommentArgs {
  id?: string;
  author?: User | null;
  authorId: string | null;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  shader?: Shader | null;
  shaderId?: string | null;
  mod?: Mod | null;
  modId?: string | null;
  pack?: Pack | null;
  packId?: string | null;
}
export interface CommentPersistence {
  authorId: string;
  content: string;
  shaderId?: string;
  modId?: string;
  packId?: string;
}
export interface CommentJson {
  id: string;
  author: UserJson | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shader?: ShaderJson | null;
  mod?: ModJson | null;
  pack?: PackJson | null;
}
export class CommentModel {
  id?: string;
  author?: User | null;
  authorId?: string | null;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  shader?: Shader | null;
  shaderId?: string | null;
  mod?: Mod | null;
  modId?: string | null;
  pack?: Pack | null;
  packId?: string | null;
  constructor(args: CommentArgs) {
    this.id = args.id;
    this.author = args.author;
    this.content = args.content;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.shader = args.shader;
    this.mod = args.mod;
    this.pack = args.pack;
    this.authorId = args.author?.id ?? args.authorId;
    this.shaderId = args.shader?.id ?? args.shaderId;
    this.modId = args.mod?.id ?? args.modId;
    this.packId = args.pack?.id ?? args.packId;
  }
  toPersistence(): CommentPersistence {
    if (!this.content) throw new Error("Comment must have a content");
    if (!this.createdAt) throw new Error("Comment must have a createdAt");
    if (!this.updatedAt) throw new Error("Comment must have a updatedAt");

    if (!this.authorId) throw new Error("Comment must have an author");
    if (!this.shaderId || !this.packId || !this.modId)
      throw new Error("Comment must have a shader or mod or pack");
    return {
      authorId: this.authorId,
      content: this.content,
      shaderId: this.shaderId,
      modId: this.modId,
      packId: this.packId,
    };
  }
  toJson(): CommentJson {
    if (!this.id) throw new Error("Comment must have an id");
    if (!this.author) throw new Error("Comment must have an author");
    if (!this.content) throw new Error("Comment must have a content");
    if (!this.createdAt) throw new Error("Comment must have a createdAt");
    if (!this.updatedAt) throw new Error("Comment must have a updatedAt");
    if (!this.shader) throw new Error("Comment must have a shader");
    if (!this.mod) throw new Error("Comment must have a mod");
    if (!this.pack) throw new Error("Comment must have a pack");
    return {
      id: this.id,
      author: this.author.toJson(),
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      shader: this.shader?.toJson(),
      mod: this.mod?.toJson(),
      pack: this.pack?.toJson(),
    };
  }
}
