import {
  ShaderLoaderFilter,
  ShaderLoaderInclude,
  ShaderLoaderPagination,
  ShaderLoaderRepository,
} from "@/core/domain/port/loaders/ShaderLoaderRepository";
import { PrismaClient } from "./connection/client";
import { ShaderLoader } from "@/core/domain/model/loaders/ShaderLoader";

export class ShaderLoaderRepositoryPrisma implements ShaderLoaderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: ShaderLoaderFilter;
    pagination?: ShaderLoaderPagination;
    include?: ShaderLoaderInclude;
  }): Promise<ShaderLoader[]> {
    const shaderLoaders = await this.prisma.shaderLoader.findMany({
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
    return shaderLoaders;
  }

  async getById(
    id: string,
    include?: ShaderLoaderInclude,
  ): Promise<ShaderLoader | undefined> {
    const shaderLoader = await this.prisma.shaderLoader.findUnique({
      where: {
        id: id,
      },
      include: {
        icon: include?.icon,
      },
    });
    return shaderLoader;
  }

  async create(shaderLoader: ShaderLoader): Promise<ShaderLoader> {
    const shaderLoaderPersistence = shaderLoader.toPersistence();
    const createdShaderLoader = await this.prisma.shaderLoader.create({
      data: shaderLoaderPersistence,
    });
    return createdShaderLoader;
  }

  async update(id: string, shaderLoader: ShaderLoader) {
    const updatedShaderLoader = await this.prisma.shaderLoader.update({
      where: {
        id: id,
      },
      data: {
        name: shaderLoader.name,
        iconId: shaderLoader.iconId,
      },
    });
    return updatedShaderLoader;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shaderLoader.delete({
      where: {
        id: id,
      },
    });
  }
}
