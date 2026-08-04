import { LocalFile } from "../../model/file/LocalFile";

export interface LocalFileUpdateData {
  name?: string;
  size?: number;
  mimeType?: string;
  path?: string;
  url?: string;
  bucket?: string;
  extension?: string;
  sha256?: string;
}
export interface LocalFileFilter {
  name?: string;
  size?: number;
  mimeType?: string;
  path?: string;
  url?: string;
  bucket?: string;
  extension?: string;
  sha256?: string;
}
export interface LocalFilePagination {
  limit?: number;
  offset?: number;
}
export interface LocalFileRepository {
  getAll(data?: {
    filter?: LocalFileFilter;
    pagination?: LocalFilePagination;
  }): Promise<LocalFile[]>;
  getById(id: string): Promise<LocalFile | undefined>;
  create(localFile: LocalFile): Promise<LocalFile>;
  update(id: string, localFile: LocalFileUpdateData): Promise<LocalFile>;
  delete(id: string): Promise<void>;
}
