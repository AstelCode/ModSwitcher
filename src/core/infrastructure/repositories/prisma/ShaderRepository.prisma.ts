import {
  ShaderFilter,
  ShaderInclude,
  ShaderPagination,
  ShaderRepository,
} from "@/core/domain/port/shader/ShaderRepository";
import { PrismaClient } from "./connection/client";
import { Shader } from "@/core/domain/model/shader/Shader";

export class ShaderRepositoryPrisma implements ShaderRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: ShaderFilter;
    pagination?: ShaderPagination;
    include?: ShaderInclude;
  }): Promise<Shader[]> {
    const shaders = await this.prisma.shader.findMany({
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
    return shaders;
  }
  async getById(
    id: string,
    include?: ShaderInclude,
  ): Promise<Shader | undefined> {
    const shader = await this.prisma.shader.findUnique({
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
    return shader;
  }

  async create(shader: Shader): Promise<Shader> {
    const shaderPersistence = shader.toPersistence();
    const createdShader = await this.prisma.shader.create({
      data: shaderPersistence,
    });
    return createdShader;
  }
  async update(id: string, shader: Shader): Promise<Shader> {
    const updatedShader = await this.prisma.shader.update({
      where: {
        id: id,
      },
      data: {
        name: shader.name,
        description: shader.description,
        authorId: shader.authorId,
        //  imagesId: shader.imagesId,
        iconId: shader.iconId,
        //externalIdsId: shader.externalIdsId,
      },
    });
    return updatedShader;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.shader.delete({
      where: {
        id: id,
      },
    });
  }
}
