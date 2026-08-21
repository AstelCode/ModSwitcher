import { Mod } from "../mod/Mod";
import { Pack } from "../pack/Pack";
import { Shader } from "../shader/Shader";
import { LocalFile, LocalFileJson } from "./LocalFile";

export interface FileArgs {
  id?: string;
  name: string;
  role: string;

  shaderFile?: Shader | null;
  shaderFileId?: string | null;

  shaderImage?: Shader | null;
  shaderImageId?: string | null;

  modFile?: Mod | null;
  modFileId?: string | null;

  modImage?: Mod | null;
  modImageId?: string | null;

  packImage?: Pack | null;
  packImageId?: string | null;

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
  _localFileId?: string | null;
  _shaderFileId?: string | null;
  _shaderImageId?: string | null;
  _modFileId?: string | null;
  _modImageId?: string | null;
  _packImageId?: string | null;
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
  localFileId?: string | null;

  role: string;

  modFile?: Mod | null;
  modFileId?: string | null;
  modImage?: Mod | null;
  modImageId?: string | null;

  packImage?: Pack | null;
  packImageId?: string | null;

  shaderFile?: Shader | null;
  shaderFileId?: string | null;

  shaderImage?: Shader | null;
  shaderImageId?: string | null;

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

    this.modFile = args.modFile;
    this.modFileId = args.modFile?.id ?? args.modFileId;

    this.modImage = args.modImage;
    this.modImageId = args.modImage?.id ?? args.modImageId;

    this.packImage = args.packImage;
    this.packImageId = args.packImage?.id ?? args.packImageId;

    this.shaderFile = args.shaderFile;
    this.shaderFileId = args.shaderFile?.id ?? args.shaderFileId;

    this.shaderImage = args.shaderImage;
    this.shaderImageId = args.shaderImage?.id ?? args.shaderImageId;

    this.localFileId = args.localFile?.id ?? args.localFile?.id;
    this.localFile = args.localFile;
  }
  getId(): string {
    if (!this.id) throw new Error("File must have an id");
    return this.id;
  }
  toPersistence(): FilePersistence {
    if (!this.name) throw new Error("File must have a name");
    if (!this.role) throw new Error("File must have a role");

    return {
      externalUrl: this.externalUrl ? this.externalUrl : null,
      name: this.name,
      role: this.role,
      _modImageId: this.modImageId,
      _modFileId: this.modFileId,
      _packImageId: this.packImageId,
      _shaderImageId: this.shaderImageId,
      _shaderFileId: this.shaderFileId,
      _localFileId: this.localFileId,
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
