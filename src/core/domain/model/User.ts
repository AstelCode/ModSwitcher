import { FileJson, FileModel } from "./file/File";
import { Mod, ModJson } from "./Mod/Mod";
import { Pack, PackJson } from "./pack/Pack";
import { Shader, ShaderJson } from "./shader/Shader";
import { UserInstalation, UserInstalationJson } from "./UserInstalation";
export type UserRole = "admin" | "user" | "superuser";
export type UserStatus = "active" | "inactive" | "banned";
export interface UserArgs {
  id?: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileModel;
  avatarId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole;
  activationCode: string;
  recoveryTokenHash?: string;
  mods?: Mod[];
  packs?: Pack[];
  shaders?: Shader[];
  installations?: UserInstalation[];
  status?: UserStatus;
}
export interface UserPersistence {
  username: string;
  password: string;
  email: string;
  avatarId?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  activationCode: string;
  recoveryTokenHash?: string;
  status?: UserStatus;
}
export interface UserJson {
  id: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileJson;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  activationCode: string;
  recoveryTokenHash?: string;
  mods?: ModJson[];
  packs?: PackJson[];
  shaders?: ShaderJson[];
  installations?: UserInstalationJson[];
  status?: UserStatus;
}
export class User {
  id?: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileModel;
  avatarId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole;
  activationCode: string;
  recoveryTokenHash?: string;
  mods?: Mod[];
  packs?: Pack[];
  shaders?: Shader[];
  installations?: UserInstalation[];
  status?: UserStatus;
  constructor(args: UserArgs) {
    this.id = args.id;
    this.username = args.username;
    this.password = args.password;
    this.email = args.email;
    this.avatar = args.avatar;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.role = args.role;
    this.activationCode = args.activationCode;
    this.recoveryTokenHash = args.recoveryTokenHash;
    this.mods = args.mods;
    this.packs = args.packs;
    this.shaders = args.shaders;
    this.installations = args.installations;
    this.status = args.status;
    this.avatarId = args.avatar?.id ?? args.avatarId;
  }
  getId(): string {
    if (!this.id) throw new Error("User must have an id");
    return this.id;
  }
  getAvatarId(): string {
    if (!this.avatarId) throw new Error("User must have an avatarId");
    return this.avatarId;
  }
  toPersistence(): UserPersistence {
    if (!this.username) throw new Error("User must have a username");
    if (!this.password) throw new Error("User must have a password");
    if (!this.email) throw new Error("User must have an email");
    if (!this.createdAt) throw new Error("User must have a createdAt");
    if (!this.updatedAt) throw new Error("User must have a updatedAt");
    if (!this.role) throw new Error("User must have a role");
    if (!this.activationCode)
      throw new Error("User must have an activationCode");
    if (!this.recoveryTokenHash)
      throw new Error("User must have a recoveryTokenHash");
    return {
      username: this.username,
      password: this.password,
      email: this.email,
      avatarId: this.avatar?.id ?? this.avatarId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
      activationCode: this.activationCode,
      recoveryTokenHash: this.recoveryTokenHash,
      status: this.status,
    };
  }
  toJson(): UserJson {
    if (!this.id) throw new Error("User must have an id");
    if (!this.username) throw new Error("User must have a username");
    if (!this.password) throw new Error("User must have a password");
    if (!this.email) throw new Error("User must have an email");
    if (!this.createdAt) throw new Error("User must have a createdAt");
    if (!this.updatedAt) throw new Error("User must have a updatedAt");
    if (!this.role) throw new Error("User must have a role");
    if (!this.activationCode)
      throw new Error("User must have an activationCode");
    if (!this.recoveryTokenHash)
      throw new Error("User must have a recoveryTokenHash");
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      avatar: this.avatar?.toJson(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
      activationCode: this.activationCode,
      recoveryTokenHash: this.recoveryTokenHash,
      shaders: this.shaders?.map((shader) => shader.toJson()),
      mods: this.mods?.map((mod) => mod.toJson()),
      packs: this.packs?.map((pack) => pack.toJson()),
      installations: this.installations?.map((installation) =>
        installation.toJson(),
      ),
      status: this.status,
    };
  }
}
