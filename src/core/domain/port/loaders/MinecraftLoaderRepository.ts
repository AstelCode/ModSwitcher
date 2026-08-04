import { MinecraftLoader } from "../../model/loaders/MinecraftLoader";

export interface MinecraftLoaderFilter {
  name?: string;
  iconId?: string;
}
export interface MinecraftLoaderPagination {
  limit?: number;
  offset?: number;
}
export interface MinecraftLoaderUpdateData {
  name?: string;
  iconId?: string;
}
export interface MinecraftLoaderRepository {
  getAll(data?: {
    filter?: MinecraftLoaderFilter;
    pagination?: MinecraftLoaderPagination;
  }): Promise<MinecraftLoader[]>;
  getById(id: string): Promise<MinecraftLoader | undefined>;
  create(minecraftLoader: MinecraftLoader): Promise<MinecraftLoader>;
  update(
    id: string,
    minecraftLoader: MinecraftLoaderUpdateData,
  ): Promise<MinecraftLoader>;
  delete(id: string): Promise<void>;
}
