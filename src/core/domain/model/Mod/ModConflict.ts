import { ModFile, ModFileJson } from "./ModFile";

export interface ModConflictArgs {
  id?: string;
  mod?: ModFile;
  modId?: string;
  conflictMod?: ModFile;
  conflictModId?: string;
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
  conflictMod: ModFileJson;
  comment: string;
}
export class ModConflict {
  id?: string;
  mod?: ModFile;
  modId?: string;
  conflictMod?: ModFile;
  conflictModId?: string;
  comment: string;
  constructor(args: ModConflictArgs) {
    this.id = args.id;
    this.mod = args.mod;
    this.conflictMod = args.conflictMod;
    this.comment = args.comment;
    this.modId = args.mod?.id ?? args.modId;
    this.conflictModId = args.conflictMod?.id ?? args.conflictModId;
  }
  toPersistence(): ModConflictPersistence {
    if (!this.modId) throw new Error("ModConflict must have a modId");
    if (!this.conflictModId)
      throw new Error("ModConflict must have a conflicModId");
    if (!this.comment) throw new Error("ModConflict must have a comment");
    return {
      modId: this.conflictModId,
      conflicModId: this.conflictModId,
      comment: this.comment,
    };
  }
  toJson(): ModConflictJson {
    if (!this.id) throw new Error("ModConflict must have an id");
    if (!this.mod) throw new Error("ModConflict must have a mod");
    if (!this.conflictMod)
      throw new Error("ModConflict must have a conflicMod");
    if (!this.comment) throw new Error("ModConflict must have a comment");
    return {
      id: this.id,
      mod: this.mod.toJson(),
      conflictMod: this.conflictMod.toJson(),
      comment: this.comment,
    };
  }
}
