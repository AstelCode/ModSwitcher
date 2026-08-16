export interface LocalFileArgs {
  id?: string;
  name: string;
  size: number;
  mimeType: string;
  path: string;
  url: string;
  bucket: string;
  sha256?: string | null;
  extension: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LocalFilePersistence {
  name: string;
  size: number;
  mimeType: string;
  path: string;
  url: string;
  bucket: string;
  extension: string;
  sha256?: string | null;
}
export interface LocalFileJson {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  path: string;
  url: string;
  bucket: string;
  extension: string;
  createdAt: Date;
  updatedAt: Date;
  sha256?: string | null;
}
export class LocalFile {
  id?: string;
  name: string;
  size: number;
  mimeType: string;
  path: string;
  url: string;
  bucket: string;
  extension: string;
  createdAt?: Date;
  updatedAt?: Date;
  sha256?: string | null;
  constructor(args: LocalFileArgs) {
    this.id = args.id;
    this.name = args.name;
    this.size = args.size;
    this.mimeType = args.mimeType;
    this.path = args.path;
    this.url = args.url;
    this.bucket = args.bucket;
    this.extension = args.extension;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.sha256 = args.sha256;
  }

  toPersistence(): LocalFilePersistence {
    return {
      name: this.name,
      size: this.size,
      mimeType: this.mimeType,
      path: this.path,
      url: this.url,
      bucket: this.bucket,
      extension: this.extension,
      sha256: this.sha256,
    };
  }
  toJson(): LocalFileJson {
    if (!this.id) throw new Error("LocalFile must have an id");
    if (!this.name) throw new Error("LocalFile must have a name");
    if (!this.size) throw new Error("LocalFile must have a size");
    if (!this.mimeType) throw new Error("LocalFile must have a mimeType");
    if (!this.path) throw new Error("LocalFile must have a path");
    if (!this.url) throw new Error("LocalFile must have a url");
    if (!this.bucket) throw new Error("LocalFile must have a bucket");
    if (!this.extension) throw new Error("LocalFile must have a extension");
    if (!this.sha256) throw new Error("LocalFile must have a sha256");
    if (!this.createdAt) throw new Error("LocalFile must have a createdAt");
    if (!this.updatedAt) throw new Error("LocalFile must have a updatedAt");
    return {
      id: this.id,
      name: this.name,
      size: this.size,
      mimeType: this.mimeType,
      path: this.path,
      url: this.url,
      bucket: this.bucket,
      extension: this.extension,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sha256: this.sha256,
    };
  }
}
