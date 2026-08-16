import { FileModel } from "../../model/file/File";

export interface FileFilter {
  externalUrl?: string;
  localFileId?: string;
  role?: string;
}
export interface FilePagination {
  limit?: number;
  offset?: number;
}
export interface FileUpdateData {
  externalUrl?: string;
  localFileId?: string;
  role?: string;
  shaderId?: string;
  modId?: string;
  packId?: string;
}

export interface FileInclude {
  localFile?: boolean;
}
export interface FileRepository {
  getAll(data?: {
    filter?: FileFilter;
    pagination?: FilePagination;
    include?: FileInclude;
  }): Promise<FileModel[]>;
  getById(id: string, indlude?: FileInclude): Promise<FileModel | undefined>;
  create(file: FileModel): Promise<FileModel>;
  update(id: string, file: FileUpdateData): Promise<FileModel>;
  delete(id: string): Promise<void>;
}
