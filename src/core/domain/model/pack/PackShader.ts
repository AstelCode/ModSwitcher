import { ShaderFile, ShaderFileJson } from "../shader/ShaderFile";
import { PackVersion, PackVersionJson } from "./PackVersion";

export interface PackShaderArgs {
  id?: string;
  packVersion?: PackVersion;
  shaderFile: ShaderFile;
}
export interface PackShaderPersistence {
  packVersionId: string;
  shaderFileId: string;
}
export interface PackShaderJson {
  id: string;
  packVersion: PackVersionJson;
  shaderFile: ShaderFileJson;
}
export class PackShader {
  id?: string;
  packVersion?: PackVersion;
  shaderFile: ShaderFile;
  constructor(args: PackShaderArgs) {
    this.id = args.id;
    this.packVersion = args.packVersion;
    this.shaderFile = args.shaderFile;
  }
  toPersistence(): PackShaderPersistence {
    if (this.packVersion == null)
      throw new Error("PackShader must have a packVersion");
    if (this.shaderFile == null)
      throw new Error("PackShader must have a shaderFile");
    if (!this.packVersion.id)
      throw new Error("PackShader must have a packVersion id");
    if (!this.shaderFile.id)
      throw new Error("PackShader must have a shaderFile id");
    return {
      packVersionId: this.packVersion.id,
      shaderFileId: this.shaderFile.id,
    };
  }
  toJson(): PackShaderJson {
    if (!this.id) throw new Error("PackShader must have an id");
    if (!this.packVersion)
      throw new Error("PackShader must have a packVersion");
    if (!this.shaderFile) throw new Error("PackShader must have a shaderFile");
    return {
      id: this.id,
      packVersion: this.packVersion.toJson(),
      shaderFile: this.shaderFile.toJson(),
    };
  }
}
