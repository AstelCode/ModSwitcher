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
export interface ModFileInclude {
  file?: boolean;
  minecraftVersion?: boolean;
  loader?: boolean;
}
export interface ModFileRepository {
  getAll(data?: {
    filter?: ModFileFilter;
    pagination?: ModFilePagination;
    include?: ModFileInclude;
  }): Promise<ModFile[]>;
  getById(id: string, include?: ModFileInclude): Promise<ModFile | undefined>;
  create(modFile: ModFile): Promise<ModFile>;
  update(id: string, modFile: ModFileUpdateData): Promise<ModFile>;
  delete(id: string): Promise<void>;
}
