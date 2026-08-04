import { FileJson, FileModel } from "./file/File";
import { Mod, ModJson } from "./Mod/Mod";
import { Pack, PackJson } from "./pack/Pack";
import { Shader, ShaderJson } from "./shader/Shader";
import { UserInstalation, UserInstalationJson } from "./UserInstalation";

export interface UserArgs {
  id?: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileModel;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  activationCode: string;
  recoveryTokenHash: string;
  mods?: Mod[];
  packs?: Pack[];
  shaders?: Shader[];
  installations?: UserInstalation[];
}
export interface UserPersistence {
  username: string;
  password: string;
  email: string;
  avatarId?: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  activationCode: string;
  recoveryTokenHash: string;
}
export interface UserJson {
  id: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileJson;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  activationCode: string;
  recoveryTokenHash: string;
  mods?: ModJson[];
  packs?: PackJson[];
  shaders?: ShaderJson[];
  installations?: UserInstalationJson[];
}
export class User {
  id?: string;
  username: string;
  password: string;
  email: string;
  avatar?: FileModel;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  activationCode: string;
  recoveryTokenHash: string;
  mods?: Mod[];
  packs?: Pack[];
  shaders?: Shader[];
  installations?: UserInstalation[];
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
      avatarId: this.avatar?.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
      activationCode: this.activationCode,
      recoveryTokenHash: this.recoveryTokenHash,
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
    //if (!this.mods) throw new Error("User must have mods");
    //if (!this.packs) throw new Error("User must have packs");
    //if (!this.shaders) throw new Error("User must have shaders");
    //if (!this.installations) throw new Error("User must have installations");
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
    };
  }
}
