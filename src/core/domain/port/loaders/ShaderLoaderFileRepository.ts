import { ShaderLoaderFile } from "../../model/loaders/ShaderLoaderFile";

export interface ShaderLoaderFileFilter {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface ShaderLoaderFilePagination {
  limit?: number;
  offset?: number;
}
export interface ShaderLoaderFileUpdateData {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  version?: string;
}
export interface ShaderLoaderFileRepository {
  getAll(data?: {
    filter?: ShaderLoaderFileFilter;
    pagination?: ShaderLoaderFilePagination;
  }): Promise<ShaderLoaderFile[]>;
  getById(id: string): Promise<ShaderLoaderFile | undefined>;
  create(shaderLoaderFile: ShaderLoaderFile): Promise<ShaderLoaderFile>;
  update(
    id: string,
    shaderLoaderFile: ShaderLoaderFileUpdateData,
  ): Promise<ShaderLoaderFile>;
  delete(id: string): Promise<void>;
}
