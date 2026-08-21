import {
  FileDownload,
  FileService,
  UploadLocalFileInput,
} from "@/core/application/port/FileService";
import { FileModel } from "@/core/domain/model/file/File";
import { FileRepository } from "@/core/domain/port/file/FileRepository";
import { pipeline } from "stream/promises";
import { createWriteStream } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { LocalFile } from "@/core/domain/model";
import { LocalFileRepository } from "@/core/domain/port";

export class FileServiceLocal implements FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly localFileRepository: LocalFileRepository,
  ) {}
  async upload(
    rol: string,
    name: string,
    input: UploadLocalFileInput | string,
    config?: {
      path?: string;
      shaderImageId?: string;
      shaderFileId?: string;
      modImageId?: string;
      modFileId?: string;
      packImageId?: string;
    },
  ): Promise<FileModel> {
    if (typeof input === "string") {
      return new FileModel({
        id: " ",
        name: " ",
        role: "",
      });
    }

    const path = join(
      process.cwd(),
      "public",
      "uploads",
      rol,
      `${name}.${input.extension}`,
    );

    await mkdir(dirname(path), {
      recursive: true,
    });
    const url = `/uploads/${rol}/${name}.${input.extension}`;

    const a = new LocalFile({
      name: input.filename,
      path,
      url: url,
      bucket: "uploads",
      size: input.size!,
      mimeType: input.contentType,
      extension: input.extension!,
    });

    await pipeline(input.stream, createWriteStream(path));

    const localFile = await this.localFileRepository.create(a);

    const file = await this.fileRepository.create(
      new FileModel({
        name: input.filename,
        role: rol,
        externalUrl: url,
        localFile: localFile,
        modFileId: config?.modFileId,
        modImageId: config?.modImageId,
        packImageId: config?.packImageId,
        shaderFileId: config?.shaderFileId,
        shaderImageId: config?.shaderImageId,
      }),
    );

    return file;
  }

  update(id: string, input: UploadLocalFileInput | string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.getById(id, { localFile: true });
    if (file?.localFile) {
      const localFilePath = file.localFile.path;
      await unlink(localFilePath);
    }
    await this.fileRepository.delete(id);
  }
  deleteList(ids: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getFileUrl(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  download(id: string): Promise<FileDownload> {
    throw new Error("Method not implemented.");
  }
}
