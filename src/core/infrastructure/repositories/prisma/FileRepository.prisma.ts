import { PrismaClient } from "./connection/client";
import {
  FileFilter,
  FileInclude,
  FilePagination,
  FileRepository,
  FileUpdateData,
} from "@/core/domain/port/file/FileRepository";
import { FileModel } from "@/core/domain/model/file/File";
import { LocalFile } from "@/core/domain/model/file/LocalFile";

export class FileRepositoryPrisma implements FileRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getAll(data?: {
    filter?: FileFilter;
    pagination?: FilePagination;
    include?: FileInclude;
  }): Promise<FileModel[]> {
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
    return files.map(
      (file) =>
        new FileModel({
          ...file,
          localFile: file.localFile ? new LocalFile(file.localFile) : null,
        }),
    );
  }

  async getById(
    id: string,
    include?: FileInclude,
  ): Promise<FileModel | undefined> {
    const file = await this.prisma.file.findUnique({
      where: {
        id: id,
      },
      include: {
        localFile: include?.localFile,
      },
    });
    if (!file) return;
    return new FileModel({
      ...file,
      localFile: file.localFile ? new LocalFile(file.localFile) : null,
    });
  }

  async create(file: FileModel): Promise<FileModel> {
    const filePersistence = file.toPersistence();
    const createdFile = await this.prisma.file.create({
      data: filePersistence,
    });
    return new FileModel({
      ...createdFile,
    });
  }

  async update(id: string, file: FileUpdateData): Promise<FileModel> {
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
    return new FileModel({
      ...updatedFile,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: {
        id: id,
      },
    });
  }
}
