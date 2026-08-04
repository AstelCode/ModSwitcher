import { Shader } from "../../model/shader/Shader";

export interface ShaderFilter {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
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
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface ShaderRepository {
  getAll(data?: {
    filter?: ShaderFilter;
    pagination?: ShaderPagination;
  }): Promise<Shader[]>;
  getById(id: string): Promise<Shader | undefined>;
  create(shader: Shader): Promise<Shader>;
  update(id: string, shader: ShaderUpdateData): Promise<Shader>;
  delete(id: string): Promise<void>;
}
