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
export interface PackShaderRepository {
  getAll(data?: {
    filter?: PackShaderFilter;
    pagination?: PackShaderPagination;
  }): Promise<PackShader[]>;
  getById(id: string): Promise<PackShader | undefined>;
  create(packShader: PackShader): Promise<PackShader>;
  update(id: string, packShader: PackShaderUpdateData): Promise<PackShader>;
  delete(id: string): Promise<void>;
}
