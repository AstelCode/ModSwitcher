import {
  ModFilter,
  ModInclude,
  ModPagination,
  ModRepository,
} from "@/core/domain/port/mod/ModRepository";
import { PrismaClient } from "./connection/client";
import { Mod } from "@/core/domain/model/Mod/Mod";

export class ModRepositoryPrisma implements ModRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: ModFilter;
    pagination?: ModPagination;
    include?: ModInclude;
  }): Promise<Mod[]> {
    const mods = await this.prisma.mod.findMany({
      where: {
        name: data?.filter?.name,
        description: data?.filter?.description,
        authorId: data?.filter?.authorId,
        iconId: data?.filter?.iconId,
      },
      include: {
        author: data?.include?.author,
        icon: data?.include?.icon,
        images: data?.include?.images,
        files: data?.include?.files,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return mods;
  }

  async getById(id: string, include?: ModInclude): Promise<Mod | undefined> {
    const mod = await this.prisma.mod.findUnique({
      where: {
        id: id,
      },
      include: {
        author: include?.author,
        icon: include?.icon,
        files: include?.files,
      },
    });
    return mod;
  }

  async create(mod: Mod): Promise<Mod> {
    const modPersistence = mod.toPersistence();
    const createdMod = await this.prisma.mod.create({
      data: modPersistence,
    });
    return createdMod;
  }

  async update(id: string, mod: Mod) {
    const updatedMod = await this.prisma.mod.update({
      where: {
        id: id,
      },
      data: {
        name: mod.name,
        description: mod.description,
        authorId: mod.authorId,
        iconId: mod.iconId,
      },
    });
    return updatedMod;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mod.delete({
      where: {
        id: id,
      },
    });
  }
}
