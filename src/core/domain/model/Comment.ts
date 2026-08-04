import { Mod, ModJson } from "./Mod/Mod";
import { Pack, PackJson } from "./pack/Pack";
import { Shader, ShaderJson } from "./shader/Shader";
import { User, UserJson } from "./User";

export interface CommentArgs {
  id?: string;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shader?: Shader;
  mod?: Mod;
  pack?: Pack;
}
export interface CommentPersistence {
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shaderId?: string;
  modId?: string;
  packId?: string;
}
export interface CommentJson {
  id: string;
  author: UserJson;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shader?: ShaderJson;
  mod?: ModJson;
  pack?: PackJson;
}
export class CommentModel {
  id?: string;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  shader?: Shader;
  mod?: Mod;
  pack?: Pack;
  constructor(args: CommentArgs) {
    this.id = args.id;
    this.author = args.author;
    this.content = args.content;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.shader = args.shader;
    this.mod = args.mod;
    this.pack = args.pack;
  }
  toPersistence(): CommentPersistence {
    if (this.author == null) throw new Error("Comment must have an author");
    if (this.content == null) throw new Error("Comment must have a content");
    if (this.createdAt == null)
      throw new Error("Comment must have a createdAt");
    if (this.updatedAt == null)
      throw new Error("Comment must have a updatedAt");
    if (this.shader == null) throw new Error("Comment must have a shader");
    if (this.mod == null) throw new Error("Comment must have a mod");
    if (this.pack == null) throw new Error("Comment must have a pack");
    if (!this.author.id) throw new Error("Comment must have an author id");
    return {
      authorId: this.author.id,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      shaderId: this.shader?.id,
      modId: this.mod?.id,
      packId: this.pack?.id,
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
