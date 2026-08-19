export interface TokenStorageService {
  get(): Promise<string | null>;
  set(token: string): Promise<void>;
  delete(): Promise<void>;
}
