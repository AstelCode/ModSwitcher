import { ModDependency } from "../../model/Mod/ModDependency";

export interface ModDependencyFilter {
  modId?: string;
  minVersion?: string;
  maxVersion?: string;
  dependencyModId?: string;
  dependencyFileId?: string;
  role?: string;
}
export interface ModDependencyPagination {
  limit?: number;
  offset?: number;
}
export interface ModDependencyUpdateData {
  modId?: string;
  minVersion?: string;
  maxVersion?: string;
  dependencyModId?: string;
  dependencyFileId?: string;
  role?: string;
}
export interface ModDependencyRepository {
  getAll(data?: {
    filter?: ModDependencyFilter;
    pagination?: ModDependencyPagination;
  }): Promise<ModDependency[]>;
  getById(id: string): Promise<ModDependency | undefined>;
  create(modDependency: ModDependency): Promise<ModDependency>;
  update(
    id: string,
    modDependency: ModDependencyUpdateData,
  ): Promise<ModDependency>;
  delete(id: string): Promise<void>;
}
