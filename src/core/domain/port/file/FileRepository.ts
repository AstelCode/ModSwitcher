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
  }): Promise<File[]>;
  getById(id: string, indlude?: FileInclude): Promise<File | undefined>;
  create(file: File): Promise<File>;
  update(id: string, file: FileUpdateData): Promise<File>;
  delete(id: string): Promise<void>;
}
