import {
  ModFileFilter,
  ModFileInclude,
  ModFilePagination,
  ModFileRepository,
  ModFileUpdateData,
} from "@/core/domain/port/mod/ModFileRepository";
import { PrismaClient } from "./connection/client";
import { ModFile } from "@/core/domain/model/Mod/ModFile";
import { FileModel } from "@/core/domain/model/file/File";
import { MinecraftLoader } from "@/core/domain/model/loaders/MinecraftLoader";
import { MinecraftVersion } from "@/core/domain/model/loaders/MinecraftVersion";

export class ModFileRepositoryPrisma implements ModFileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: ModFileFilter;
    pagination?: ModFilePagination;
    include?: ModFileInclude;
  }): Promise<ModFile[]> {
    const modFiles = await this.prisma.modFile.findMany({
      where: {
        fileId: data?.filter?.fileId,
        version: data?.filter?.version,
        loaderId: data?.filter?.loaderId,
      },
      include: {
        file: data?.include?.file,
        loader: data?.include?.loader,
        minecraftVersion: data?.include?.minecraftVersion,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return modFiles.map(
      (modFile) =>
        new ModFile({
          ...modFile,
          file: modFile.file ? new FileModel(modFile.file) : null,
          loader: modFile.loader ? new MinecraftLoader(modFile.loader) : null,
          minecraftVersion: modFile.minecraftVersion
            ? new MinecraftVersion(modFile.minecraftVersion)
            : null,
        }),
    );
  }

  async getById(
    id: string,
    include?: ModFileInclude,
  ): Promise<ModFile | undefined> {
    const modFile = await this.prisma.modFile.findUnique({
      where: {
        id: id,
      },
      include: {
        file: include?.file,
        loader: include?.loader,
        minecraftVersion: include?.minecraftVersion,
      },
    });
    if (!modFile) return;
    return new ModFile({
      ...modFile,
      file: modFile.file ? new FileModel(modFile.file) : null,
      loader: modFile.loader ? new MinecraftLoader(modFile.loader) : null,
      minecraftVersion: modFile.minecraftVersion
        ? new MinecraftVersion(modFile.minecraftVersion)
        : null,
    });
  }

  async create(modFile: ModFile): Promise<ModFile> {
    const modFilePersistence = modFile.toPersistence();
    const createdModFile = await this.prisma.modFile.create({
      data: modFilePersistence,
    });
    return new ModFile(createdModFile);
  }

  async update(id: string, modFile: ModFileUpdateData): Promise<ModFile> {
    const updatedModFile = await this.prisma.modFile.update({
      where: {
        id: id,
      },
      data: {
        fileId: modFile.fileId,
        version: modFile.version,
        loaderId: modFile.loaderId,
      },
    });
    return new ModFile(updatedModFile);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.modFile.delete({
      where: {
        id: id,
      },
    });
  }
}
