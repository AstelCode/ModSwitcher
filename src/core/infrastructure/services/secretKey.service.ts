import { SecretKeyService } from "@/core/application/port/SecretKeyService";

export class SecretKeyServiceLocal implements SecretKeyService {
  async generate(): Promise<string> {
    if (process.env.SECRET_KEY == undefined)
      throw new Error("Secret key not set");
    return process.env.SECRET_KEY;
  }
  async verify(key: string): Promise<boolean> {
    return key == process.env.SECRET_KEY;
  }
}
