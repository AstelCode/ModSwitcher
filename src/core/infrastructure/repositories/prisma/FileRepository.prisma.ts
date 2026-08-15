import { PrismaClient, File } from "./connection/client";
import {
  FileFilter,
  FileInclude,
  FilePagination,
  FileRepository,
  FileUpdateData,
} from "@/core/domain/port/file/FileRepository";

export class FileRepositoryPrisma implements FileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(data?: {
    filter?: FileFilter;
    pagination?: FilePagination;
    include?: FileInclude;
  }): Promise<File[]> {
    const files = await this.prisma.file.findMany({
      where: {
        externalUrl: data?.filter?.externalUrl,
        localFileId: data?.filter?.localFileId,
        role: data?.filter?.role,
      },
      include: {
        localFile: data?.include?.localFile,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return files;
  }

  async getById(id: string, include?: FileInclude): Promise<File | undefined> {
    const file = await this.prisma.file.findUnique({
      where: {
        id: id,
      },
      include: {
        localFile: include?.localFile,
      },
    });
    return file;
  }

  async create(file: File): Promise<File> {
    const filePersistence = file.toPersistence();
    const createdFile = await this.prisma.file.create({
      data: filePersistence,
    });
    return createdFile;
  }

  async update(id: string, file: FileUpdateData): Promise<File> {
    const updatedFile = await this.prisma.file.update({
      where: {
        id: id,
      },
      data: {
        externalUrl: file.externalUrl,
        localFileId: file.localFileId,
        role: file.role,
        shaderId: file.shaderId,
        modId: file.modId,
        packId: file.packId,
      },
    });
    return updatedFile;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: {
        id: id,
      },
    });
  }
}
