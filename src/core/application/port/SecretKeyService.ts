export interface SecretKeyService {
  generate(): Promise<string>;
  verify(key: string): Promise<boolean>;
}
