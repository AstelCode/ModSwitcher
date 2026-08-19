import { TokenStorageService } from "@/core/application/port/TokenStorageService";
import { cookies } from "next/headers";

export class TokenStorageServiceNext implements TokenStorageService {
  async get(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value ?? null;
  }
  async set(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
  }
  async delete(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
  }
}
