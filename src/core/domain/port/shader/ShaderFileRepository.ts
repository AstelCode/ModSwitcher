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
export interface ShaderFileInclude {
  file?: boolean;
  loader?: boolean;
  minecraftVersion?: boolean;
  shader?: boolean;
}
export interface ShaderFileRepository {
  getAll(data?: {
    filter?: ShaderFileFilter;
    pagination?: ShaderFilePagination;
    include?: ShaderFileInclude;
  }): Promise<ShaderFile[]>;
  getById(
    id: string,
    include?: ShaderFileInclude,
  ): Promise<ShaderFile | undefined>;
  create(shaderFile: ShaderFile): Promise<ShaderFile>;
  update(id: string, shaderFile: ShaderFileUpdateData): Promise<ShaderFile>;
  delete(id: string): Promise<void>;
}
