import { ModFile, ModFilePersistence, ModFileJson } from "./Mod/ModFile";
import { PackVersion, PackVersionJson } from "./pack/PackVersion";
import { ShaderFile, ShaderFileJson } from "./shader/ShaderFile";
import { User, UserJson } from "./User";

export interface UserInstalationArgs {
  id?: string;
  user: User;
  name: string;
  minecraftPath: string;
  syncStatus: string;
  activePackVersion?: PackVersion;
  activeShaderFile?: ShaderFile;
  activeMods: ModFile[];
  disableMods: ModFile[];
  lastSyncAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserInstalationPersistence {
  userId: string;
  name: string;
  minecraftPath: string;
  syncStatus: string;
  activePackVersionId?: string;
  activeShaderFileId?: string;
  activeMods: ModFilePersistence[];
  disableMods: ModFilePersistence[];
  lastSyncAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserInstalationJson {
  id: string;
  user: UserJson;
  name: string;
  minecraftPath: string;
  syncStatus: string;
  activePackVersion?: PackVersionJson;
  activeShaderFile?: ShaderFileJson;
  activeMods: ModFileJson[];
  disableMods: ModFileJson[];
  lastSyncAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
export class UserInstalation {
  id?: string;
  user: User;
  name: string;
  minecraftPath: string;
  syncStatus: string;
  activePackVersion?: PackVersion;
  activeShaderFile?: ShaderFile;
  activeMods: ModFile[];
  disableMods: ModFile[];
  lastSyncAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(args: UserInstalationArgs) {
    this.id = args.id;
    this.user = args.user;
    this.name = args.name;
    this.minecraftPath = args.minecraftPath;
    this.syncStatus = args.syncStatus;
    this.activePackVersion = args.activePackVersion;
    this.activeShaderFile = args.activeShaderFile;
    this.activeMods = args.activeMods;
    this.disableMods = args.disableMods;
    this.lastSyncAt = args.lastSyncAt;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
  toPersistence(): UserInstalationPersistence {
    if (this.user == null) throw new Error("UserInstallation must have a user");
    if (this.name == null) throw new Error("UserInstallation must have a name");
    if (this.minecraftPath == null)
      throw new Error("UserInstallation must have a minecraftPath");
    if (this.syncStatus == null)
      throw new Error("UserInstallation must have a syncStatus");
    if (this.activePackVersion == null)
      throw new Error("UserInstallation must have a activePackVersion");
    if (this.activeShaderFile == null)
      throw new Error("UserInstallation must have a activeShaderFile");
    if (this.activeMods == null)
      throw new Error("UserInstallation must have a activeMods");
    if (this.disableMods == null)
      throw new Error("UserInstallation must have a disableMods");
    if (this.lastSyncAt == null)
      throw new Error("UserInstallation must have a lastSyncAt");
    if (this.createdAt == null)
      throw new Error("UserInstallation must have a createdAt");
    if (this.updatedAt == null)
      throw new Error("UserInstallation must have a updatedAt");
    if (!this.user.id) throw new Error("UserInstallation must have a user id");
    return {
      userId: this.user.id,
      name: this.name,
      minecraftPath: this.minecraftPath,
      syncStatus: this.syncStatus,
      activePackVersionId: this.activePackVersion?.id,
      activeShaderFileId: this.activeShaderFile?.id,
      activeMods: this.activeMods.map((mod) => mod.toPersistence()),
      disableMods: this.disableMods.map((mod) => mod.toPersistence()),
      lastSyncAt: this.lastSyncAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  toJson(): UserInstalationJson {
    if (!this.id) throw new Error("UserInstallation must have an id");
    if (!this.user) throw new Error("UserInstallation must have a user");
    if (!this.name) throw new Error("UserInstallation must have a name");
    if (!this.minecraftPath)
      throw new Error("UserInstallation must have a minecraftPath");
    if (!this.syncStatus)
      throw new Error("UserInstallation must have a syncStatus");
    if (!this.activePackVersion)
      throw new Error("UserInstallation must have a activePackVersion");
    if (!this.activeShaderFile)
      throw new Error("UserInstallation must have a activeShaderFile");
    if (!this.activeMods)
      throw new Error("UserInstallation must have a activeMods");
    if (!this.disableMods)
      throw new Error("UserInstallation must have a disableMods");
    if (!this.lastSyncAt)
      throw new Error("UserInstallation must have a lastSyncAt");
    if (!this.createdAt)
      throw new Error("UserInstallation must have a createdAt");
    if (!this.updatedAt)
      throw new Error("UserInstallation must have a updatedAt");
    return {
      id: this.id,
      user: this.user.toJson(),
      name: this.name,
      minecraftPath: this.minecraftPath,
      syncStatus: this.syncStatus,
      activePackVersion: this.activePackVersion?.toJson(),
      activeShaderFile: this.activeShaderFile?.toJson(),
      activeMods: this.activeMods.map((mod) => mod.toJson()),
      disableMods: this.disableMods.map((mod) => mod.toJson()),
      lastSyncAt: this.lastSyncAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
