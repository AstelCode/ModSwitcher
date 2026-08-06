import { PackMod } from "../../model/pack/PackMod";

export interface PackModFilter {
  packVersionId?: string;
  modFileId?: string;
  optional?: boolean;
  loadOrder?: number;
}
export interface PackModPagination {
  limit?: number;
  offset?: number;
}
export interface PackModUpdateData {
  packVersionId?: string;
  modFileId?: string;
  optional?: boolean;
  loadOrder?: number;
}
export interface PackModInclude {
  packVersion?: boolean;
  modFile?: boolean;
}
export interface PackModRepository {
  getAll(data?: {
    filter?: PackModFilter;
    pagination?: PackModPagination;
    include?: PackModInclude;
  }): Promise<PackMod[]>;
  getById(id: string, inclue?: PackModInclude): Promise<PackMod | undefined>;
  create(packMod: PackMod): Promise<PackMod>;
  update(id: string, packMod: PackModUpdateData): Promise<PackMod>;
  delete(id: string): Promise<void>;
  deleteList(ids: string[]): Promise<void>;
}
