import { Pack } from "../../model/pack/Pack";

export interface PackFilter {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface PackPagination {
  limit?: number;
  offset?: number;
}
export interface PackUpdateData {
  name?: string;
  description?: string;
  authorId?: string;
  imagesId?: string;
  iconId?: string;
  externalIdsId?: string;
}
export interface PackInclude {
  author?: boolean;
  images?: boolean;
  icon?: boolean;
  packVersions?: boolean;
  externalIds?: boolean;
}
export interface PackRepository {
  getAll(data?: {
    filter?: PackFilter;
    pagination?: PackPagination;
    include?: PackInclude;
  }): Promise<Pack[]>;
  getById(id: string, include?: PackInclude): Promise<Pack | undefined>;
  create(pack: Pack): Promise<Pack>;
  update(id: string, pack: PackUpdateData): Promise<Pack>;
  delete(id: string): Promise<void>;
}
