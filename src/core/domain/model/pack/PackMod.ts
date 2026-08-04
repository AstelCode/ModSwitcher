import { ModFile, ModFileJson } from "../Mod/ModFile";
import { PackVersion, PackVersionJson } from "./PackVersion";

export interface PackModArgs {
  id?: string;
  packVersion?: PackVersion;
  modFile: ModFile;
  optional: boolean;
  loadOrder?: number;
}
export interface PackModPersistence {
  packVersionId: string;
  modFileId: string;
  optional: boolean;
  loadOrder?: number;
}
export interface PackModJson {
  id: string;
  packVersion: PackVersionJson;
  modFile: ModFileJson;
  optional: boolean;
  loadOrder?: number;
}
export class PackMod {
  id?: string;
  packVersion?: PackVersion;
  modFile: ModFile;
  optional: boolean;
  loadOrder?: number;
  constructor(args: PackModArgs) {
    this.id = args.id;
    this.packVersion = args.packVersion;
    this.modFile = args.modFile;
    this.optional = args.optional;
    this.loadOrder = args.loadOrder;
  }
  toPersistence(): PackModPersistence {
    if (this.packVersion == null)
      throw new Error("PackMod must have a packVersion");
    if (this.modFile == null) throw new Error("PackMod must have a modFile");
    if (this.optional == null) throw new Error("PackMod must have an optional");
    if (this.loadOrder == null)
      throw new Error("PackMod must have a loadOrder");
    if (!this.packVersion.id)
      throw new Error("PackMod must have a packVersion id");
    if (!this.modFile.id) throw new Error("PackMod must have a modFile id");
    return {
      packVersionId: this.packVersion.id,
      modFileId: this.modFile.id,
      optional: this.optional,
      loadOrder: this.loadOrder,
    };
  }
  toJson(): PackModJson {
    if (!this.id) throw new Error("PackMod must have an id");
    if (!this.packVersion) throw new Error("PackMod must have a packVersion");
    if (!this.modFile) throw new Error("PackMod must have a modFile");
    if (!this.optional) throw new Error("PackMod must have an optional");
    if (!this.loadOrder) throw new Error("PackMod must have a loadOrder");
    return {
      id: this.id,
      packVersion: this.packVersion.toJson(),
      modFile: this.modFile.toJson(),
      optional: this.optional,
      loadOrder: this.loadOrder,
    };
  }
}
