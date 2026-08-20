import {
  ShaderFilter,
  ShaderInclude,
  ShaderPagination,
  ShaderRepository,
  ShaderUpdateData,
} from "@/core/domain/port/shader/ShaderRepository";
import { PrismaClient } from "./connection/client";
import { Shader } from "@/core/domain/model/shader/Shader";
import { User } from "@/core/domain/model/user/User";
import { FileModel } from "@/core/domain/model/file/File";

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
        //externalIds: data?.include?.externalIds,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return shaders.map(
      (shader) =>
        new Shader({
          ...shader,
          author: shader.author ? new User(shader.author) : null,
          images: shader.images?.map((image) => new FileModel(image)),
          icon: shader.icon ? new FileModel(shader.icon) : null,
        }),
    );
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
    if (!shader) return;
    return new Shader({
      ...shader,
      author: shader.author ? new User(shader.author) : null,
      images: shader.images?.map((image) => new FileModel(image)),
      icon: shader.icon ? new FileModel(shader.icon) : null,
    });
  }

  async create(shader: Shader): Promise<Shader> {
    const shaderPersistence = shader.toPersistence();
    const createdShader = await this.prisma.shader.create({
      data: shaderPersistence,
    });
    return new Shader(createdShader);
  }
  async update(id: string, shader: ShaderUpdateData): Promise<Shader> {
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
    return new Shader(updatedShader);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.shader.delete({
      where: {
        id: id,
      },
    });
  }
}
