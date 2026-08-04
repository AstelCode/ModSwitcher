import { Mod } from "../../model/Mod/Mod";

export interface ModFilter {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface ModPagination {
  limit?: number;
  offset?: number;
}
export interface ModUpdateData {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface ModRepository {
  getAll(data?: {
    filter?: ModFilter;
    pagination?: ModPagination;
  }): Promise<Mod[]>;
  getById(id: string): Promise<Mod | undefined>;
  create(mod: Mod): Promise<Mod>;
  update(id: string, mod: ModUpdateData): Promise<Mod>;
  delete(id: string): Promise<void>;
}
