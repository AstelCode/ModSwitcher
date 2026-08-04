import { ExternalId } from "../model/ExternalId";

export interface ExternalIdFilter {
  externalId?: string;
  externalType?: string;
}
export interface ExternalIdPagination {
  limit?: number;
  offset?: number;
}
export interface ExternalIdUpdateData {
  externalId?: string;
  externalType?: string;
  url?: string;
}
export interface ExternalIdRepository {
  getAll(data?: {
    filter?: ExternalIdFilter;
    pagination?: ExternalIdPagination;
  }): Promise<ExternalId[]>;
  getById(id: string): Promise<ExternalId | undefined>;
  create(externalId: ExternalId): Promise<ExternalId>;
  update(id: string, externalId: ExternalIdUpdateData): Promise<ExternalId>;
  delete(id: string): Promise<void>;
}
