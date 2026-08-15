import {
  MinecraftLoaderFilter,
  MinecraftLoaderInclude,
  MinecraftLoaderPagination,
  MinecraftLoaderRepository,
} from "@/core/domain/port/loaders/MinecraftLoaderRepository";
import { PrismaClient } from "./connection/client";
import { MinecraftLoader } from "@/core/domain/model/loaders/MinecraftLoader";

export class MinecraftLoaderRepositoryPrisma implements MinecraftLoaderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: MinecraftLoaderFilter;
    pagination?: MinecraftLoaderPagination;
    include?: MinecraftLoaderInclude;
  }): Promise<MinecraftLoader[]> {
    const minecraftLoaders = await this.prisma.minecraftLoader.findMany({
      where: {
        name: data?.filter?.name,
        iconId: data?.filter?.iconId,
      },
      include: {
        icon: data?.include?.icon,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return minecraftLoaders;
  }

  async getById(
    id: string,
    include?: MinecraftLoaderInclude,
  ): Promise<MinecraftLoader | undefined> {
    const minecraftLoader = await this.prisma.minecraftLoader.findUnique({
      where: {
        id: id,
      },
      include: {
        icon: include?.icon,
      },
    });
    return minecraftLoader;
  }

  async create(minecraftLoader: MinecraftLoader): Promise<MinecraftLoader> {
    const minecraftLoaderPersistence = minecraftLoader.toPersistence();
    const createdMinecraftLoader = await this.prisma.minecraftLoader.create({
      data: minecraftLoaderPersistence,
    });
    return createdMinecraftLoader;
  }

  async update(id: string, minecraftLoader: MinecraftLoader) {
    const updatedMinecraftLoader = await this.prisma.minecraftLoader.update({
      where: {
        id: id,
      },
      data: {
        name: minecraftLoader.name,
        iconId: minecraftLoader.iconId,
      },
    });
    return updatedMinecraftLoader;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.minecraftLoader.delete({
      where: {
        id: id,
      },
    });
  }
}
