import { ModFile } from "../../model/Mod/ModFile";

export interface ModFileFilter {
  fileId?: string;
  loaderId?: string;
  modId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface ModFilePagination {
  limit?: number;
  offset?: number;
}
export interface ModFileUpdateData {
  fileId?: string;
  loaderId?: string;
  modId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface ModFileRepository {
  getAll(data?: {
    filter?: ModFileFilter;
    pagination?: ModFilePagination;
  }): Promise<ModFile[]>;
  getById(id: string): Promise<ModFile | undefined>;
  create(modFile: ModFile): Promise<ModFile>;
  update(id: string, modFile: ModFileUpdateData): Promise<ModFile>;
  delete(id: string): Promise<void>;
}
