import {
  MinecraftLoader,
  MinecraftLoaderJson,
} from "../loaders/MinecraftLoader";
import {
  MinecraftVersion,
  MinecraftVersionJson,
} from "../loaders/MinecraftVersion";
import { Pack, PackJson } from "./Pack";
import { PackMod, PackModJson } from "./PackMod";
import { PackShader, PackShaderJson } from "./PackShader";

export interface PackVersionArgs {
  id?: string;
  pack?: Pack;
  packId?: string;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  minecraftLoader?: MinecraftLoader;
  minecraftLoaderId?: string;
  mods?: PackMod[];
  shaders?: PackShader[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PackVersionPersistence {
  packId: string;
  version: string;
  minecraftVersionId: string;
  minecraftLoaderId: string;
  //mods: PackModPersistence[];
  //shaders: PackShaderPersistence[];
  createdAt: Date;
  updatedAt: Date;
}
export interface PackVersionJson {
  id: string;
  pack: PackJson;
  version: string;
  minecraftVersion: MinecraftVersionJson;
  minecraftLoader: MinecraftLoaderJson;
  mods?: PackModJson[];
  shaders?: PackShaderJson[];
  createdAt: Date;
  updatedAt: Date;
}
export class PackVersion {
  id?: string;
  pack?: Pack;
  packId?: string;
  version: string;
  minecraftVersion?: MinecraftVersion;
  minecraftVersionId?: string;
  minecraftLoader?: MinecraftLoader;
  minecraftLoaderId?: string;
  mods?: PackMod[];
  shaders?: PackShader[];
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: PackVersionArgs) {
    this.id = args.id;
    this.pack = args.pack;
    this.version = args.version;
    this.minecraftVersion = args.minecraftVersion;
    this.minecraftLoader = args.minecraftLoader;
    this.mods = args.mods;
    this.shaders = args.shaders;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.packId = args.pack?.id ?? args.packId;
    this.minecraftVersionId =
      args.minecraftVersion?.id ?? args.minecraftVersionId;
    this.minecraftLoaderId = args.minecraftLoader?.id ?? args.minecraftLoaderId;
  }
  toPersistence(): PackVersionPersistence {
    if (this.version == null)
      throw new Error("PackVersion must have a version");
    if (this.mods == null) throw new Error("PackVersion must have mods");
    if (this.shaders == null) throw new Error("PackVersion must have shaders");
    if (this.createdAt == null)
      throw new Error("PackVersion must have a createdAt");
    if (this.updatedAt == null)
      throw new Error("PackVersion must have a updatedAt");
    if (!this.packId) throw new Error("PackVersion must have a pack id");
    if (!this.minecraftVersionId)
      throw new Error("PackVersion must have a minecraftVersion id");
    if (!this.minecraftLoaderId)
      throw new Error("PackVersion must have a minecraftLoader id");
    return {
      packId: this.packId,
      version: this.version,
      minecraftVersionId: this.minecraftVersionId,
      minecraftLoaderId: this.minecraftLoaderId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  toJson(): PackVersionJson {
    if (!this.id) throw new Error("PackVersion must have an id");
    if (!this.pack) throw new Error("PackVersion must have a pack");
    if (!this.version) throw new Error("PackVersion must have a version");
    if (!this.minecraftVersion)
      throw new Error("PackVersion must have a minecraftVersion");
    if (!this.minecraftLoader)
      throw new Error("PackVersion must have a minecraftLoader");
    if (!this.createdAt) throw new Error("PackVersion must have a createdAt");
    if (!this.updatedAt) throw new Error("PackVersion must have a updatedAt");
    return {
      id: this.id,
      pack: this.pack.toJson(),
      version: this.version,
      minecraftVersion: this.minecraftVersion.toJson(),
      minecraftLoader: this.minecraftLoader.toJson(),
      mods: this.mods?.map((mod) => mod.toJson()),
      shaders: this.shaders?.map((shader) => shader.toJson()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
