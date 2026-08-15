import {
  ShaderFileFilter,
  ShaderFileInclude,
  ShaderFilePagination,
  ShaderFileRepository,
  ShaderFileUpdateData,
} from "@/core/domain/port/shader/ShaderFileRepository";
import { PrismaClient } from "./connection/client";
import { ShaderFile } from "@/core/domain/model/shader/ShaderFile";

export class ShaderFileRepositoryPrisma implements ShaderFileRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: ShaderFileFilter;
    pagination?: ShaderFilePagination;
    include?: ShaderFileInclude;
  }): Promise<ShaderFile[]> {
    const shaderFiles = await this.prisma.shaderFile.findMany({
      where: {
        fileId: data?.filter?.fileId,
        loaderId: data?.filter?.loaderId,
        minecraftVersionId: data?.filter?.minecraftVersionId,
        shaderId: data?.filter?.shaderId,
      },
      include: {
        file: data?.include?.file,
        loader: data?.include?.loader,
        minecraftVersion: data?.include?.minecraftVersion,
        shader: data?.include?.shader,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return shaderFiles;
  }
  async getById(
    id: string,
    include?: ShaderFileInclude,
  ): Promise<ShaderFile | undefined> {
    const shaderFile = await this.prisma.shaderFile.findUnique({
      where: {
        id: id,
      },
      include: {
        file: include?.file,
        loader: include?.loader,
        minecraftVersion: include?.minecraftVersion,
        shader: include?.shader,
      },
    });
    return shaderFile;
  }

  async create(shaderFile: ShaderFile): Promise<ShaderFile> {
    const shaderFilePersistence = shaderFile.toPersistence();
    const createdShaderFile = await this.prisma.shaderFile.create({
      data: shaderFilePersistence,
    });
    return createdShaderFile;
  }
  async update(
    id: string,
    shaderFile: ShaderFileUpdateData,
  ): Promise<ShaderFile> {
    const updatedShaderFile = await this.prisma.shaderFile.update({
      where: {
        id: id,
      },
      data: {
        fileId: shaderFile.fileId,
        loaderId: shaderFile.loaderId,
        minecraftVersionId: shaderFile.minecraftVersionId,
        shaderId: shaderFile.shaderId,
      },
    });
    return updatedShaderFile;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.shaderFile.delete({
      where: {
        id: id,
      },
    });
  }
}
