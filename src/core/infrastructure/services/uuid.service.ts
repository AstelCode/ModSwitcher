import { UuidService } from "@/core/application/port/UuidService";
import { v4 as uuid } from "uuid";

export class UuidServiceNode implements UuidService {
  constructor() {}
  async generate(): Promise<string> {
    return uuid();
  }
}
