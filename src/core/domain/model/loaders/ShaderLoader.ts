import { FileModel, FileJson } from "../file/File";
import { ShaderLoaderFile, ShaderLoaderFileJson } from "./ShaderLoaderFile";
export interface ShaderLoaderArgs {
  id?: string;
  name: string;
  icon?: FileModel;
  files?: ShaderLoaderFile[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ShaderLoaderPersistence {
  name: string;
  iconId?: string;
}
export interface ShaderLoaderJson {
  id: string;
  name: string;
  icon?: FileJson;
  files?: ShaderLoaderFileJson[];
  createdAt: Date;
  updatedAt: Date;
}
export class ShaderLoader {
  id?: string;
  name: string;
  icon?: FileModel;
  files?: ShaderLoaderFile[];
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: ShaderLoaderArgs) {
    this.id = args.id;
    this.name = args.name;
    this.icon = args.icon;
    this.files = args.files;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
  toPersistence(): ShaderLoaderPersistence {
    if (!this.name) throw new Error("ShaderLoader must have a name");
    if (!this.icon) throw new Error("ShaderLoader must have an icon");
    if (this.icon.id == null)
      throw new Error("ShaderLoader icon must have an id");
    return {
      name: this.name,
      iconId: this.icon?.id,
    };
  }
  toJson(): ShaderLoaderJson {
    if (!this.id) throw new Error("ShaderLoader must have an id");
    if (!this.name) throw new Error("ShaderLoader must have a name");
    if (!this.createdAt) throw new Error("ShaderLoader must have a createdAt");
    if (!this.updatedAt) throw new Error("ShaderLoader must have a updatedAt");
    return {
      id: this.id,
      name: this.name,
      icon: this.icon?.toJson(),
      files: this.files?.map((file) => file.toJson()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
