import { ShaderLoader } from "../../model/loaders/ShaderLoader";

export interface ShaderLoaderFilter {
  name?: string;
  iconId?: string;
}
export interface ShaderLoaderPagination {
  limit?: number;
  offset?: number;
}
export interface ShaderLoaderUpdateData {
  name?: string;
  iconId?: string;
}
export interface ShaderLoaderInclude {
  icon?: boolean;
}
export interface ShaderLoaderRepository {
  getAll(data?: {
    filter?: ShaderLoaderFilter;
    pagination?: ShaderLoaderPagination;
    include?: ShaderLoaderInclude;
  }): Promise<ShaderLoader[]>;
  getById(id: string): Promise<ShaderLoader | undefined>;
  create(
    shaderLoader: ShaderLoader,
    include?: ShaderLoaderInclude,
  ): Promise<ShaderLoader>;
  update(
    id: string,
    shaderLoader: ShaderLoaderUpdateData,
  ): Promise<ShaderLoader>;
  delete(id: string): Promise<void>;
}
