import { User } from "../model/User";

export interface UserFilter {
  username?: string;
  password?: string;
  email?: string;
  avatarId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  activationCode?: string;
  recoveryTokenHash?: string;
}
export interface UserRepository {
  getAll(data?: {
    filter?: UserFilter;
    pagination?: UserPagination;
  }): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getById(id: string): Promise<User | undefined>;
  create(user: User): Promise<User>;
  update(id: string, user: UserUpdateData): Promise<User>;
  delete(id: string): Promise<void>;
}
