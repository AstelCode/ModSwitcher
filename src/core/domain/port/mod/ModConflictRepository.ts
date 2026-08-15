import { ModConflict } from "../../model/Mod/ModConflict";

export interface ModConflictFilter {
  modId?: string;
  conflictModId?: string;
  comment?: string;
}
export interface ModConflictPagination {
  limit?: number;
  offset?: number;
}
export interface ModConflictUpdateData {
  modId?: string;
  conflictModId?: string;
  comment?: string;
}
export interface ModConflictInclude {
  mod?: boolean;
  conflictMod?: boolean;
}
export interface ModConflictRepository {
  getAll(data?: {
    filter?: ModConflictFilter;
    pagination?: ModConflictPagination;
    include?: ModConflictInclude;
  }): Promise<ModConflict[]>;
  getById(
    id: string,
    include?: ModConflictInclude,
  ): Promise<ModConflict | undefined>;
  create(modConflict: ModConflict): Promise<ModConflict>;
  update(id: string, modConflict: ModConflictUpdateData): Promise<void>;
  delete(id: string): Promise<void>;
}
