import { UserInstalation } from "../model/UserInstalation";

export interface UserInstalationFilter {
  userId?: string;
  name?: string;
  minecraftPath?: string;
  syncStatus?: string;
  activePackVersionId?: string;
  activeShaderFileId?: string;
  activeModsId?: string;
  disableModsId?: string;
  lastSyncAt?: Date;
}
export interface UserInstalationPagination {
  limit?: number;
  offset?: number;
}
export interface UserInstalationUpdateData {
  userId?: string;
  name?: string;
  minecraftPath?: string;
  syncStatus?: string;
  activePackVersionId?: string;
  activeShaderFileId?: string;
  activeModsId?: string;
  disableModsId?: string;
  lastSyncAt?: Date;
}
export interface UserInstalationRepository {
  getAll(data?: {
    filter?: UserInstalationFilter;
    pagination?: UserInstalationPagination;
  }): Promise<UserInstalation[]>;
  getById(id: string): Promise<UserInstalation | undefined>;
  create(userInstalation: UserInstalation): Promise<UserInstalation>;
  update(
    id: string,
    userInstalation: UserInstalationUpdateData,
  ): Promise<UserInstalation>;
  delete(id: string): Promise<void>;
}
