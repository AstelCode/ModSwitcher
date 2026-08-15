import {
  PackShaderFilter,
  PackShaderInclude,
  PackShaderPagination,
  PackShaderRepository,
  PackShaderUpdateData,
} from "@/core/domain/port/pack/PackShaderRepository";
import { PrismaClient } from "./connection/client";
import { PackShader } from "@/core/domain/model/pack/PackShader";

export class PackShaderRepositoryPrisma implements PackShaderRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async deleteList(ids: string[]): Promise<void> {
    await this.prisma.packShader.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  async getAll(data?: {
    filter?: PackShaderFilter;
    pagination?: PackShaderPagination;
    include?: PackShaderInclude;
  }): Promise<PackShader[]> {
    const packShaders = await this.prisma.packShader.findMany({
      where: {
        packVersionId: data?.filter?.packVersionId,
        shaderFileId: data?.filter?.shaderFileId,
      },
      include: {
        packVersion: data?.include?.packVersion,
        shaderFile: data?.include?.shaderFile,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return packShaders;
  }
  async getById(
    id: string,
    include?: PackShaderInclude,
  ): Promise<PackShader | undefined> {
    const packShader = await this.prisma.packShader.findUnique({
      where: {
        id: id,
      },
      include: {
        packVersion: include?.packVersion,
        shaderFile: include?.shaderFile,
      },
    });
    return packShader;
  }

  async create(packShader: PackShader): Promise<PackShader> {
    const packShaderPersistence = packShader.toPersistence();
    const createdPackShader = await this.prisma.packShader.create({
      data: packShaderPersistence,
    });
    return createdPackShader;
  }
  async update(
    id: string,
    packShader: PackShaderUpdateData,
  ): Promise<PackShader> {
    const updatedPackShader = await this.prisma.packShader.update({
      where: {
        id: id,
      },
      data: {
        packVersionId: packShader.packVersionId,
        shaderFileId: packShader.shaderFileId,
      },
    });
    return updatedPackShader;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.packShader.delete({
      where: {
        id: id,
      },
    });
  }
}
