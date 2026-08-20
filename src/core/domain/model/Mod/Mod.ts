import { CommentModel, CommentJson } from "../Comment";
import {
  ExternalId,
  ExternalIdPersistence,
  ExternalIdJson,
} from "../ExternalId";
import { FileModel, FileJson } from "../file/File";
import { User, UserJson } from "../user/User";
import { ModFile, ModFileJson } from "./ModFile";

export type ModStatus = "published" | "draft" | "rejected";
export interface ModArgs {
  id?: string;
  name: string;
  description: string;
  author?: User | null;
  authorId?: string | null;
  files?: ModFile[];
  icon?: FileModel | null;
  iconId?: string | null;
  images?: FileModel[];
  comments?: CommentModel[];
  externalIds?: ExternalId[];
  createdAt?: Date;
  updatedAt?: Date;
  status: ModStatus;
}
export interface ModPersistence {
  name: string;
  description: string;
  status: ModStatus;
  authorId: string | null;
  iconId?: string | null;
}
export interface ModJson {
  id: string;
  name: string;
  description: string;
  status: ModStatus;
  author?: UserJson;
  createdAt: Date;
  updatedAt: Date;
  comments?: CommentJson[];
  files?: ModFileJson[];
  images?: FileJson[];
  icon?: FileJson;
  externalIds?: ExternalIdJson[];
}
export class Mod {
  id?: string;
  name: string;
  description: string;
  author?: User | null;
  authorId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: CommentModel[];
  files?: ModFile[];
  images?: FileModel[];
  icon?: FileModel | null;
  iconId?: string | null;
  externalIds?: ExternalId[];
  status: ModStatus;
  constructor(args: ModArgs) {
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
    this.authorId = args.author?.id ?? args.authorId;
    this.status = args.status;
    this.iconId = args.icon?.id ?? args.iconId;
  }
  getId(): string {
    if (!this.id) throw new Error("Mod must have an id");
    return this.id;
  }
  getIconId(): string {
    if (!this.iconId) throw new Error("Mod must have an icon");
    return this.iconId;
  }
  getImagesIds(): string[] {
    if (!this.images) throw new Error("Mod must have images");
    return this.images.map((image) => image.getId());
  }
  toPersistence(): ModPersistence {
    if (!this.name) throw new Error("Mod must have a name");
    if (!this.description) throw new Error("Mod must have a description");
    if (!this.createdAt) throw new Error("Mod must have a createdAt");
    if (!this.updatedAt) throw new Error("Mod must have a updatedAt");
    if (!this.comments) throw new Error("Mod must have comments");
    if (!this.files) throw new Error("Mod must have files");
    if (!this.images) throw new Error("Mod must have images");
    if (!this.externalIds) throw new Error("Mod must have externalIds");
    if (!this.iconId) throw new Error("Mod must have an icon");
    if (!this.authorId) throw new Error("Mod must have an author");
    return {
      iconId: this.icon?.id,
      name: this.name,
      description: this.description,
      authorId: this.authorId,

      status: this.status,
    };
  }
  toJson(): ModJson {
    if (!this.id) throw new Error("Mod must have an id");
    if (!this.name) throw new Error("Mod must have a name");
    if (!this.description) throw new Error("Mod must have a description");
    if (!this.createdAt) throw new Error("Mod must have a createdAt");
    if (!this.updatedAt) throw new Error("Mod must have a updatedAt");
    if (!this.icon) throw new Error("Mod must have an icon");
    if (!this.externalIds) throw new Error("Mod must have externalIds");
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
      status: this.status,
    };
  }
}
