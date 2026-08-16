import { FileModel, FileJson } from "../file/File";
import {
  MinecraftLoaderFile,
  MinecraftLoaderFileJson,
} from "./MinecraftLoaderFile";

export interface MinecraftLoaderArgs {
  id?: string;
  name: string;
  icon?: FileModel | null;
  iconId?: string | null;
  files?: MinecraftLoaderFile[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MinecraftLoaderPersistence {
  name: string;
  iconId?: string | null;
}
export interface MinecraftLoaderJson {
  id: string;
  name: string;
  icon?: FileJson;
  files?: MinecraftLoaderFileJson[];
  createdAt: Date;
  updatedAt: Date;
}
export class MinecraftLoader {
  id?: string;
  name: string;
  icon?: FileModel | null;
  iconId?: string | null;
  files?: MinecraftLoaderFile[];
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: MinecraftLoaderArgs) {
    this.id = args.id;
    this.name = args.name;
    this.icon = args.icon;
    this.files = args.files;
    this.iconId = args.icon?.id ?? args.iconId;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
  getId(): string {
    if (!this.id) throw new Error("MinecraftLoader must have an id");
    return this.id;
  }
  getIconId(): string {
    if (!this.iconId) throw new Error("MinecraftLoader must have an icon");
    return this.iconId;
  }

  toPersistence(): MinecraftLoaderPersistence {
    if (!this.name) throw new Error("MinecraftLoader must have a name");
    if (!this.icon) throw new Error("MinecraftLoader must have an icon");
    if (this.icon.id == null)
      throw new Error("MinecraftLoader icon must have an id");
    return {
      name: this.name,
      iconId: this.icon?.id,
    };
  }
  toJson(): MinecraftLoaderJson {
    if (!this.id) throw new Error("MinecraftLoader must have an id");
    if (!this.name) throw new Error("MinecraftLoader must have a name");
    if (!this.createdAt)
      throw new Error("MinecraftLoader must have a createdAt");
    if (!this.updatedAt)
      throw new Error("MinecraftLoader must have a updatedAt");
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
