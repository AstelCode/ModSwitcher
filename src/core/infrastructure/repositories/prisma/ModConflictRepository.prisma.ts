import {
  ModConflictFilter,
  ModConflictInclude,
  ModConflictPagination,
  ModConflictRepository,
  ModConflictUpdateData,
} from "@/core/domain/port/mod/ModConflictRepository";
import { PrismaClient } from "./connection/client";
import { ModConflict } from "@/core/domain/model/Mod/ModConflict";

export class ModConflictRepositoryPrisma implements ModConflictRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: ModConflictFilter;
    pagination?: ModConflictPagination;
    include?: ModConflictInclude;
  }): Promise<ModConflict[]> {
    const modConflicts = await this.prisma.modConflict.findMany({
      where: {
        modId: data?.filter?.modId,
        conflictModId: data?.filter?.conflictModId,
      },
      include: {
        mod: data?.include?.mod,
        conflictMod: data?.include?.conflictMod,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return modConflicts;
  }
  async getById(
    id: string,
    include?: ModConflictInclude,
  ): Promise<ModConflict | undefined> {
    const modConflict = await this.prisma.modConflict.findUnique({
      where: {
        id: id,
      },
      include: {
        mod: include?.mod,
        conflictMod: include?.conflictMod,
      },
    });
    return modConflict;
  }

  async create(modConflict: ModConflict): Promise<ModConflict> {
    const modConflictPersistence = modConflict.toPersistence();
    const createdModConflict = await this.prisma.modConflict.create({
      data: modConflictPersistence,
    });
    return createdModConflict;
  }
  async update(id: string, modConflict: ModConflictUpdateData): Promise<void> {
    await this.prisma.modConflict.update({
      where: {
        id: id,
      },
      data: {
        modId: modConflict.modId,
        conflictModId: modConflict.conflictModId,
        comment: modConflict.comment,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.modConflict.delete({
      where: {
        id: id,
      },
    });
  }
}
