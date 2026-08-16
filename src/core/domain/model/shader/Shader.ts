import { CommentModel, CommentJson } from "../Comment";
import { ExternalId, ExternalIdJson } from "../ExternalId";
import { FileModel, FileJson } from "../file/File";
import { User, UserJson } from "../User";
import { ShaderFile, ShaderFileJson } from "./ShaderFile";

export interface ShaderArgs {
  id?: string;
  name: string;
  description: string;
  author?: User | null;
  authorId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: CommentModel[];
  files?: ShaderFile[];
  images?: FileModel[];
  icon?: FileModel | null;
  iconId?: string | null;
  externalIds?: ExternalId[];
}
export interface ShaderPersistence {
  name: string;
  description: string;
  authorId?: string | null;
  //images: FilePersistence[];
  iconId?: string | null;
  //externalIds: ExternalIdPersistence[];
}
export interface ShaderJson {
  id: string;
  name: string;
  description: string | null;
  author?: UserJson | null;
  createdAt: Date;
  updatedAt: Date;
  comments?: CommentJson[];
  files?: ShaderFileJson[];
  images?: FileJson[];
  icon?: FileJson | null;
  externalIds?: ExternalIdJson[];
}
export class Shader {
  id?: string;
  name: string;
  description: string;
  author?: User | null;
  authorId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: CommentModel[];
  files?: ShaderFile[];
  images?: FileModel[];
  icon?: FileModel | null;
  iconId?: string | null;
  externalIds?: ExternalId[];
  constructor(args: ShaderArgs) {
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.author = args.author;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.comments = args.comments;
    this.files = args.files;
    this.images = args.images;
    this.icon = args.icon;
    this.externalIds = args.externalIds;
    this.iconId = args.icon?.id ?? args.iconId;
    this.authorId = args.author?.id ?? args.authorId;
  }
  getId(): string {
    if (!this.id) throw new Error("Shader must have an id");
    return this.id;
  }
  getIconId(): string {
    if (!this.iconId) throw new Error("Shader must have an icon");
    return this.iconId;
  }
  getImagesIds(): string[] {
    if (!this.images) throw new Error("Shader must have images");
    return this.images.map((image) => image.getId());
  }
  toPersistence(): ShaderPersistence {
    if (!this.name) throw new Error("Shader must have a name");
    if (!this.description) throw new Error("Shader must have a description");
    if (!this.createdAt) throw new Error("Shader must have a createdAt");
    if (!this.updatedAt) throw new Error("Shader must have a updatedAt");
    if (!this.comments) throw new Error("Shader must have comments");
    if (!this.files) throw new Error("Shader must have files");
    if (!this.images) throw new Error("Shader must have images");
    if (!this.externalIds) throw new Error("Shader must have externalIds");

    return {
      iconId: this.iconId,
      name: this.name,
      description: this.description,
      //     images: this.images.map((image) => image.toPersistence()),
      authorId: this.authorId,
      //externalIds: this.externalIds.map((externalId) =>
      // externalId.toPersistence(),
      //),
    };
  }
  toJson(): ShaderJson {
    if (!this.id) throw new Error("Shader must have an id");
    if (!this.name) throw new Error("Shader must have a name");
    if (!this.description) throw new Error("Shader must have a description");
    if (!this.createdAt) throw new Error("Shader must have a createdAt");
    if (!this.updatedAt) throw new Error("Shader must have a updatedAt");
    if (!this.icon) throw new Error("Shader must have an icon");
    if (!this.externalIds) throw new Error("Shader must have externalIds");
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      author: this.author?.toJson(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      comments: this.comments?.map((comment) => comment.toJson()),
      files: this.files?.map((file) => file.toJson()),
      images: this.images?.map((image) => image.toJson()),
      icon: this.icon?.toJson(),
      externalIds: this.externalIds?.map((externalId) => externalId.toJson()),
    };
  }
}
