import { Mod } from "../Mod/Mod";
import { Pack } from "../pack/Pack";
import { Shader } from "../shader/Shader";
import { LocalFile, LocalFileJson, LocalFilePersistence } from "./LocalFile";

export interface FileArgs {
  id?: string;
  name: string;
  role: string;
  shader?: Shader;
  shaderId?: string;
  mod?: Mod;
  modId?: string;
  pack?: Pack;
  packId?: string;
  externalUrl?: string;
  localFile?: LocalFile;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface FilePersistence {
  externalUrl?: string;
  name: string;
  localFile?: LocalFilePersistence;
  role: string;
  shaderId?: string;
  modId?: string;
  packId?: string;
}
export interface FileJson {
  id: string;
  externalUrl?: string;
  localFile?: LocalFileJson;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export class FileModel {
  id?: string;
  name: string;
  externalUrl?: string;
  localFile?: LocalFile;
  role: string;
  mod?: Mod;
  modId?: string;
  pack?: Pack;
  packId?: string;
  shader?: Shader;
  shaderId?: string;
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
      localFile: this.localFile?.toPersistence(),
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
