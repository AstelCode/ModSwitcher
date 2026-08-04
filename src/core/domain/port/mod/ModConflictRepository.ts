import { ModConflict } from "../../model/Mod/ModConflict";

export interface ModConflictFilter {
  modId?: string;
  conflicModId?: string;
  comment?: string;
}
export interface ModConflictPagination {
  limit?: number;
  offset?: number;
}
export interface ModConflictUpdateData {
  modId?: string;
  conflicModId?: string;
  comment?: string;
}
export interface ModConflictRepository {
  getAll(data?: {
    filter?: ModConflictFilter;
    pagination?: ModConflictPagination;
  }): Promise<ModConflict[]>;
  getById(id: string): Promise<ModConflict | undefined>;
  create(modConflict: ModConflict): Promise<ModConflict>;
  update(id: string, modConflict: ModConflictUpdateData): Promise<ModConflict>;
  delete(id: string): Promise<void>;
}
