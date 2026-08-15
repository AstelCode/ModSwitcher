import { Shader } from "../../model/shader/Shader";

export interface ShaderFilter {
  name?: string;
  description?: string;
  authorId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface ShaderPagination {
  limit?: number;
  offset?: number;
}
export interface ShaderUpdateData {
  name?: string;
  description?: string;
  authorId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface ShaderInclude {
  author?: boolean;
  images?: boolean;
  icon?: boolean;
  externalIds?: boolean;
}
export interface ShaderRepository {
  getAll(data?: {
    filter?: ShaderFilter;
    pagination?: ShaderPagination;
    include?: ShaderInclude;
  }): Promise<Shader[]>;
  getById(id: string, include?: ShaderInclude): Promise<Shader | undefined>;
  create(shader: Shader): Promise<Shader>;
  update(id: string, shader: ShaderUpdateData): Promise<Shader>;
  delete(id: string): Promise<void>;
}
