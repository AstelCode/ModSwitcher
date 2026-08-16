import { Mod } from "../Mod/Mod";
import { Pack } from "../pack/Pack";
import { Shader } from "../shader/Shader";
import { LocalFile, LocalFileJson } from "./LocalFile";

export interface FileArgs {
  id?: string;
  name: string;
  role: string;
  shader?: Shader | null;
  shaderId?: string | null;
  mod?: Mod | null;
  modId?: string | null;
  pack?: Pack | null;
  packId?: string | null;
  externalUrl?: string | null;
  localFile?: LocalFile | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface FilePersistence {
  externalUrl?: string | null;
  name: string;
  // localFile?: LocalFilePersistence;
  role: string;
  shaderId?: string;
  modId?: string;
  packId?: string;
}
export interface FileJson {
  id: string;
  externalUrl?: string | null;
  localFile?: LocalFileJson;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export class FileModel {
  id?: string;
  name: string;
  externalUrl?: string | null;
  localFile?: LocalFile | null;
  role: string;
  mod?: Mod | null;
  modId?: string | null;
  pack?: Pack | null;
  packId?: string | null;
  shader?: Shader | null;
  shaderId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: FileArgs) {
    this.id = args.id;
    this.externalUrl = args.externalUrl;
    this.localFile = args.localFile;
    this.role = args.role;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.name = args.name;
    this.mod = args.mod;
    this.modId = args.mod?.id ?? args.modId;
    this.pack = args.pack;
    this.packId = args.pack?.id ?? args.packId;
    this.shader = args.shader;
    this.shaderId = args.shader?.id ?? args.shaderId;
  }
  getId(): string {
    if (!this.id) throw new Error("File must have an id");
    return this.id;
  }
  toPersistence(): FilePersistence {
    return {
      externalUrl: this.externalUrl,
      name: this.name,
      role: this.role,
    };
  }
  toJson(): FileJson {
    if (!this.id) throw new Error("File must have an id");
    if (!this.role) throw new Error("File must have a role");
    if (!this.createdAt) throw new Error("File must have a createdAt");
    if (!this.updatedAt) throw new Error("File must have a updatedAt");
    return {
      id: this.id,
      externalUrl: this.externalUrl,
      localFile: this.localFile?.toJson(),
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
