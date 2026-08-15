import { TokenService } from "@/core/application/port/TokenService";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export class TokenServiceJose implements TokenService {
  constructor() {}
  async generate(userId: string, email: string): Promise<string> {
    const payload = {
      userId,
      email,
    };
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
  }

  async verify(token: string): Promise<{ userId: string; email: string }> {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; email: string };
  }
}
