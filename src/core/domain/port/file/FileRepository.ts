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
}
export interface FileRepository {
  getAll(data?: {
    filter?: FileFilter;
    pagination?: FilePagination;
  }): Promise<File[]>;
  getById(id: string): Promise<File | undefined>;
  create(file: File): Promise<File>;
  update(id: string, file: FileUpdateData): Promise<File>;
  delete(id: string): Promise<void>;
}
