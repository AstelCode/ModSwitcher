import {
  FileDownload,
  FileService,
  UploadLocalFileInput,
} from "@/core/application/port/FileService";
import { FileModel } from "@/core/domain/model/file/File";
import { FileRepository } from "@/core/domain/port/file/FileRepository";

export class FileServiceLocal implements FileService {
  constructor(private readonly fileRepository: FileRepository) {}
  upload(
    rol: string,
    name: string,
    input: UploadLocalFileInput | string,
    config?: {
      path?: string;
      shaderId?: string;
      modId?: string;
      packId?: string;
    },
  ): Promise<FileModel> {
    throw new Error("Method not implemented.");
  }
  update(id: string, input: UploadLocalFileInput | string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
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
