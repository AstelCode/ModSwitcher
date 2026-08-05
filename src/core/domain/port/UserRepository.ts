import { User, UserStatus } from "../model/User";

export interface UserFilter {
  username?: string;
  password?: string;
  email?: string;
  avatarId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string | string[];
  activationCode?: string;
  recoveryTokenHash?: string;
}
export interface UserPagination {
  limit?: number;
  offset?: number;
}
export interface UserUpdateData {
  username?: string;
  password?: string;
  email?: string;
  avatarId?: string;
  role?: string;
  activationCode?: string;
  recoveryTokenHash?: string;
  status?: UserStatus;
}
export interface UserInclude {
  mods?: boolean;
  packs?: boolean;
  shaders?: boolean;
  installations?: boolean;
  avatar?: boolean;
}
export interface UserRepository {
  getAll(data?: {
    filter?: UserFilter;
    pagination?: UserPagination;
    include?: UserInclude;
  }): Promise<User[]>;
  exists(id: string): Promise<boolean>;
  getByEmail(email: string): Promise<User | undefined>;
  getById(id: string, include?: UserInclude): Promise<User | undefined>;
  create(user: User): Promise<User>;
  update(id: string, user: UserUpdateData): Promise<User>;
  delete(id: string): Promise<void>;
}
