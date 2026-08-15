import {
  PackModFilter,
  PackModInclude,
  PackModPagination,
  PackModRepository,
  PackModUpdateData,
} from "@/core/domain/port/pack/PackModRepository";
import { PrismaClient } from "./connection/client";
import { PackMod } from "@/core/domain/model/pack/PackMod";

export class PackModRepositoryPrisma implements PackModRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async deleteList(ids: string[]): Promise<void> {
    await this.prisma.packMod.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  async getAll(data?: {
    filter?: PackModFilter;
    pagination?: PackModPagination;
    include?: PackModInclude;
  }): Promise<PackMod[]> {
    const packMods = await this.prisma.packMod.findMany({
      where: {
        packVersionId: data?.filter?.packVersionId,
        modFileId: data?.filter?.modFileId,
        //        optional: data?.filter?.optional,
      },
      include: {
        packVersion: data?.include?.packVersion,
        modFile: data?.include?.modFile,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return packMods;
  }
  async getById(
    id: string,
    include?: PackModInclude,
  ): Promise<PackMod | undefined> {
    const packMod = await this.prisma.packMod.findUnique({
      where: {
        id: id,
      },
      include: {
        packVersion: include?.packVersion,
        modFile: include?.modFile,
      },
    });
    return packMod;
  }

  async create(packMod: PackMod): Promise<PackMod> {
    const packModPersistence = packMod.toPersistence();
    const createdPackMod = await this.prisma.packMod.create({
      data: packModPersistence,
    });
    return createdPackMod;
  }
  async update(id: string, packMod: PackModUpdateData): Promise<PackMod> {
    const updatedPackMod = await this.prisma.packMod.update({
      where: {
        id: id,
      },
      data: {
        packVersionId: packMod.packVersionId,
        modFileId: packMod.modFileId,
        //        optional: packMod.optional,
      },
    });
    return updatedPackMod;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.packMod.delete({
      where: {
        id: id,
      },
    });
  }
}
