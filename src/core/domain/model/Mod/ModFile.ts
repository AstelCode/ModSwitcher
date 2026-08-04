import { FileModel, FileJson } from "../file/File";
import {
  MinecraftLoader,
  MinecraftLoaderJson,
} from "../loaders/MinecraftLoader";
import {
  MinecraftVersion,
  MinecraftVersionJson,
} from "../loaders/MinecraftVersion";
import { Mod } from "./Mod";

export interface ModFileArgs {
  id?: string;
  mod?: Mod;
  version: string;
  minecraftVersion: MinecraftVersion;
  loader: MinecraftLoader;
  file: FileModel;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModFilePersistence {
  fileId: string;
  loaderId: string;
  modId: string;
  minecraftVersionId: string;
  version: string;
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
  id?: string;
  file: FileModel;
  version: string;
  minecraftVersion: MinecraftVersion;
  loader: MinecraftLoader;
  createdAt?: Date;
  updatedAt?: Date;
  mod?: Mod;
  constructor(args: ModFileArgs) {
    this.id = args.id;
    this.file = args.file;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.loader = args.loader;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.mod = args.mod;
  }
  toPersistence(): ModFilePersistence {
    if (this.file == null) throw new Error("ModFile must have a file");
    if (this.version == null) throw new Error("ModFile must have a version");
    if (this.minecraftVersion == null)
      throw new Error("ModFile must have a minecraftVersion");
    if (this.loader == null) throw new Error("ModFile must have a loader");
    if (!this.file.id) throw new Error("ModFile must have a file id");
    if (!this.minecraftVersion.id)
      throw new Error("ModFile must have a minecraftVersion id");
    if (!this.loader.id) throw new Error("ModFile must have a loader id");
    if (!this.mod?.id) throw new Error("ModFile must have a mod id");
    return {
      fileId: this.file.id,
      modId: this.mod?.id,
      minecraftVersionId: this.minecraftVersion.id,
      version: this.version,
      loaderId: this.loader.id,
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
