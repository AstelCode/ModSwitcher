import { ActivationCodeService } from "@/core/application/port/ActivationCodeService";
import { v4 as uuid } from "uuid";
export class ActivationCodeServiceUUID implements ActivationCodeService {
  constructor() {}
  async generate(userId: string): Promise<string> {
    return uuid().substring(0, 6);
  }
}
