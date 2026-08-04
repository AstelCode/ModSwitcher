import { FileModel, FileJson } from "../file/File";
import { MinecraftLoader, MinecraftLoaderJson } from "./MinecraftLoader";
import { MinecraftVersion, MinecraftVersionJson } from "./MinecraftVersion";
import { ShaderLoader, ShaderLoaderJson } from "./ShaderLoader";

export interface ShaderLoaderFileArgs {
  id?: string;
  file: FileModel;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader?: MinecraftLoader;
  shaderLoader?: ShaderLoader;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShaderLoaderFilePersistence {
  fileId: string;
  minecraftLoaderId: string;
  minecraftVersionId: string;
  shaderLoaderId: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShaderLoaderFileJson {
  id: string;
  file?: FileJson;
  version: string;
  minecraftVersion: MinecraftVersionJson;
  minecraftLoader?: MinecraftLoaderJson;
  shaderLoader?: ShaderLoaderJson;
  createdAt: Date;
  updatedAt: Date;
}
export class ShaderLoaderFile {
  id?: string;
  file: FileModel;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader?: MinecraftLoader;
  createdAt?: Date;
  updatedAt?: Date;
  shaderLoader?: ShaderLoader;
  constructor(args: ShaderLoaderFileArgs) {
    this.id = args.id;
    this.file = args.file;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.minecraftLoader = args.minecraftLoader;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.shaderLoader = args.shaderLoader;
  }
  toPersistence(): ShaderLoaderFilePersistence {
    if (this.file == null) throw new Error("ShaderLoaderFile must have a file");
    if (this.version == null)
      throw new Error("ShaderLoaderFile must have a version");
    if (this.minecraftVersion == null)
      throw new Error("ShaderLoaderFile must have a minecraftVersion");
    if (this.minecraftLoader == null)
      throw new Error("ShaderLoaderFile must have a minecraftLoader");
    if (this.createdAt == null)
      throw new Error("ShaderLoaderFile must have a createdAt");
    if (this.updatedAt == null)
      throw new Error("ShaderLoaderFile must have a updatedAt");
    if (!this.file.id) throw new Error("ShaderLoaderFile must have a file id");
    if (!this.minecraftVersion.id)
      throw new Error("ShaderLoaderFile must have a minecraftVersion id");
    if (!this.minecraftLoader.id)
      throw new Error("ShaderLoaderFile must have a minecraftLoader id");
    if (!this.shaderLoader?.id)
      throw new Error("ShaderLoaderFile must have a shaderLoader id");
    return {
      fileId: this.file.id,
      minecraftVersionId: this.minecraftVersion.id,
      version: this.version,
      minecraftLoaderId: this.minecraftLoader.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      shaderLoaderId: this.shaderLoader?.id,
    };
  }
  toJson(): ShaderLoaderFileJson {
    if (!this.id) throw new Error("ShaderLoaderFile must have an id");
    if (!this.version) throw new Error("ShaderLoaderFile must have a version");
    if (!this.minecraftVersion)
      throw new Error("ShaderLoaderFile must have a minecraftVersion");
    if (!this.minecraftLoader)
      throw new Error("ShaderLoaderFile must have a minecraftLoader");
    if (!this.minecraftLoader)
      throw new Error("ShaderLoaderFile must have a loader");
    if (!this.createdAt)
      throw new Error("ShaderLoaderFile must have a createdAt");
    if (!this.updatedAt)
      throw new Error("ShaderLoaderFile must have a updatedAt");
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
