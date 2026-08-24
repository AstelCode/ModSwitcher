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
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import { LocalFile } from "@/core/domain/model";
import { LocalFileRepository } from "@/core/domain/port";
import { Readable } from "node:stream";

export class FileServiceLocal implements FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly localFileRepository: LocalFileRepository,
  ) {}

  private async saveFile(
    input: UploadLocalFileInput,
    role: string,
    name: string,
  ): Promise<{ path: string; url: string; fileName: string }> {
    const path = join(
      process.cwd(),
      "public",
      "uploads",
      role,
      `${name}.${input.extension}`,
    );
    const fileName = `${name}.${input.extension}`;
    const url = `/uploads/${role}/${name}.${input.extension}`;

    await mkdir(dirname(path), {
      recursive: true,
    });

    const stream = createWriteStream(path);
    const inputStream = Readable.fromWeb(
      input.stream as NodeReadableStream<Uint8Array>,
    );
    await pipeline(inputStream, stream);

    return {
      path,
      url,
      fileName,
    };
  }
  private async deleteFile(path: string): Promise<void> {
    await unlink(path);
  }

  async upload(
    role: string,
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
      return await this.fileRepository.create(
        new FileModel({
          externalUrl: input,
          name,
          role,
        }),
      );
    }

    const { path, url, fileName } = await this.saveFile(input, role, name);

    const a = new LocalFile({
      name,
      path,
      url: url,
      bucket: "uploads",
      size: input.size!,
      mimeType: input.contentType,
      extension: input.extension!,
    });

    const localFile = await this.localFileRepository.create(a);

    const file = await this.fileRepository.create(
      new FileModel({
        name: fileName,
        role: role,
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

  async update(
    id: string,
    name: string,
    input: UploadLocalFileInput | string,
  ): Promise<void> {
    const file = await this.fileRepository.getById(id, { localFile: true });
    if (typeof input == "string") {
      if (file?.localFile) {
        const localFilePath = file.localFile.path;
        await this.deleteFile(localFilePath);
        if (file.localFile.id)
          await this.localFileRepository.delete(file.localFile.id);
      }
      await this.fileRepository.update(id, { externalUrl: input });
      return;
    }

    if (file?.localFile) {
      const localFilePath = file.localFile.path;
      await this.deleteFile(localFilePath);
      const localFileId = file.localFile.id!;
      const role = file.role;
      const { url, path, fileName } = await this.saveFile(input, role, name);
      await this.localFileRepository.update(localFileId, {
        name: fileName,
        path,
        url,
        size: input.size,
        extension: input.extension,
      });
      await this.fileRepository.update(id, { externalUrl: url });
    }
  }
  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.getById(id, { localFile: true });
    if (file?.localFile) {
      const localFilePath = file.localFile.path;
      try {
        await unlink(localFilePath);
      } catch (e) {}
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
