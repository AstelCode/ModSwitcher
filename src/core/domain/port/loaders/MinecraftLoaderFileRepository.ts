import { MinecraftLoaderFile } from "../../model/loaders/MinecraftLoaderFile";

export interface MinecraftLoaderFileFilter {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface MinecraftLoaderFilePagination {
  limit?: number;
  offset?: number;
}
export interface MinecraftLoaderFileUpdateData {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface MinecraftLoaderFileRepository {
  getAll(data?: {
    filter?: MinecraftLoaderFileFilter;
    pagination?: MinecraftLoaderFilePagination;
  }): Promise<MinecraftLoaderFile[]>;
  getById(id: string): Promise<MinecraftLoaderFile | undefined>;
  create(
    minecraftLoaderFile: MinecraftLoaderFile,
  ): Promise<MinecraftLoaderFile>;
  update(
    id: string,
    minecraftLoaderFile: MinecraftLoaderFileUpdateData,
  ): Promise<MinecraftLoaderFile>;
  delete(id: string): Promise<void>;
}
