import { Mod, ModStatus } from "../../model/Mod/Mod";

export interface ModFilter {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
  status?: ModStatus;
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
  status?: ModStatus;
}
interface ModInclude {
  author?: boolean;
  images?: boolean;
  icon?: boolean;
  externalIds?: boolean;
}
export interface ModRepository {
  getAll(data?: {
    filter?: ModFilter;
    pagination?: ModPagination;
    include?: ModInclude;
  }): Promise<Mod[]>;
  getById(id: string, include?: ModInclude): Promise<Mod | undefined>;
  create(mod: Mod): Promise<Mod>;
  update(id: string, mod: ModUpdateData): Promise<Mod>;
  delete(id: string): Promise<void>;
}
