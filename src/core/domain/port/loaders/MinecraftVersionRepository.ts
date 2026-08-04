import { MinecraftVersion } from "../../model/loaders/MinecraftVersion";

export interface MinecraftVersionUpdateData {
  major?: number;
  minor?: number;
  patch?: number;
}
export interface MinecraftVersionFilter {
  major?: number;
  minor?: number;
  patch?: number;
}
export interface MinecraftVersionPagination {
  limit?: number;
  offset?: number;
}
export interface MinecraftVersionRepository {
  getAll(data?: {
    filter?: MinecraftVersionFilter;
    pagination?: MinecraftVersionPagination;
  }): Promise<MinecraftVersion[]>;
  getById(id: string): Promise<MinecraftVersion | undefined>;
  create(minecraftVersion: MinecraftVersion): Promise<MinecraftVersion>;
  update(
    id: string,
    minecraftVersion: MinecraftVersionUpdateData,
  ): Promise<MinecraftVersion>;
  delete(id: string): Promise<void>;
}
