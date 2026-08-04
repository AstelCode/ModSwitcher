import { LocalFile, LocalFileJson, LocalFilePersistence } from "./LocalFile";

export interface FileArgs {
  id?: string;
  externalUrl?: string;
  localFile?: LocalFile;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FilePersistence {
  externalUrl?: string;
  localFile?: LocalFilePersistence;
  role: string;
  createdAt: Date;
  updatedAt: Date;
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
  externalUrl?: string;
  localFile?: LocalFile;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(args: FileArgs) {
    this.id = args.id;
    this.externalUrl = args.externalUrl;
    this.localFile = args.localFile;
    this.role = args.role;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
  toPersistence(): FilePersistence {
    return {
      externalUrl: this.externalUrl,
      localFile: this.localFile?.toPersistence(),
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
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
