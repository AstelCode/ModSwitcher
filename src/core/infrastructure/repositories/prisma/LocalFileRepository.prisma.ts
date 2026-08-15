import {
  LocalFileFilter,
  LocalFilePagination,
  LocalFileRepository,
} from "@/core/domain/port/file/LocalFileRepository";
import { PrismaClient, LocalFile } from "./connection/client";

export class LocalFileRepositoryPrisma implements LocalFileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: LocalFileFilter;
    pagination?: LocalFilePagination;
  }): Promise<LocalFile[]> {
    const localFiles = await this.prisma.localFile.findMany({
      where: {
        name: data?.filter?.name,
        size: data?.filter?.size,
        mimeType: data?.filter?.mimeType,
        path: data?.filter?.path,
        url: data?.filter?.url,
        bucket: data?.filter?.bucket,
        extension: data?.filter?.extension,
        sha256: data?.filter?.sha256,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return localFiles;
  }

  async getById(id: string): Promise<LocalFile | undefined> {
    const localFile = await this.prisma.localFile.findUnique({
      where: {
        id: id,
      },
    });
    return localFile;
  }

  async create(localFile: LocalFile): Promise<LocalFile> {
    const localFilePersistence = localFile.toPersistence();
    const createdLocalFile = await this.prisma.localFile.create({
      data: localFilePersistence,
    });
    return createdLocalFile;
  }
  async update(id: string, localFile: LocalFile): Promise<LocalFile> {
    const updatedLocalFile = await this.prisma.localFile.update({
      where: {
        id: id,
      },
      data: {
        name: localFile.name,
        size: localFile.size,
        mimeType: localFile.mimeType,
        path: localFile.path,
        url: localFile.url,
        bucket: localFile.bucket,
        extension: localFile.extension,
        sha256: localFile.sha256,
      },
    });
    return updatedLocalFile;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.localFile.delete({
      where: {
        id: id,
      },
    });
  }
}
