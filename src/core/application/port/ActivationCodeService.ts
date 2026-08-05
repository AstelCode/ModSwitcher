export interface ActivationCodeService {
  generate(userId: string): Promise<string>;
}
