import {
  ModDependencyFilter,
  ModDependencyInclude,
  ModDependencyPagination,
  ModDependencyRepository,
  ModDependencyUpdateData,
} from "@/core/domain/port/mod/ModDependencyRepository";
import { PrismaClient } from "./connection/client";
import { ModDependency } from "@/core/domain/model/Mod/ModDependency";

export class ModDependencyRepositoryPrisma implements ModDependencyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: ModDependencyFilter;
    pagination?: ModDependencyPagination;
    include?: ModDependencyInclude;
  }): Promise<ModDependency[]> {
    const modDependencies = await this.prisma.modDependency.findMany({
      where: {
        modId: data?.filter?.modId,
        dependencyModId: data?.filter?.dependencyModId,
        rol: data?.filter?.role,
      },
      include: {
        mod: data?.include?.mod,
        dependencyMod: data?.include?.dependencyMod,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return modDependencies;
  }

  async getById(
    id: string,
    include?: ModDependencyInclude,
  ): Promise<ModDependency | undefined> {
    const modDependency = await this.prisma.modDependency.findUnique({
      where: {
        id: id,
      },
      include: {
        mod: include?.mod,
        dependencyMod: include?.dependencyMod,
      },
    });
    return modDependency;
  }

  async create(modDependency: ModDependency): Promise<ModDependency> {
    const modDependencyPersistence = modDependency.toPersistence();
    const createdModDependency = await this.prisma.modDependency.create({
      data: modDependencyPersistence,
    });
    return createdModDependency;
  }

  async update(id: string, modDependency: ModDependencyUpdateData) {
    const updatedModDependency = await this.prisma.modDependency.update({
      where: {
        id: id,
      },
      data: {
        modId: modDependency.modId,
        dependencyModId: modDependency.dependencyModId,
        minVersion: modDependency.minVersion,
        maxVersion: modDependency.maxVersion,
        dependencyFileId: modDependency.dependencyFileId,
        rol: modDependency.role,
      },
    });
    return updatedModDependency;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.modDependency.delete({
      where: {
        id: id,
      },
    });
  }
}
