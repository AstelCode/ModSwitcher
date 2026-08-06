import { ModFileJson } from "@/core/domain/model/Mod/ModFile";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "modFileRepository">;

export class ListModFileUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(args: {
    modId: string;
    loaderId?: string;
    minecraftVersionId?: string;
    version?: string;
    fileId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Promise<ModFileJson[]> {
    const { modFileRepository } = this.deps;
    const modFiles = await modFileRepository.getAll({
      filter: {
        ...args,
        modId: args.modId,
        loaderId: args.loaderId,
        minecraftVersionId: args.minecraftVersionId,
        version: args.version,
        fileId: args.fileId,
      },
      include: {
        file: true,
      },
    });
    return modFiles.map((modFile) => modFile.toJson());
  }
}
