import { FileModel, FileJson } from "../file/File";
import {
  MinecraftVersion,
  MinecraftVersionJson,
} from "../loaders/MinecraftVersion";
import { Shader, ShaderJson } from "./Shader";
import { ShaderLoader, ShaderLoaderJson } from "../loaders/ShaderLoader";

export interface ShaderFileArgs {
  id?: string;
  shader?: Shader;
  shaderId?: string;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  loader?: ShaderLoader;
  loaderId?: string;
  file?: FileModel;
  fileId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShaderFilePersistence {
  shaderId: string;
  version: string;
  minecraftVersionId: string;
  loaderId: string;
  fileId: string;
}
export interface ShaderFileJson {
  id: string;
  shader?: ShaderJson;
  version: string;
  minecraftVersion?: MinecraftVersionJson;
  loader?: ShaderLoaderJson;
  file?: FileJson;
  createdAt: Date;
  updatedAt: Date;
}
export class ShaderFile {
  id?: string;
  shader?: Shader;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  loader?: ShaderLoader;
  loaderId?: string;
  file?: FileModel;
  fileId?: string;
  shaderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: ShaderFileArgs) {
    this.id = args.id;
    this.shader = args.shader;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.loader = args.loader;
    this.file = args.file;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.shaderId = args.shader?.id ?? args.shaderId;
    this.minecraftVersionId =
      args.minecraftVersion?.id ?? args.minecraftVersionId;
    this.loaderId = args.loader?.id ?? args.loaderId;
    this.fileId = args.file?.id ?? args.fileId;
  }
  getId(): string {
    if (!this.id) throw new Error("ShaderFile must have an id");
    return this.id;
  }
  getFileId(): string {
    if (!this.fileId) throw new Error("ShaderFile must have a file id");
    return this.fileId;
  }
  toPersistence(): ShaderFilePersistence {
    if (this.version == null) throw new Error("ShaderFile must have a version");
    if (!this.shaderId) throw new Error("ShaderFile must have a shader id");
    if (!this.loaderId) throw new Error("ShaderFile must have a loader id");
    if (!this.fileId) throw new Error("ShaderFile must have a file id");
    if (!this.minecraftVersionId)
      throw new Error("ShaderFile must have a minecraftVersion id");
    return {
      fileId: this.fileId,
      shaderId: this.shaderId,
      minecraftVersionId: this.minecraftVersionId,
      version: this.version,
      loaderId: this.loaderId,
    };
  }

  toJson(): ShaderFileJson {
    if (this.id == null) throw new Error("ShaderFile must have an id");
    if (!this.shader) throw new Error("ShaderFile must have a shader");
    if (!this.version) throw new Error("ShaderFile must have a version");
    if (!this.minecraftVersion)
      throw new Error("ShaderFile must have a minecraftVersion");
    if (!this.loader) throw new Error("ShaderFile must have a loader");
    if (!this.file) throw new Error("ShaderFile must have a file");
    if (!this.createdAt) throw new Error("ShaderFile must have a createdAt");
    if (!this.updatedAt) throw new Error("ShaderFile must have a updatedAt");
    return {
      id: this.id,
      shader: this.shader?.toJson(),
      version: this.version,
      minecraftVersion: this.minecraftVersion.toJson(),
      loader: this.loader.toJson(),
      file: this.file.toJson(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
