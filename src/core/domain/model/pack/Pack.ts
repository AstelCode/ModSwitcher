import { CommentModel, CommentJson } from "../Comment";
import {
  ExternalId,
  ExternalIdPersistence,
  ExternalIdJson,
} from "../ExternalId";
import { FileModel, FilePersistence, FileJson } from "../file/File";
import { User, UserJson } from "../User";
import { PackVersion, PackVersionJson } from "./PackVersion";
export type PackStatus = "published" | "draft" | "rejected";
export interface PackArgs {
  id?: string;
  name: string;
  description: string;
  author?: User;
  authorId?: string;
  icon?: FileModel;
  iconId?: string;
  images?: FileModel[];
  externalIds?: ExternalId[];
  versions?: PackVersion[];
  comments?: CommentModel[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: PackStatus;
}
export interface PackPersistence {
  name: string;
  description: string;
  authorId?: string;
  images: FilePersistence[];
  iconId?: string;
  externalIds: ExternalIdPersistence[];
  status: PackStatus;
}
export interface PackJson {
  id: string;
  name: string;
  description: string;
  author?: UserJson;
  icon?: FileJson;
  images?: FileJson[];
  externalIds?: ExternalIdJson[];
  versions?: PackVersionJson[];
  status?: PackStatus;
  comments?: CommentJson[];
  createdAt: Date;
  updatedAt: Date;
}
export class Pack {
  id?: string;
  name: string;
  description: string;
  author?: User;
  authorId?: string;
  icon?: FileModel;
  iconId?: string;
  images?: FileModel[];
  externalIds?: ExternalId[];
  versions?: PackVersion[];
  comments?: CommentModel[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: PackStatus;
  constructor(args: PackArgs) {
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.author = args.author;
    this.icon = args.icon;
    this.images = args.images;
    this.externalIds = args.externalIds;
    this.versions = args.versions;
    this.comments = args.comments;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.iconId = args.icon?.id ?? args.iconId;
    this.authorId = args.author?.id ?? args.authorId;
    this.status = args.status;
  }
  getId(): string {
    if (!this.id) throw new Error("Pack must have an id");
    return this.id;
  }
  getIconId(): string {
    if (!this.iconId) throw new Error("Pack must have an icon");
    return this.iconId;
  }
  getImagesIds(): string[] {
    if (!this.images) throw new Error("Pack must have images");
    return this.images.map((image) => image.getId());
  }
  toPersistence(): PackPersistence {
    if (!this.name) throw new Error("Pack must have a name");
    if (!this.description) throw new Error("Pack must have a description");
    if (!this.createdAt) throw new Error("Pack must have a createdAt");
    if (!this.updatedAt) throw new Error("Pack must have a updatedAt");
    if (!this.comments) throw new Error("Pack must have comments");
    if (!this.versions) throw new Error("Pack must have versions");
    if (!this.externalIds) throw new Error("Pack must have externalIds");
    if (!this.status) throw new Error("Pack must have a status");
    return {
      iconId: this.iconId,
      name: this.name,
      description: this.description,
      images: this.images?.map((image) => image.toPersistence()) ?? [],
      authorId: this.authorId,
      externalIds: this.externalIds.map((externalId) =>
        externalId.toPersistence(),
      ),
      status: this.status,
    };
  }
  toJson(): PackJson {
    if (!this.id) throw new Error("Pack must have an id");
    if (!this.name) throw new Error("Pack must have a name");
    if (!this.description) throw new Error("Pack must have a description");
    if (!this.createdAt) throw new Error("Pack must have a createdAt");
    if (!this.updatedAt) throw new Error("Pack must have a updatedAt");
    if (!this.icon) throw new Error("Pack must have an icon");
    if (!this.externalIds) throw new Error("Pack must have externalIds");
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      author: this.author?.toJson(),
      icon: this.icon?.toJson(),
      images: this.images?.map((image) => image.toJson()),
      externalIds: this.externalIds?.map((externalId) => externalId.toJson()),
      versions: this.versions?.map((version) => version.toJson()),
      comments: this.comments?.map((comment) => comment.toJson()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
