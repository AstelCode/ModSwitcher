export interface TokenService {
  generate(userId: string, email: string): Promise<string>;
  verify(token: string): Promise<{ userId: string; email: string }>;
}
