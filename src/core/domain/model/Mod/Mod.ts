import { CommentModel, CommentJson } from "../Comment";
import {
  ExternalId,
  ExternalIdPersistence,
  ExternalIdJson,
} from "../ExternalId";
import { FileModel, FilePersistence, FileJson } from "../file/File";
import { User, UserJson } from "../User";
import { ModFile, ModFileJson } from "./ModFile";

export interface ModArgs {
  id?: string;
  name: string;
  description: string;
  author?: User;
  files?: ModFile[];
  icon?: FileModel;
  images?: FileModel[];
  comments?: CommentModel[];
  externalIds?: ExternalId[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ModPersistence {
  name: string;
  description: string;
  authorId?: string;
  images: FilePersistence[];
  iconId?: string;
  externalIds: ExternalIdPersistence[];
}
export interface ModJson {
  id: string;
  name: string;
  description: string;
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
  author?: User;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: CommentModel[];
  files?: ModFile[];
  images?: FileModel[];
  icon?: FileModel;
  externalIds?: ExternalId[];
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
    return {
      iconId: this.icon?.id,
      name: this.name,
      description: this.description,
      images: this.images.map((image) => image.toPersistence()),
      authorId: this.author?.id,
      externalIds: this.externalIds.map((externalId) =>
        externalId.toPersistence(),
      ),
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
    };
  }
}
