import {
  PackFilter,
  PackInclude,
  PackPagination,
  PackRepository,
  PackUpdateData,
} from "@/core/domain/port/pack/PackRepository";
import { PrismaClient } from "./connection/client";
import { Pack } from "@/core/domain/model/pack/Pack";

export class PackRepositoryPrisma implements PackRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: PackFilter;
    pagination?: PackPagination;
    include?: PackInclude;
  }): Promise<Pack[]> {
    const packs = await this.prisma.pack.findMany({
      where: {
        name: data?.filter?.name,
        description: data?.filter?.description,
        authorId: data?.filter?.authorId,
        iconId: data?.filter?.iconId,
        externalIdsId: data?.filter?.externalIdsId,
      },
      include: {
        author: data?.include?.author,
        images: data?.include?.images,
        icon: data?.include?.icon,
        externalIds: data?.include?.externalIds,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return packs;
  }
  async getById(id: string, include?: PackInclude): Promise<Pack | undefined> {
    const pack = await this.prisma.pack.findUnique({
      where: {
        id: id,
      },
      include: {
        author: include?.author,
        images: include?.images,
        icon: include?.icon,
        externalIds: include?.externalIds,
      },
    });
    return pack;
  }

  async create(pack: Pack): Promise<Pack> {
    const packPersistence = pack.toPersistence();
    const createdPack = await this.prisma.pack.create({
      data: packPersistence,
    });
    return createdPack;
  }
  async update(id: string, pack: PackUpdateData): Promise<Pack> {
    const updatedPack = await this.prisma.pack.update({
      where: {
        id: id,
      },
      data: {
        name: pack.name,
        description: pack.description,
        authorId: pack.authorId,
        //  imagesId: pack.imagesId,
        iconId: pack.iconId,
        //externalIdsId: pack.externalIdsId,
      },
    });
    return updatedPack;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.pack.delete({
      where: {
        id: id,
      },
    });
  }
}
