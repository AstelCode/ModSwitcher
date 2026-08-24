import { SecretKeyService } from "@/core/application/port/SecretKeyService";
const secretKey = process.env.SECRET_KEY;
export class SecretKeyServiceLocal implements SecretKeyService {
  async generate(): Promise<string> {
    if (secretKey == undefined) throw new Error("Secret key not set");
    return secretKey;
  }
  async verify(key: string): Promise<boolean> {
    console.log(key, "---", secretKey);
    return key == secretKey;
  }
}
