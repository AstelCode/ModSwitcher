import { ShaderFile } from "../../model/shader/ShaderFile";

export interface ShaderFileFilter {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  shaderId?: string;
}
export interface ShaderFilePagination {
  limit?: number;
  offset?: number;
}
export interface ShaderFileUpdateData {
  fileId?: string;
  loaderId?: string;
  minecraftVersionId?: string;
  shaderId?: string;
}
export interface ShaderFileRepository {
  getAll(data?: {
    filter?: ShaderFileFilter;
    pagination?: ShaderFilePagination;
  }): Promise<ShaderFile[]>;
  getById(id: string): Promise<ShaderFile | undefined>;
  create(shaderFile: ShaderFile): Promise<ShaderFile>;
  update(id: string, shaderFile: ShaderFileUpdateData): Promise<ShaderFile>;
  delete(id: string): Promise<void>;
}
