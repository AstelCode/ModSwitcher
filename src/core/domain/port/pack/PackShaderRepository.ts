import { PackShader } from "../../model/pack/PackShader";

export interface PackShaderFilter {
  packVersionId?: string;
  shaderFileId?: string;
}
export interface PackShaderPagination {
  limit?: number;
  offset?: number;
}
export interface PackShaderUpdateData {
  packVersionId?: string;
  shaderFileId?: string;
}
export interface PackShaderInclude {
  packVersion?: boolean;
  shaderFile?: boolean;
}
export interface PackShaderRepository {
  getAll(data?: {
    filter?: PackShaderFilter;
    pagination?: PackShaderPagination;
    include?: PackShaderInclude;
  }): Promise<PackShader[]>;
  getById(
    id: string,
    include?: PackShaderInclude,
  ): Promise<PackShader | undefined>;
  create(packShader: PackShader): Promise<PackShader>;
  update(id: string, packShader: PackShaderUpdateData): Promise<PackShader>;
  delete(id: string): Promise<void>;
  deleteList(ids: string[]): Promise<void>;
}
