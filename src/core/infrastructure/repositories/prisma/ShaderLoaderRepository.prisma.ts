import {
  ShaderLoaderFilter,
  ShaderLoaderInclude,
  ShaderLoaderPagination,
  ShaderLoaderRepository,
  ShaderLoaderUpdateData,
} from "@/core/domain/port/loaders/ShaderLoaderRepository";
import { PrismaClient } from "./connection/client";
import { ShaderLoader } from "@/core/domain/model/loaders/ShaderLoader";
import { FileModel } from "@/core/domain/model/file/File";

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
    return shaderLoaders.map(
      (shaderLoader) =>
        new ShaderLoader({
          ...shaderLoader,
          icon: shaderLoader.icon ? new FileModel(shaderLoader.icon) : null,
        }),
    );
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
    if (!shaderLoader) return;
    return new ShaderLoader({
      ...shaderLoader,
      icon: shaderLoader.icon ? new FileModel(shaderLoader.icon) : null,
    });
  }

  async create(shaderLoader: ShaderLoader): Promise<ShaderLoader> {
    const shaderLoaderPersistence = shaderLoader.toPersistence();
    const createdShaderLoader = await this.prisma.shaderLoader.create({
      data: shaderLoaderPersistence,
    });
    return new ShaderLoader(createdShaderLoader);
  }

  async update(
    id: string,
    shaderLoader: ShaderLoaderUpdateData,
  ): Promise<ShaderLoader> {
    const updatedShaderLoader = await this.prisma.shaderLoader.update({
      where: {
        id: id,
      },
      data: {
        name: shaderLoader.name,
        iconId: shaderLoader.iconId,
      },
    });
    return new ShaderLoader(updatedShaderLoader);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shaderLoader.delete({
      where: {
        id: id,
      },
    });
  }
}
