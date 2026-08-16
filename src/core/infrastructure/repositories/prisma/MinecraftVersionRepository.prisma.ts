import {
  MinecraftVersionFilter,
  MinecraftVersionPagination,
  MinecraftVersionRepository,
  MinecraftVersionUpdateData,
} from "@/core/domain/port/loaders/MinecraftVersionRepository";
import { PrismaClient } from "./connection/client";
import { MinecraftVersion } from "@/core/domain/model/loaders/MinecraftVersion";

export class MinecraftVersionRepositoryPrisma implements MinecraftVersionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: MinecraftVersionFilter;
    pagination?: MinecraftVersionPagination;
  }): Promise<MinecraftVersion[]> {
    const minecraftVersions = await this.prisma.minecraftVersion.findMany({
      where: {
        major: data?.filter?.major,
        minor: data?.filter?.minor,
        patch: data?.filter?.patch,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return minecraftVersions.map(
      (minecraftVersion) => new MinecraftVersion(minecraftVersion),
    );
  }

  async getById(id: string): Promise<MinecraftVersion | undefined> {
    const minecraftVersion = await this.prisma.minecraftVersion.findUnique({
      where: {
        id: id,
      },
    });
    if (!minecraftVersion) return;
    return new MinecraftVersion(minecraftVersion);
  }

  async create(minecraftVersion: MinecraftVersion): Promise<MinecraftVersion> {
    const minecraftVersionPersistence = minecraftVersion.toPersistence();
    const createdMinecraftVersion = await this.prisma.minecraftVersion.create({
      data: minecraftVersionPersistence,
    });
    return new MinecraftVersion(createdMinecraftVersion);
  }

  async update(
    id: string,
    minecraftVersion: MinecraftVersionUpdateData,
  ): Promise<MinecraftVersion> {
    const updatedMinecraftVersion = await this.prisma.minecraftVersion.update({
      where: {
        id: id,
      },
      data: {
        major: minecraftVersion.major,
        minor: minecraftVersion.minor,
        patch: minecraftVersion.patch,
      },
    });
    return new MinecraftVersion(updatedMinecraftVersion);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.minecraftVersion.delete({
      where: {
        id: id,
      },
    });
  }
}
