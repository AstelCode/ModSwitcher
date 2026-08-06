import { Mod, ModJson } from "./Mod";
import { ModFile, ModFileJson } from "./ModFile";

export type ModDependencyRole = "required" | "optional" | "incompatible";
export interface ModDependencyArgs {
  id?: string;
  mod: ModFile;
  minVersion: string;
  maxVersion: string;
  dependencyMod: Mod;
  dependencyFile?: ModFile;
  role: ModDependencyRole;
}
export interface ModDependencyPersistence {
  modId: string;
  minVersion: string;
  maxVersion: string;
  dependencyModId: string;
  dependencyFileId?: string;
  role: string;
}
export interface ModDependencyJson {
  id: string;
  mod: ModFileJson;
  minVersion: string;
  maxVersion: string;
  dependencyMod: ModJson;
  dependencyFile?: ModFileJson;
  role: string;
}

export class ModDependency {
  id?: string;
  mod: ModFile;
  minVersion: string;
  maxVersion: string;
  dependencyMod: Mod;
  dependencyFile?: ModFile;
  role: string;
  constructor(args: ModDependencyArgs) {
    this.id = args.id;
    this.mod = args.mod;
    this.minVersion = args.minVersion;
    this.maxVersion = args.maxVersion;
    this.dependencyMod = args.dependencyMod;
    this.dependencyFile = args.dependencyFile;
    this.role = args.role;
  }
  toPersistence(): ModDependencyPersistence {
    if (this.mod == null) throw new Error("ModDependency must have a mod");
    if (this.minVersion == null)
      throw new Error("ModDependency must have a minVersion");
    if (this.maxVersion == null)
      throw new Error("ModDependency must have a maxVersion");
    if (this.dependencyMod == null)
      throw new Error("ModDependency must have a dependencyMod");
    if (this.dependencyFile == null)
      throw new Error("ModDependency must have a dependencyFile");
    if (this.role == null) throw new Error("ModDependency must have a role");
    if (!this.mod.id) throw new Error("ModDependency must have a mod id");
    if (!this.dependencyMod.id)
      throw new Error("ModDependency must have a dependencyMod id");
    return {
      modId: this.mod.id,
      minVersion: this.minVersion,
      maxVersion: this.maxVersion,
      dependencyModId: this.dependencyMod.id,
      dependencyFileId: this.dependencyFile?.id,
      role: this.role,
    };
  }
  toJson(): ModDependencyJson {
    if (!this.id) throw new Error("ModDependency must have an id");
    if (!this.mod) throw new Error("ModDependency must have a mod");
    if (!this.minVersion)
      throw new Error("ModDependency must have a minVersion");
    if (!this.maxVersion)
      throw new Error("ModDependency must have a maxVersion");
    if (!this.dependencyMod)
      throw new Error("ModDependency must have a dependencyMod");
    if (!this.dependencyFile)
      throw new Error("ModDependency must have a dependencyFile");
    if (!this.role) throw new Error("ModDependency must have a role");
    return {
      id: this.id,
      mod: this.mod.toJson(),
      minVersion: this.minVersion,
      maxVersion: this.maxVersion,
      dependencyMod: this.dependencyMod.toJson(),
      dependencyFile: this.dependencyFile?.toJson(),
      role: this.role,
    };
  }
}
