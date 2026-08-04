import { PackVersion } from "../../model/pack/PackVersion";

export interface PackVersionFilter {
  packId?: string;
  version?: string;
  minecraftVersionId?: string;
  minecraftLoaderId?: string;
  modsId?: string;
  shadersId?: string;
}
export interface PackVersionPagination {
  limit?: number;
  offset?: number;
}
export interface PackVersionUpdateData {
  packId?: string;
  version?: string;
  minecraftVersionId?: string;
  minecraftLoaderId?: string;
  modsId?: string;
  shadersId?: string;
}
export interface PackVersionRepository {
  getAll(data?: {
    filter?: PackVersionFilter;
    pagination?: PackVersionPagination;
  }): Promise<PackVersion[]>;
  getById(id: string): Promise<PackVersion | undefined>;
  create(packVersion: PackVersion): Promise<PackVersion>;
  update(id: string, packVersion: PackVersionUpdateData): Promise<PackVersion>;
  delete(id: string): Promise<void>;
}
