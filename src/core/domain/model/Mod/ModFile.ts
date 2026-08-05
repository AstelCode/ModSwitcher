import { FileModel, FileJson } from "../file/File";
import {
  MinecraftLoader,
  MinecraftLoaderJson,
} from "../loaders/MinecraftLoader";
import {
  MinecraftVersion,
  MinecraftVersionJson,
} from "../loaders/MinecraftVersion";
import { User } from "../User";
import { Mod } from "./Mod";

export interface ModFileArgs {
  id?: string;
  mod?: Mod;
  modId?: string;
  author?: User;
  authorId?: string;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  loader?: MinecraftLoader;
  loaderId?: string;
  file?: FileModel;
  fileId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModFilePersistence {
  fileId: string;
  loaderId: string;
  modId: string;
  minecraftVersionId: string;
  version: string;
  authorId?: string;
}
export interface ModFileJson {
  id: string;
  file?: FileJson;
  version: string;
  minecraftVersion: MinecraftVersionJson;
  loader?: MinecraftLoaderJson;
  createdAt: Date;
  updatedAt: Date;
}
export class ModFile {
  author?: User;
  authorId?: string;
  id?: string;
  file?: FileModel;
  fileId?: string;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  loader?: MinecraftLoader;
  loaderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  mod?: Mod;
  modId?: string;
  constructor(args: ModFileArgs) {
    this.id = args.id;
    this.file = args.file;
    this.fileId = args.file?.id ?? args.fileId;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.loader = args.loader;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.mod = args.mod;
    this.modId = args.mod?.id ?? args.modId;
    this.loaderId = args.loader?.id ?? args.loaderId;
    this.minecraftVersionId =
      args.minecraftVersion?.id ?? args.minecraftVersionId;
    this.author = args.author;
    this.authorId = args.author?.id ?? args.authorId;
  }
  getId(): string {
    if (!this.id) throw new Error("ModFile must have an id");
    return this.id;
  }
  getFileId(): string {
    if (!this.fileId) throw new Error("ModFile must have a file id");
    return this.fileId;
  }
  toPersistence(): ModFilePersistence {
    if (this.version == null) throw new Error("ModFile must have a version");
    if (!this.loaderId) throw new Error("ModFile must have a loader id");
    if (!this.modId) throw new Error("ModFile must have a mod id");
    if (!this.fileId) throw new Error("ModFile must have a file id");
    if (!this.version) throw new Error("ModFile must have a version");
    if (!this.minecraftVersionId)
      throw new Error("ModFile must have a version");
    if (!this.authorId) throw new Error("ModFile must have an author id");
    return {
      fileId: this.fileId,
      modId: this.modId,
      minecraftVersionId: this.minecraftVersionId,
      version: this.version,
      loaderId: this.loaderId,
      authorId: this.authorId,
    };
  }
  toJson(): ModFileJson {
    if (!this.id) throw new Error("ModFile must have an id");
    if (!this.file) throw new Error("ModFile must have a file");
    if (!this.version) throw new Error("ModFile must have a version");
    if (!this.minecraftVersion)
      throw new Error("ModFile must have a minecraftVersion");
    if (!this.loader) throw new Error("ModFile must have a loader");
    if (!this.createdAt) throw new Error("ModFile must have a createdAt");
    if (!this.updatedAt) throw new Error("ModFile must have a updatedAt");
    return {
      id: this.id,
      file: this.file.toJson(),
      version: this.version,
      minecraftVersion: this.minecraftVersion.toJson(),
      loader: this.loader.toJson(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
