import {
  LocalFileFilter,
  LocalFilePagination,
  LocalFileRepository,
  LocalFileUpdateData,
} from "@/core/domain/port/file/LocalFileRepository";
import { PrismaClient } from "./connection/client";
import { LocalFile } from "@/core/domain/model";

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
    return localFiles.map((item) => new LocalFile(item));
  }

  async getById(id: string): Promise<LocalFile | undefined> {
    const localFile = await this.prisma.localFile.findUnique({
      where: {
        id: id,
      },
    });
    if (!localFile) return;
    return new LocalFile(localFile);
  }

  async create(localFile: LocalFile): Promise<LocalFile> {
    const localFilePersistence = localFile.toPersistence();
    const createdLocalFile = await this.prisma.localFile.create({
      data: localFilePersistence,
    });
    return new LocalFile(createdLocalFile);
  }
  async update(id: string, localFile: LocalFileUpdateData): Promise<LocalFile> {
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
    return new LocalFile(updatedLocalFile);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.localFile.delete({
      where: {
        id: id,
      },
    });
  }
}
