import { ModFile, ModFileJson } from "./ModFile";

export interface ModConflictArgs {
  id?: string;
  mod: ModFile;
  conflicMod: ModFile;
  comment: string;
}
export interface ModConflictPersistence {
  modId: string;
  conflicModId: string;
  comment: string;
}
export interface ModConflictJson {
  id: string;
  mod: ModFileJson;
  conflicMod: ModFileJson;
  comment: string;
}
export class ModConflict {
  id?: string;
  mod: ModFile;
  conflicMod: ModFile;
  comment: string;
  constructor(args: ModConflictArgs) {
    this.id = args.id;
    this.mod = args.mod;
    this.conflicMod = args.conflicMod;
    this.comment = args.comment;
  }
  toPersistence(): ModConflictPersistence {
    if (this.mod == null) throw new Error("ModConflict must have a mod");
    if (this.conflicMod == null)
      throw new Error("ModConflict must have a conflicMod");
    if (this.comment == null)
      throw new Error("ModConflict must have a comment");
    if (!this.mod.id) throw new Error("ModConflict must have a mod id");
    if (!this.conflicMod.id)
      throw new Error("ModConflict must have a conflicMod id");
    return {
      modId: this.mod.id,
      conflicModId: this.conflicMod.id,
      comment: this.comment,
    };
  }
  toJson(): ModConflictJson {
    if (!this.id) throw new Error("ModConflict must have an id");
    if (!this.mod) throw new Error("ModConflict must have a mod");
    if (!this.conflicMod) throw new Error("ModConflict must have a conflicMod");
    if (!this.comment) throw new Error("ModConflict must have a comment");
    return {
      id: this.id,
      mod: this.mod.toJson(),
      conflicMod: this.conflicMod.toJson(),
      comment: this.comment,
    };
  }
}
