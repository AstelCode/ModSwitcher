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
export interface PackModRepository {
  getAll(data?: {
    filter?: PackModFilter;
    pagination?: PackModPagination;
  }): Promise<PackMod[]>;
  getById(id: string): Promise<PackMod | undefined>;
  create(packMod: PackMod): Promise<PackMod>;
  update(id: string, packMod: PackModUpdateData): Promise<PackMod>;
  delete(id: string): Promise<void>;
}
