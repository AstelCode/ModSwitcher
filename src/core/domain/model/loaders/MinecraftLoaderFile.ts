import { FileJson, FileModel } from "../file/File";
import { MinecraftLoader, MinecraftLoaderJson } from "./MinecraftLoader";
import { MinecraftVersion, MinecraftVersionJson } from "./MinecraftVersion";

export interface MinecraftLoaderFileArgs {
  id?: string;
  file: FileModel;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader?: MinecraftLoader;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MinecraftLoaderFilePersistence {
  fileId: string;
  loaderId: string;
  minecraftVersionId: string;
  version: string;
}

export interface MinecraftLoaderFileJson {
  id: string;
  file?: FileJson;
  version: string;
  minecraftVersion: MinecraftVersionJson;
  minecraftLoader?: MinecraftLoaderJson;
  createdAt: Date;
  updatedAt: Date;
}
export class MinecraftLoaderFile {
  id?: string;
  file: FileModel;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader?: MinecraftLoader;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: MinecraftLoaderFileArgs) {
    this.id = args.id;
    this.file = args.file;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.minecraftLoader = args.minecraftLoader;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
  toPersistence(): MinecraftLoaderFilePersistence {
    if (this.file == null)
      throw new Error("MinecraftLoaderFile must have a file");
    if (this.version == null)
      throw new Error("MinecraftLoaderFile must have a version");
    if (this.minecraftVersion == null)
      throw new Error("MinecraftLoaderFile must have a minecraftVersion");
    if (this.minecraftLoader == null)
      throw new Error("MinecraftLoaderFile must have a minecraftLoader");
    if (!this.file.id)
      throw new Error("MinecraftLoaderFile must have a file id");
    if (!this.minecraftVersion.id)
      throw new Error("MinecraftLoaderFile must have a minecraftVersion id");
    if (!this.minecraftLoader.id)
      throw new Error("MinecraftLoaderFile must have a minecraftLoader id");
    return {
      fileId: this.file.id,
      minecraftVersionId: this.minecraftVersion.id,
      version: this.version,
      loaderId: this.minecraftLoader.id,
    };
  }
  toJson(): MinecraftLoaderFileJson {
    if (!this.id) throw new Error("MinecraftLoaderFile must have an id");
    if (!this.version)
      throw new Error("MinecraftLoaderFile must have a version");
    if (!this.minecraftVersion)
      throw new Error("MinecraftLoaderFile must have a minecraftVersion");
    if (!this.minecraftLoader)
      throw new Error("MinecraftLoaderFile must have a minecraftLoader");
    if (!this.minecraftLoader)
      throw new Error("MinecraftLoaderFile must have a loader");
    if (!this.createdAt)
      throw new Error("MinecraftLoaderFile must have a createdAt");
    if (!this.updatedAt)
      throw new Error("MinecraftLoaderFile must have a updatedAt");
    return {
      id: this.id,
      file: this.file.toJson(),
      version: this.version,
      minecraftVersion: this.minecraftVersion.toJson(),
      minecraftLoader: this.minecraftLoader.toJson(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
