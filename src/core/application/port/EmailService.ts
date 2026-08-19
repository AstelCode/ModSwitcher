export interface EmailService {
  sendPasswordRecoveryEmail(email: string, token: string): unknown;
  sendActivationEmail(to: string, body: string): Promise<void>;
}
