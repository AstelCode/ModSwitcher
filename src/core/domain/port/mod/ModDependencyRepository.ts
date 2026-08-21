import {
  ModDependency,
  ModDependencyRole,
} from "../../model/mod/ModDependency";

export interface ModDependencyFilter {
  modId?: string;
  minVersion?: string;
  maxVersion?: string;
  dependencyModId?: string;
  dependencyFileId?: string;
  role?: ModDependencyRole;
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
  role?: ModDependencyRole;
}
export interface ModDependencyInclude {
  mod?: boolean;
  dependencyMod?: boolean;
}
export interface ModDependencyRepository {
  getAll(data?: {
    filter?: ModDependencyFilter;
    pagination?: ModDependencyPagination;
    include?: ModDependencyInclude;
  }): Promise<ModDependency[]>;
  getById(
    id: string,
    include?: ModDependencyInclude,
  ): Promise<ModDependency | undefined>;
  create(modDependency: ModDependency): Promise<ModDependency>;
  update(
    id: string,
    modDependency: ModDependencyUpdateData,
  ): Promise<ModDependency>;
  delete(id: string): Promise<void>;
}
