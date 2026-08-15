import { HashService } from "@/core/application/port/HashService";
import argon2 from "argon2";

export class HashServiceArgon2 implements HashService {
  async hash(data: string): Promise<string> {
    return await argon2.hash(data);
  }
  async compare(hash: string, data: string): Promise<boolean> {
    return await argon2.verify(hash, data);
  }
}
