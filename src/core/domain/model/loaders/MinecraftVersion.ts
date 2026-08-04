export interface MinecraftVersionArgs {
  id?: string;
  major: number;
  minor: number;
  patch: number;
}
export interface MinecraftVersionPersistence {
  major: number;
  minor: number;
  patch: number;
}
export interface MinecraftVersionJson {
  id: string;
  major: number;
  minor: number;
  patch: number;
  value: string;
}

export class MinecraftVersion {
  id?: string;
  major: number;
  minor: number;
  patch: number;
  constructor(args: MinecraftVersionArgs) {
    this.id = args.id;
    this.major = args.major;
    this.minor = args.minor;
    this.patch = args.patch;
  }
  toPersistence(): MinecraftVersionPersistence {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
    };
  }
  toJson(): MinecraftVersionJson {
    if (!this.id) throw new Error("MinecraftVersion must have an id");
    if (!this.major) throw new Error("MinecraftVersion must have a major");
    if (!this.minor) throw new Error("MinecraftVersion must have a minor");
    if (!this.patch) throw new Error("MinecraftVersion must have a patch");
    return {
      id: this.id,
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      value: `${this.major}.${this.minor}.${this.patch}`,
    };
  }
}
