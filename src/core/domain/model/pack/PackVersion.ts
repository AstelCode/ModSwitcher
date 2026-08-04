import {
  MinecraftLoader,
  MinecraftLoaderJson,
} from "../loaders/MinecraftLoader";
import {
  MinecraftVersion,
  MinecraftVersionJson,
} from "../loaders/MinecraftVersion";
import { Pack, PackJson } from "./Pack";
import { PackMod, PackModJson, PackModPersistence } from "./PackMod";
import {
  PackShader,
  PackShaderJson,
  PackShaderPersistence,
} from "./PackShader";

export interface PackVersionArgs {
  id?: string;
  pack: Pack;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader: MinecraftLoader;
  mods: PackMod[];
  shaders: PackShader[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PackVersionPersistence {
  packId: string;
  version: string;
  minecraftVersionId: string;
  minecraftLoaderId: string;
  mods: PackModPersistence[];
  shaders: PackShaderPersistence[];
  createdAt: Date;
  updatedAt: Date;
}
export interface PackVersionJson {
  id: string;
  pack: PackJson;
  version: string;
  minecraftVersion: MinecraftVersionJson;
  minecraftLoader: MinecraftLoaderJson;
  mods: PackModJson[];
  shaders: PackShaderJson[];
  createdAt: Date;
  updatedAt: Date;
}
export class PackVersion {
  id?: string;
  pack: Pack;
  version: string;
  minecraftVersion: MinecraftVersion;
  minecraftLoader: MinecraftLoader;
  mods: PackMod[];
  shaders: PackShader[];
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
  }
  toPersistence(): PackVersionPersistence {
    if (this.pack == null) throw new Error("PackVersion must have a pack");
    if (this.version == null)
      throw new Error("PackVersion must have a version");
    if (this.minecraftVersion == null)
      throw new Error("PackVersion must have a minecraftVersion");
    if (this.minecraftLoader == null)
      throw new Error("PackVersion must have a minecraftLoader");
    if (this.mods == null) throw new Error("PackVersion must have mods");
    if (this.shaders == null) throw new Error("PackVersion must have shaders");
    if (this.createdAt == null)
      throw new Error("PackVersion must have a createdAt");
    if (this.updatedAt == null)
      throw new Error("PackVersion must have a updatedAt");
    if (!this.pack.id) throw new Error("PackVersion must have a pack id");
    if (!this.minecraftVersion.id)
      throw new Error("PackVersion must have a minecraftVersion id");
    if (!this.minecraftLoader.id)
      throw new Error("PackVersion must have a minecraftLoader id");
    return {
      packId: this.pack.id,
      version: this.version,
      minecraftVersionId: this.minecraftVersion.id,
      minecraftLoaderId: this.minecraftLoader.id,
      mods: this.mods.map((mod) => mod.toPersistence()),
      shaders: this.shaders.map((shader) => shader.toPersistence()),
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
    if (!this.mods) throw new Error("PackVersion must have mods");
    if (!this.shaders) throw new Error("PackVersion must have shaders");
    if (!this.createdAt) throw new Error("PackVersion must have a createdAt");
    if (!this.updatedAt) throw new Error("PackVersion must have a updatedAt");
    return {
      id: this.id,
      pack: this.pack.toJson(),
      version: this.version,
      minecraftVersion: this.minecraftVersion.toJson(),
      minecraftLoader: this.minecraftLoader.toJson(),
      mods: this.mods.map((mod) => mod.toJson()),
      shaders: this.shaders.map((shader) => shader.toJson()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
