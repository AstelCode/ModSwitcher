import { TokenService } from "@/core/application/port/TokenService";
import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const TokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.email(),
});

const secret = new TextEncoder().encode(jwtSecret);

export class TokenServiceJose implements TokenService {
  constructor() {}
  async generate(userId: string, email: string): Promise<string> {
    const payload = {
      userId,
      email,
    };
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(randomUUID())
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
  }

  async verify(token: string): Promise<{ userId: string; email: string }> {
    const { payload } = await jwtVerify(token, secret);
    return TokenPayloadSchema.parse(payload);
  }
}
