import { FileModel } from "@/core/domain/model/file/File";

export interface UploadLocalFileInput {
  stream: AsyncIterable<Uint8Array>;
  filename: string;
  contentType: string;
  size?: number;
  extension?: string;
}

export interface FileDownload {
  stream: AsyncIterable<Uint8Array>;
  name: string;
  contentType: string;
  size?: number;
}

export interface FileService {
  // if the file is already uploaded, it will replace it
  upload(
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
  ): Promise<FileModel>;
  update(id: string, input: UploadLocalFileInput | string): Promise<void>;
  delete(id: string): Promise<void>;
  deleteList(ids: string[]): Promise<void>;
  getFileUrl(id: string): Promise<string>;
  download(id: string): Promise<FileDownload>;
}
