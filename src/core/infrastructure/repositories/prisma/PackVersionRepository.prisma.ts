import {
  PackVersionFilter,
  PackVersionInclude,
  PackVersionPagination,
  PackVersionRepository,
  PackVersionUpdateData,
} from "@/core/domain/port/pack/PackVersionRepository";
import { PrismaClient } from "./connection/client";
import { PackVersion } from "@/core/domain/model/pack/PackVersion";

export class PackVersionRepositoryPrisma implements PackVersionRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: PackVersionFilter;
    pagination?: PackVersionPagination;
    include?: PackVersionInclude;
  }): Promise<PackVersion[]> {
    const packVersions = await this.prisma.packVersion.findMany({
      where: {
        packId: data?.filter?.packId,
        version: data?.filter?.version,
        minecraftLoaderId: data?.filter?.minecraftLoaderId,
        minecraftVersionId: data?.filter?.minecraftVersionId,
      },
      include: {
        pack: data?.include?.pack,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return packVersions;
  }
  async getById(
    id: string,
    include?: PackVersionInclude,
  ): Promise<PackVersion | undefined> {
    const packVersion = await this.prisma.packVersion.findUnique({
      where: {
        id: id,
      },
      include: {
        pack: include?.pack,
      },
    });
    return packVersion;
  }

  async create(packVersion: PackVersion): Promise<PackVersion> {
    const packVersionPersistence = packVersion.toPersistence();
    const createdPackVersion = await this.prisma.packVersion.create({
      data: packVersionPersistence,
    });
    return createdPackVersion;
  }
  async update(
    id: string,
    packVersion: PackVersionUpdateData,
  ): Promise<PackVersion> {
    const updatedPackVersion = await this.prisma.packVersion.update({
      where: {
        id: id,
      },
      data: {
        packId: packVersion.packId,
        minecraftVersionId: packVersion.minecraftVersionId,
      },
    });
    return updatedPackVersion;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.packVersion.delete({
      where: {
        id: id,
      },
    });
  }
}
